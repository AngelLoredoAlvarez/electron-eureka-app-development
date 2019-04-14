import React from "react";
import { CustomDialog } from "../../components/CustomDialog";
import gql from "graphql-tag";
import { Mutation, Query } from "react-apollo";
import { ALL_TOWNS } from "../../graphql/fragments/AllTowns";
import { ALL_TOWNSHIPS } from "../../graphql/fragments/AllTownships";
import { ALL_STREETS } from "../../graphql/fragments/AllStreets";
import { CREATE_CLIENT } from "../../graphql/mutations/CreateClient";
import { ALL_CLIENTS } from "../../graphql/fragments/AllClients";
import { ClientForm } from "../../forms/ClientForm";
import { LoadingProgressSpinner } from "../../components/LoadingProgressSpinner";
import { NetworkError } from "../../components/NetworkError";
import { GraphQLError } from "../../components/GraphQLError";

const ALL_TOWNS_TOWNSHIPS_STREETS_QUERY = gql`
  query {
    allTowns {
      ...AllTowns
    }
    allTownships {
      ...AllTownships
    }
    allStreets {
      ...AllStreets
    }
  }
  ${ALL_TOWNS}
  ${ALL_TOWNSHIPS}
  ${ALL_STREETS}
`;

export const CreateClientView = ({ isOpen, maxWidth, onClose, title }) => (
  <CustomDialog isOpen={isOpen} maxWidth={maxWidth} title={title}>
    <Query query={ALL_TOWNS_TOWNSHIPS_STREETS_QUERY}>
      {({ data: { allTowns, allTownships, allStreets }, loading }) => {
        if (loading) return <LoadingProgressSpinner />;

        const allTownsSuggestions = allTowns.edges.map(({ node }) => ({
          label: node.town,
          value: node.id
        }));

        const allTownshipsSuggestions = allTownships.edges.map(({ node }) => ({
          label: node.township,
          link: node.idTown,
          value: node.id
        }));

        const allStreetsSuggestions = allStreets.edges.map(({ node }) => ({
          label: node.street,
          link: node.idTownship,
          value: node.id
        }));

        return (
          <Mutation
            mutation={CREATE_CLIENT}
            onCompleted={onClose}
            update={(
              cache,
              {
                data: {
                  createClient: { client }
                }
              }
            ) => {
              const ALL_CLIENTS_QUERY = gql`
                query {
                  allClients(orderBy: CREATED_AT_DESC) {
                    ...AllClients
                  }
                }
                ${ALL_CLIENTS}
              `;

              const { allClients } = cache.readQuery({
                query: ALL_CLIENTS_QUERY
              });

              allClients.edges.unshift({
                node: {
                  ...client
                },
                __typename: "ClientsEdge"
              });

              cache.writeQuery({
                query: ALL_CLIENTS_QUERY,
                data: {
                  allClients: {
                    ...allClients,
                    allClients
                  }
                }
              });

              return null;
            }}
          >
            {(createClient, { error, loading }) => {
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

                  <ClientForm
                    action={createClient}
                    allTownsSuggestions={allTownsSuggestions}
                    allTownshipsSuggestions={allTownshipsSuggestions}
                    allStreetsSuggestions={allStreetsSuggestions}
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
