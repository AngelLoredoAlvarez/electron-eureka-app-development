import React from "react";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText
} from "@material-ui/core";
import gql from "graphql-tag";
import { Mutation, Query } from "react-apollo";
import { CLIENT_FIELDS } from "../../graphql/fragments/ClientFields";
import { DELETE_CLIENT } from "../../graphql/mutations/DeleteClient";
import { ALL_CLIENTS } from "../../graphql/fragments/AllClients";
import { CustomDialog } from "../../components/CustomDialog";
import { LoadingProgressSpinner } from "../../components/LoadingProgressSpinner";
import { NetworkError } from "../../components/NetworkError";
import { GraphQLError } from "../../components/GraphQLError";

const CLIENT_BY_ID_QUERY = gql`
  query($id: Int!) {
    clientById(id: $id) {
      ...ClientFields
    }
  }
  ${CLIENT_FIELDS}
`;

export const DeleteClientView = ({
  handleDeleteClientViewDialogState,
  id,
  isOpen
}) => (
  <CustomDialog isOpen={isOpen} title="¿Eliminar Cliente?">
    <Query query={CLIENT_BY_ID_QUERY} variables={{ id }}>
      {({ data, loading }) => {
        if (loading) return <LoadingProgressSpinner />;

        return (
          <Mutation
            mutation={DELETE_CLIENT}
            onCompleted={handleDeleteClientViewDialogState}
            update={(cache, { data: { deleteClient } }) => {
              const ALL_CLIENTS_QUERY = gql`
                query {
                  allClients(orderBy: CREATED_AT_DESC) {
                    ...AllClients
                  }
                }
                ${ALL_CLIENTS}
              `;

              let { allClients } = cache.readQuery({
                query: ALL_CLIENTS_QUERY
              });

              allClients.edges = allClients.edges.filter(
                ({ node }) => node.nodeId !== deleteClient.client.nodeId
              );

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
            variables={{ clientInput: { id } }}
          >
            {(deleteClient, { error, loading }) => {
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
                      ¿Está seguro de eliminar al Cliente {data.clientById.name}{" "}
                      {data.clientById.firstName} {data.clientById.lastName}?
                      (Se eliminara toda información personal asociada a este
                      cliente)
                    </DialogContentText>
                    <DialogActions>
                      <Button
                        color="primary"
                        onClick={deleteClient}
                        variant="contained"
                      >
                        Sí
                      </Button>
                      <Button
                        color="secondary"
                        onClick={handleDeleteClientViewDialogState}
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
        );
      }}
    </Query>
  </CustomDialog>
);
