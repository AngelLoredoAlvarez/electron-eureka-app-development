import React from "react";
import { CustomDialog } from "./CustomDialog";
import { StreetForm } from "../forms/StreetForm";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { CREATE_STREET } from "../graphql/mutations/CreateStreet";
import { ALL_STREETS } from "../graphql/fragments/AllStreets";
import { LoadingProgressSpinner } from "./LoadingProgressSpinner";
import { NetworkError } from "./NetworkError";
import { GraphQLError } from "./GraphQLError";

export const CreateStreetView = ({
  idTownship,
  isOpen,
  onClose,
  setSelection
}) => (
  <CustomDialog isOpen={isOpen} maxWidth="sm" title="Crear Calle">
    <Mutation
      mutation={CREATE_STREET}
      onCompleted={data => {
        setSelection({
          label: data.createStreet.street.street,
          value: data.createStreet.street.id
        });

        onClose();
      }}
      update={(cache, { data: { createStreet } }) => {
        const ALL_STREETS_QUERY = gql`
          query {
            allStreets {
              ...AllStreets
            }
          }
          ${ALL_STREETS}
        `;

        let { allStreets } = cache.readQuery({
          query: ALL_STREETS_QUERY
        });

        allStreets.edges.unshift({
          node: {
            ...createStreet.street
          },
          __typename: "StreetsEdge"
        });

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
      {(createStreet, { error, loading }) => {
        if (loading) return <LoadingProgressSpinner />;

        return (
          <React.Fragment>
            {error ? (
              error.networkError ? (
                <NetworkError isOpen={true} networkError={error.networkError} />
              ) : error.graphQLErrors ? (
                <GraphQLError
                  isOpen={true}
                  graphQLErrors={error.graphQLErrors[0]}
                />
              ) : null
            ) : null}

            <StreetForm
              action={createStreet}
              idTownship={idTownship}
              onClose={onClose}
            />
          </React.Fragment>
        );
      }}
    </Mutation>
  </CustomDialog>
);
