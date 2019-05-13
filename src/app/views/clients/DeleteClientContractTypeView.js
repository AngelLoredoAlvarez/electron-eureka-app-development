import React, { useState } from "react";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  IconButton,
  Tooltip
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { CustomDialog } from "../../components/CustomDialog";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { DELETE_CLIENT_CONTRACT_TYPE } from "../../graphql/mutations/DeleteClientContractType";
import { ALL_CLIENT_CONTRACT_TYPES } from "../../graphql/fragments/AllClientContractTypes";
import { LoadingProgressSpinner } from "../../components/LoadingProgressSpinner";
import { NetworkError } from "../../components/NetworkError";
import { GraphQLError } from "../../components/GraphQLError";

export const DeleteClientContractTypeView = ({ id, typeName }) => {
  const [isOpen, setDeleteClientContractTypeIsOpen] = useState(false);

  return (
    <React.Fragment>
      <Tooltip title="Eliminar Tipo de Contrato">
        <IconButton
          onClick={() =>
            setDeleteClientContractTypeIsOpen(prevState => !prevState)
          }
        >
          <Delete />
        </IconButton>
      </Tooltip>
      {isOpen && (
        <CustomDialog
          isOpen={isOpen}
          maxWidth="sm"
          title="¿Eliminar Tipo de Contracto?"
        >
          <Mutation
            mutation={DELETE_CLIENT_CONTRACT_TYPE}
            onCompleted={() =>
              setDeleteClientContractTypeIsOpen(prevState => !prevState)
            }
            update={(cache, { data: { deleteClientContractType } }) => {
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

              allClientContractTypes.edges = allClientContractTypes.edges.filter(
                ({ node }) =>
                  node.nodeId !==
                  deleteClientContractType.clientContractType.nodeId
              );

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
            variables={{ clientContractTypeInput: { id } }}
          >
            {(deleteClientContractType, { error, loading }) => {
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

                  <DialogContent>
                    <DialogContentText>
                      ¿Estás seguro de eliminar tl tipo de contrato {typeName}?
                    </DialogContentText>
                    <DialogActions>
                      <Button
                        color="primary"
                        onClick={deleteClientContractType}
                        variant="contained"
                      >
                        Sí
                      </Button>
                      <Button
                        color="secondary"
                        onClick={() =>
                          setDeleteClientContractTypeIsOpen(
                            prevState => !prevState
                          )
                        }
                        variant="contained"
                      >
                        No
                      </Button>
                    </DialogActions>
                  </DialogContent>
                </React.Fragment>
              );
            }}
          </Mutation>
        </CustomDialog>
      )}
    </React.Fragment>
  );
};
