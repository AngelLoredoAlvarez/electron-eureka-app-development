import React from "react";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText
} from "@material-ui/core";
import gql from "graphql-tag";
import { Mutation, Query } from "react-apollo";
import { CLIENT_CONTRACT_FIELDS } from "../../graphql/fragments/ClientContractFields";
import { DELETE_CLIENT_CONTRACT } from "../../graphql/mutations/DeleteClientContract";
import { ALL_CLIENT_CONTRACTS } from "../../graphql/fragments/AllClientContracts";
import { CustomDialog } from "../../components/CustomDialog";
import { LoadingProgressSpinner } from "../../components/LoadingProgressSpinner";

const CLIENT_CONTRACT_BY_ID_QUERY = gql`
  query($id: Int!) {
    clientContractById(id: $id) {
      ...ClientContractFields
    }
  }
  ${CLIENT_CONTRACT_FIELDS}
`;

export const DeleteClientContractView = ({
  idClient,
  idContract,
  isOpen,
  onClose
}) => (
  <CustomDialog isOpen={isOpen} title="¿Eliminar Contrato?">
    <Query query={CLIENT_CONTRACT_BY_ID_QUERY} variables={{ id: idContract }}>
      {({ data, loading }) => {
        if (loading) return <LoadingProgressSpinner />;

        return (
          <Mutation
            mutation={DELETE_CLIENT_CONTRACT}
            onCompleted={onClose}
            update={(
              cache,
              {
                data: {
                  deleteClientContract: { clientContract }
                }
              }
            ) => {
              const ALL_CLIENT_CONTRACTS_QUERY = gql`
                query($idClient: Int!) {
                  allClientContracts {
                    ...AllClientContracts
                  }
                }
                ${ALL_CLIENT_CONTRACTS}
              `;

              let { allClientContracts } = cache.readQuery({
                query: ALL_CLIENT_CONTRACTS_QUERY,
                variables: { idClient }
              });

              allClientContracts.edges = allClientContracts.edges.filter(
                ({ node }) => node.nodeId !== clientContract.nodeId
              );

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
            variables={{ contractInput: { id: idContract } }}
          >
            {(deleteClientContract, { loading }) => {
              if (loading) return <LoadingProgressSpinner />;

              return (
                <DialogContent>
                  <DialogContentText>
                    ¿Está seguro de eliminar el Contrato del Negocio{" "}
                    {data.clientContractById.business} ? (Se eliminara toda
                    información personal asociada a este contrato)
                  </DialogContentText>
                  <DialogActions>
                    <Button
                      color="primary"
                      onClick={deleteClientContract}
                      variant="contained"
                    >
                      Sí
                    </Button>
                    <Button
                      color="secondary"
                      onClick={onClose}
                      variant="contained"
                    >
                      No
                    </Button>
                  </DialogActions>
                </DialogContent>
              );
            }}
          </Mutation>
        );
      }}
    </Query>
  </CustomDialog>
);
