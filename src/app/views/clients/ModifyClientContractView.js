import React from "react";
import { CustomDialog } from "../../components/CustomDialog";
import { ContractForm } from "../../forms/ContractForm";
import gql from "graphql-tag";
import { Mutation, Query } from "react-apollo";
import { ALL_TOWNS } from "../../graphql/fragments/AllTowns";
import { ALL_TOWNSHIPS } from "../../graphql/fragments/AllTownships";
import { ALL_STREETS } from "../../graphql/fragments/AllStreets";
import { ALL_CLIENT_CONTRACT_TYPES } from "../../graphql/fragments/AllClientContractTypes";
import { CLIENT_CONTRACT_FIELDS } from "../../graphql/fragments/ClientContractFields";
import { MODIFY_CLIENT_CONTRACT } from "../../graphql/mutations/ModifyClientContract";
import { ALL_CLIENT_CONTRACT_MOVEMENTS } from "../../graphql/queries/AllClientContractMovements";
import { LoadingProgressSpinner } from "../../components/LoadingProgressSpinner";
import { NetworkError } from "../../components/NetworkError";
import { GraphQLError } from "../../components/GraphQLError";

const ALL_TOWNS_TOWNSHIPS_STREETS_CLIENT_CONTRACT_QUERY = gql`
  query($id: Int!) {
    allTowns {
      ...AllTowns
    }
    allTownships {
      ...AllTownships
    }
    allStreets {
      ...AllStreets
    }
    allClientContractTypes {
      ...AllClientContractTypes
    }
    clientContractById(id: $id) {
      ...ClientContractFields
    }
  }
  ${ALL_TOWNS}
  ${ALL_TOWNSHIPS}
  ${ALL_STREETS}
  ${ALL_CLIENT_CONTRACT_TYPES}
  ${CLIENT_CONTRACT_FIELDS}
`;

export const ModifyClientContractView = ({ idContract, isOpen, onClose }) => (
  <CustomDialog isOpen={isOpen} maxWidth="md" title="Modificar Contrato">
    <Query
      query={ALL_TOWNS_TOWNSHIPS_STREETS_CLIENT_CONTRACT_QUERY}
      variables={{ id: idContract }}
    >
      {({
        data: {
          allTowns,
          allTownships,
          allStreets,
          allClientContractTypes,
          clientContractById
        },
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
            mutation={MODIFY_CLIENT_CONTRACT}
            onCompleted={onClose}
            refetchQueries={() => [
              {
                query: ALL_CLIENT_CONTRACT_MOVEMENTS,
                variables: { idContract }
              }
            ]}
          >
            {(modifyContract, { error, loading }) => {
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
                    action={modifyContract}
                    allTownsSuggestions={allTownsSuggestions}
                    allTownshipsSuggestions={allTownshipsSuggestions}
                    allStreetsSuggestions={allStreetsSuggestions}
                    allClientContractTypesSuggestions={
                      allClientContractTypesSuggestions
                    }
                    {...clientContractById}
                    idContract={idContract}
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
