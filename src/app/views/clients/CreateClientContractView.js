import React from "react";
import { CustomDialog } from "../../components/CustomDialog";
import { ContractForm } from "../../forms/ContractForm";
import gql from "graphql-tag";
import { Mutation, Query } from "react-apollo";
import { ALL_TOWNS } from "../../graphql/fragments/AllTowns";
import { ALL_TOWNSHIPS } from "../../graphql/fragments/AllTownships";
import { ALL_STREETS } from "../../graphql/fragments/AllStreets";
import { ALL_CLIENT_CONTRACT_TYPES } from "../../graphql/fragments/AllClientContractTypes";
import { CREATE_CLIENT_CONTRACT } from "../../graphql/mutations/CreateClientContract";
import { ALL_CLIENT_CONTRACTS } from "../../graphql/fragments/AllClientContracts";
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
    allClientContractTypes(orderBy: ID_DESC) {
      ...AllClientContractTypes
    }
  }
  ${ALL_TOWNS}
  ${ALL_TOWNSHIPS}
  ${ALL_STREETS}
  ${ALL_CLIENT_CONTRACT_TYPES}
`;

export const CreateClientContractView = ({
  idClient,
  isOpen,
  maxWidth,
  onClose,
  title
}) => (
  <CustomDialog isOpen={isOpen} maxWidth={maxWidth} title={title}>
    <Query query={ALL_TOWNS_TOWNSHIPS_STREETS_QUERY}>
      {({
        data: { allTowns, allTownships, allStreets, allClientContractTypes },
        loading
      }) => {
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

        const allClientContractTypesSuggestions = allClientContractTypes.edges.map(
          ({ node }) => ({
            label: `${node.typeName} - Precio de Mensualidad:  $${
              node.monthPrice
            }`,
            value: node.id
          })
        );

        return (
          <Mutation
            mutation={CREATE_CLIENT_CONTRACT}
            onCompleted={onClose}
            update={(
              cache,
              {
                data: {
                  createClientContract: { clientContract }
                }
              }
            ) => {
              const ALL_CLIENT_CONTRACTS_QUERY = gql`
                query($idClient: Int!) {
                  allClientContracts(idClient: $idClient) {
                    ...AllClientContracts
                  }
                }
                ${ALL_CLIENT_CONTRACTS}
              `;

              const { allClientContracts } = cache.readQuery({
                query: ALL_CLIENT_CONTRACTS_QUERY,
                variables: { idClient }
              });

              allClientContracts.edges.unshift({
                node: {
                  ...clientContract
                },
                __typename: "ClientContractsEdge"
              });

              cache.writeQuery({
                query: ALL_CLIENT_CONTRACTS_QUERY,
                variables: { idClient },
                data: {
                  allClientContracts: {
                    ...allClientContracts,
                    allClientContracts
                  }
                }
              });

              return null;
            }}
          >
            {(createContract, { error, loading }) => {
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

                  <ContractForm
                    action={createContract}
                    allTownsSuggestions={allTownsSuggestions}
                    allTownshipsSuggestions={allTownshipsSuggestions}
                    allStreetsSuggestions={allStreetsSuggestions}
                    allClientContractTypesSuggestions={
                      allClientContractTypesSuggestions
                    }
                    idClient={idClient}
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
