import React from "react";
import { CustomDialog } from "./CustomDialog";
import { StreetForm } from "../forms/StreetForm";
import gql from "graphql-tag";
import { Mutation, Query } from "react-apollo";
import { STREET_BY_ID } from "../graphql/queries/StreetById";
import { MODIFY_STREET } from "../graphql/mutations/ModifyStreet";
import { ALL_STREETS } from "../graphql/fragments/AllStreets";
import { LoadingProgressSpinner } from "./LoadingProgressSpinner";
import { NetworkError } from "./NetworkError";
import { GraphQLError } from "./GraphQLError";

export const ModifyStreetView = ({
  idStreet,
  isOpen,
  onClose,
  setSelection
}) => (
  <CustomDialog isOpen={isOpen} maxWidth="sm" title="Modificar Calle">
    <Query query={STREET_BY_ID} variables={{ idStreet }}>
      {({ data: { streetById }, loading }) => {
        if (loading) return <LoadingProgressSpinner />;

        return (
          <Mutation
            mutation={MODIFY_STREET}
            onCompleted={data => {
              setSelection({
                label: data.modifyStreet.street.street,
                value: data.modifyStreet.street.id
              });

              onClose();
            }}
            update={(cache, { data: { modifyStreet } }) => {
              const ALL_STREETS_QUERY = gql`
                query {
                  allStreets {
                    ...AllStreets
                  }
                }
                ${ALL_STREETS}
              `;

              const { allStreets } = cache.readQuery({
                query: ALL_STREETS_QUERY
              });

              allStreets.edges.map(({ node }) =>
                node.id === modifyStreet.street.id
                  ? { node: { ...modifyStreet.street } }
                  : node
              );

              cache.writeQuery({
                query: ALL_STREETS_QUERY,
                data: {
                  allStreets: {
                    ...allStreets,
                    allStreets
                  }
                }
              });

              return null;
            }}
          >
            {(modifyStreet, { error, loading }) => {
              if (loading) return <LoadingProgressSpinner />;

              return (
                <React.Fragment>
                  {error ? (
                    error.networkError ? (
                      <NetworkError
                        isOpen={true}
                        networkError={error.networkError}
                      />
                    ) : error.graphQLErrors ? (
                      <GraphQLError
                        isOpen={true}
                        graphQLErrors={error.graphQLErrors[0]}
                      />
                    ) : null
                  ) : null}

                  <StreetForm
                    action={modifyStreet}
                    {...streetById}
                    onClose={onClose}
                  />
                </React.Fragment>
              );
            }}
          </Mutation>
        );
      }}
    </Query>
  </CustomDialog>
);
