import React from "react";
import { CustomDialog } from "./CustomDialog";
import { TownshipForm } from "../forms/TownshipForm";
import gql from "graphql-tag";
import { Mutation, Query } from "react-apollo";
import { TOWNSHIP_BY_ID } from "../graphql/queries/TownshipById";
import { MODIFY_TOWNSHIP } from "../graphql/mutations/ModifyTownship";
import { ALL_TOWNSHIPS } from "../graphql/fragments/AllTownships";
import { LoadingProgressSpinner } from "./LoadingProgressSpinner";
import { NetworkError } from "./NetworkError";
import { GraphQLError } from "./GraphQLError";

export const ModifyTownshipView = ({
  idTownship,
  isOpen,
  onClose,
  setSelection
}) => (
  <CustomDialog isOpen={isOpen} maxWidth="sm" title="Modificar Asentamiento">
    <Query query={TOWNSHIP_BY_ID} variables={{ idTownship }}>
      {({ data: { townshipById }, loading }) => {
        if (loading) return <LoadingProgressSpinner />;

        return (
          <Mutation
            mutation={MODIFY_TOWNSHIP}
            onCompleted={data => {
              setSelection({
                label: data.modifyTownship.township.township,
                value: data.modifyTownship.township.id
              });

              onClose();
            }}
            update={(cache, { data: { modifyTownship } }) => {
              const ALL_TOWNSHIPS_QUERY = gql`
                query {
                  allTownships {
                    ...AllTownships
                  }
                }
                ${ALL_TOWNSHIPS}
              `;

              const { allTownships } = cache.readQuery({
                query: ALL_TOWNSHIPS_QUERY
              });

              allTownships.edges.map(({ node }) =>
                node.id === modifyTownship.township.id
                  ? { node: { ...modifyTownship.township } }
                  : node
              );

              cache.writeQuery({
                query: ALL_TOWNSHIPS_QUERY,
                data: {
                  allTownships: {
                    ...allTownships,
                    allTownships
                  }
                }
              });

              return null;
            }}
          >
            {(modifyTownship, { error, loading }) => {
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

                  <TownshipForm
                    action={modifyTownship}
                    {...townshipById}
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
