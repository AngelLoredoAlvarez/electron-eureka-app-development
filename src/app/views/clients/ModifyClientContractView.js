import React from "react";
import { CustomDialog } from "../../components/CustomDialog";
import { ContractForm } from "../../forms/ContractForm";
import gql from "graphql-tag";
import { Mutation, Query } from "react-apollo";
import { ALL_TOWNS } from "../../graphql/fragments/AllTowns";
import { ALL_TOWNSHIPS } from "../../graphql/fragments/AllTownships";
import { ALL_STREETS } from "../../graphql/fragments/AllStreets";
import { ALL_CLIENT_CONTRACTS } from "../../graphql/fragments/AllClientContracts";
import { CLIENT_CONTRACT_FIELDS } from "../../graphql/fragments/ClientContractFields";
import { MODIFY_CLIENT_CONTRACT } from "../../graphql/mutations/ModifyClientContract";
import { ALL_CLIENT_CONTRACT_MOVEMENTS } from "../../graphql/queries/AllClientContractMovements";
import { LoadingProgressSpinner } from "../../components/LoadingProgressSpinner";
import { NetworkError } from "../../components/NetworkError";
import { GraphQLError } from "../../components/GraphQLError";

const ALL_TOWNS_TOWNSHIPS_STREETS_CLIENT_CONTRACT_QUERY = gql`
  query($id: UUID!) {
    allTowns {
      ...AllTowns
    }
    allTownships {
      ...AllTownships
    }
    allStreets {
      ...AllStreets
    }
    clientContractById(id: $id) {
      ...ClientContractFields
    }
  }
  ${ALL_TOWNS}
  ${ALL_TOWNSHIPS}
  ${ALL_STREETS}
  ${CLIENT_CONTRACT_FIELDS}
`;

export const ModifyClientContractView = ({
  idClient,
  idContract,
  isOpen,
  onClose
}) => (
  <CustomDialog isOpen={isOpen} maxWidth="md" title="Modificar Contrato">
    <Query
      query={ALL_TOWNS_TOWNSHIPS_STREETS_CLIENT_CONTRACT_QUERY}
      variables={{ id: idContract }}
    >
      {({
        data: { allTowns, allTownships, allStreets, clientContractById },
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

        return (
          <Mutation
            mutation={MODIFY_CLIENT_CONTRACT}
            onCompleted={onClose}
            refetchQueries={() => [
              {
                query: ALL_CLIENT_CONTRACT_MOVEMENTS,
                variables: { idContract }
              }
            ]}
            update={(
              cache,
              {
                data: {
                  modifyClientContract: { clientContract }
                }
              }
            ) => {
              const ALL_CLIENT_CONTRACTS_QUERY = gql`
                query($idClient: UUID!) {
                  allClientContracts(idClient: $idClient) {
                    ...AllClientContracts
                  }
                }
                ${ALL_CLIENT_CONTRACTS}
              `;

              const { allClientContracts } = cache.readQuery({
                query: ALL_CLIENT_CONTRACTS_QUERY,
                variables: { idClient: idClient }
              });

              allClientContracts.edges.map(({ node }) =>
                node.id === clientContract.id
                  ? { node: { ...clientContract } }
                  : node
              );

              cache.writeQuery({
                query: ALL_CLIENT_CONTRACTS_QUERY,
                variables: { idClient: idClient },
                data: {
                  allClientContracts: {
                    ...allClientContracts,
                    allClientContracts
                  }
                }
              });

              const CLIENT_CONTRACT_BY_ID_QUERY = gql`
                query($id: UUID!) {
                  clientContractById(id: $id) {
                    ...ClientContractFields
                  }
                }
                ${CLIENT_CONTRACT_FIELDS}
              `;

              cache.writeQuery({
                query: CLIENT_CONTRACT_BY_ID_QUERY,
                variables: { id: idContract },
                data: {
                  clientContractById: {
                    ...clientContract,
                    clientContract
                  }
                }
              });

              return null;
            }}
          >
            {(modifyContract, { error, loading }) => {
              if (loading) return <LoadingProgressSpinner />;

              return (
                <div>
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
                    action={modifyContract}
                    allTownsSuggestions={allTownsSuggestions}
                    allTownshipsSuggestions={allTownshipsSuggestions}
                    allStreetsSuggestions={allStreetsSuggestions}
                    {...clientContractById}
                    onClose={onClose}
                  />
                </div>
              );
            }}
          </Mutation>
        );
      }}
    </Query>
  </CustomDialog>
);
