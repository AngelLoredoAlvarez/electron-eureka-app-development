import React from "react";
import { IconButton, Tooltip } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { Mutation, Query } from "react-apollo";
import { CREATE_ROLE_DIALOG_STATE } from "../../graphql/queries/CreateRoleDialogState";
import { UPDATE_CREATE_ROLE_DIALOG_STATE } from "../../graphql/mutations/UpdateCreateRoleDialogState";
import { CreateRoleView } from "./CreateRoleView";

export const CustomToolbarRoles = () => (
  <Query query={CREATE_ROLE_DIALOG_STATE}>
    {({ client, data: { createRoleDialogState } }) => (
      <React.Fragment>
        <Mutation
          mutation={UPDATE_CREATE_ROLE_DIALOG_STATE}
          variables={{ isOpen: true }}
        >
          {UpdateCreateRoleDialogState => (
            <Tooltip title="Nuevo Rol">
              <IconButton onClick={UpdateCreateRoleDialogState}>
                <Add />
              </IconButton>
            </Tooltip>
          )}
        </Mutation>
        {createRoleDialogState.isOpen && (
          <CreateRoleView
            isOpen={createRoleDialogState.isOpen}
            onClose={() =>
              client.writeData({
                data: {
                  createRoleDialogState: {
                    __typename: "CreateRoleDialogState",
                    isOpen: false
                  }
                }
              })
            }
            title="Nuevo Rol"
          />
        )}
      </React.Fragment>
    )}
  </Query>
);
