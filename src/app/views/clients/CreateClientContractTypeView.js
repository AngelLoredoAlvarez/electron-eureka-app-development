import React from "react";
import { CustomDialog } from "../../components/CustomDialog";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { CREATE_CLIENT_CONTRACT_TYPE } from "../../graphql/mutations/CreateClientContractType";
import { ClientContractTypeForm } from "../../forms/ClientContractTypeForm";
import { ALL_CLIENT_CONTRACT_TYPES } from "../../graphql/fragments/AllClientContractTypes";
import { NetworkError } from "../../components/NetworkError";
import { GraphQLError } from "../../components/GraphQLError";
import { LoadingProgressSpinner } from "../../components/LoadingProgressSpinner";

export const CreateClientContractTypeView = ({ isOpen, onClose }) => (
  <CustomDialog isOpen={isOpen} maxWidth="sm" title="Crear Tipo de Contrato">
    <Mutation
      mutation={CREATE_CLIENT_CONTRACT_TYPE}
      onCompleted={onClose}
      update={(
        cache,
        {
          data: {
            createClientContractType: { clientContractType }
          }
        }
      ) => {
        const ALL_CLIENT_CONTRACT_TYPES_QUERY = gql`
          query {
            allClientContractTypes(orderBy: ID_DESC) {
              ...AllClientContractTypes
            }
          }
          ${ALL_CLIENT_CONTRACT_TYPES}
        `;

        const { allClientContractTypes } = cache.readQuery({
          query: ALL_CLIENT_CONTRACT_TYPES_QUERY
        });

        allClientContractTypes.edges.unshift({
          node: {
            ...clientContractType
          },
          __typename: "ClientContractTypesEdge"
        });

        cache.writeQuery({
          query: ALL_CLIENT_CONTRACT_TYPES_QUERY,
          data: {
            allClientContractTypes: {
              ...allClientContractTypes,
              allClientContractTypes
            }
          }
        });

        return null;
      }}
    >
      {(createClientContractType, { error, loading }) => {
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

            <ClientContractTypeForm
              action={createClientContractType}
              onClose={onClose}
            />
          </React.Fragment>
        );
      }}
    </Mutation>
  </CustomDialog>
);
