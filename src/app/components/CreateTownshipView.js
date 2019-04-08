import React from "react";
import { CustomDialog } from "./CustomDialog";
import { TownshipForm } from "../forms/TownshipForm";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { CREATE_TOWNSHIP } from "../graphql/mutations/CreateTownship";
import { ALL_TOWNSHIPS } from "../graphql/fragments/AllTownships";
import { LoadingProgressSpinner } from "./LoadingProgressSpinner";
import { NetworkError } from "./NetworkError";
import { GraphQLError } from "./GraphQLError";

export const CreateTownshipView = ({
  idTown,
  isOpen,
  onClose,
  setSelection
}) => (
  <CustomDialog isOpen={isOpen} maxWidth="sm" title="Crear Asentamiento">
    <Mutation
      mutation={CREATE_TOWNSHIP}
      onCompleted={data => {
        setSelection({
          label: data.createTownship.township.township,
          value: data.createTownship.township.id
        });

        onClose();
      }}
      update={(cache, { data: { createTownship } }) => {
        const ALL_TOWNSHIPS_QUERY = gql`
          query {
            allTownships {
              ...AllTownships
            }
          }
          ${ALL_TOWNSHIPS}
        `;

        let { allTownships } = cache.readQuery({
          query: ALL_TOWNSHIPS_QUERY
        });

        allTownships.edges.unshift({
          node: {
            ...createTownship.township
          },
          __typename: "TownshipsEdge"
        });

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
      {(createTownship, { error, loading }) => {
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

            <TownshipForm
              action={createTownship}
              idTown={idTown}
              onClose={onClose}
            />
          </React.Fragment>
        );
      }}
    </Mutation>
  </CustomDialog>
);
