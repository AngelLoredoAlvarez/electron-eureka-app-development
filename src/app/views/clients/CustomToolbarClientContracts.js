import React from "react";
import { IconButton, Tooltip } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { Mutation, Query } from "react-apollo";
import { CREATE_CLIENT_CONTRACT_DIALOG_STATE } from "../../graphql/queries/CreateClientContractDialogState";
import { UPDATE_CREATE_CLIENT_CONTRACT_DIALOG_STATE } from "../../graphql/mutations/UpdateCreateClientContractDialogState";
import { CreateClientContractView } from "./CreateClientContractView";

export const CustomToolbarClientContracts = ({ idClient }) => (
  <Query query={CREATE_CLIENT_CONTRACT_DIALOG_STATE}>
    {({ client, data: { createClientContractDialogState } }) => (
      <React.Fragment>
        <Mutation
          mutation={UPDATE_CREATE_CLIENT_CONTRACT_DIALOG_STATE}
          variables={{ isOpen: true }}
        >
          {UpdateCreateClientContractDialogState => (
            <Tooltip title="Nuevo Contrato">
              <IconButton onClick={UpdateCreateClientContractDialogState}>
                <Add />
              </IconButton>
            </Tooltip>
          )}
        </Mutation>
        {createClientContractDialogState.isOpen && (
          <CreateClientContractView
            idClient={idClient}
            isOpen={createClientContractDialogState.isOpen}
            maxWidth="md"
            onClose={() =>
              client.writeData({
                data: {
                  createClientContractDialogState: {
                    __typename: "CreateClientContractDialogState",
                    isOpen: false
                  }
                }
              })
            }
            title="Nuevo Contrato"
          />
        )}
      </React.Fragment>
    )}
  </Query>
);
