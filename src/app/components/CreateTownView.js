import React from "react";
import { CustomDialog } from "./CustomDialog";
import { TownForm } from "../forms/TownForm";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { CREATE_TOWN } from "../graphql/mutations/CreateTown";
import { LoadingProgressSpinner } from "./LoadingProgressSpinner";
import { NetworkError } from "./NetworkError";
import { GraphQLError } from "./GraphQLError";
import { ALL_TOWNS } from "../graphql/fragments/AllTowns";

export const CreateTownView = ({ isOpen, onClose, setSelection }) => (
  <CustomDialog isOpen={isOpen} maxWidth="sm" title="Agregar Municipio">
    <Mutation
      mutation={CREATE_TOWN}
      onCompleted={data => {
        setSelection({
          label: data.createTown.town.town,
          value: data.createTown.town.id
        });

        onClose();
      }}
      update={(cache, { data: { createTown } }) => {
        const ALL_TOWNS_QUERY = gql`
          query {
            allTowns {
              ...AllTowns
            }
          }
          ${ALL_TOWNS}
        `;

        let { allTowns } = cache.readQuery({
          query: ALL_TOWNS_QUERY
        });

        allTowns.edges.unshift({
          node: {
            ...createTown.town
          },
          __typename: "TownsEdge"
        });

        cache.writeQuery({
          query: ALL_TOWNS_QUERY,
          data: {
            allTowns: {
              ...allTowns,
              allTowns
            }
          }
        });

        return null;
      }}
    >
      {(createTown, { error, loading }) => {
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

            <TownForm action={createTown} onClose={onClose} />
          </React.Fragment>
        );
      }}
    </Mutation>
  </CustomDialog>
);
