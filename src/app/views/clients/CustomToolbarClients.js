import React from "react";
import { IconButton, Tooltip } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { Mutation, Query } from "react-apollo";
import { CREATE_CLIENT_DIALOG_STATE } from "../../graphql/queries/CreateClientDialogState";
import { UPDATE_CREATE_CLIENT_DIALOG_STATE } from "../../graphql/mutations/UpdateCreateClientDialogState";
import { CreateClientView } from "./CreateClientView";

export const CustomToolbarClients = () => (
  <Query query={CREATE_CLIENT_DIALOG_STATE}>
    {({ client, data: { createClientDialogState } }) => (
      <React.Fragment>
        <Mutation
          mutation={UPDATE_CREATE_CLIENT_DIALOG_STATE}
          variables={{ isOpen: true }}
        >
          {UpdateCreateClientDialogState => (
            <Tooltip title="Nuevo Cliente">
              <IconButton onClick={UpdateCreateClientDialogState}>
                <Add />
              </IconButton>
            </Tooltip>
          )}
        </Mutation>
        {createClientDialogState.isOpen && (
          <CreateClientView
            isOpen={createClientDialogState.isOpen}
            maxWidth="md"
            onClose={() =>
              client.writeData({
                data: {
                  createClientDialogState: {
                    __typename: "CreateClientDialogState",
                    isOpen: false
                  }
                }
              })
            }
            title="Nuevo Cliente"
          />
        )}
      </React.Fragment>
    )}
  </Query>
);
