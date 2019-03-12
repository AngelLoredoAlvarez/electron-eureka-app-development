import React from "react";
import { IconButton, Tooltip } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { Mutation, Query } from "react-apollo";
import { CREATE_EMPLOYEE_DIALOG_STATE } from "../../graphql/queries/CreateEmployeeDialogState";
import { UPDATE_CREATE_EMPLOYEE_DIALOG_STATE } from "../../graphql/mutations/UpdateCreateEmployeeDialogState";
import { CreateEmployeeView } from "./CreateEmployeeView";

export const CustomToolbarEmployees = () => (
  <Query query={CREATE_EMPLOYEE_DIALOG_STATE}>
    {({ client, data: { createEmployeeDialogState } }) => (
      <React.Fragment>
        <Mutation
          mutation={UPDATE_CREATE_EMPLOYEE_DIALOG_STATE}
          variables={{ isOpen: true }}
        >
          {UpdateCreateEmployeeDialogState => (
            <Tooltip title="Nuevo Empleado">
              <IconButton onClick={UpdateCreateEmployeeDialogState}>
                <Add />
              </IconButton>
            </Tooltip>
          )}
        </Mutation>
        {createEmployeeDialogState.isOpen && (
          <CreateEmployeeView
            isOpen={createEmployeeDialogState.isOpen}
            maxWidth="md"
            onClose={() =>
              client.writeData({
                data: {
                  createEmployeeDialogState: {
                    __typename: "CreateEmployeeDialogState",
                    isOpen: false
                  }
                }
              })
            }
            title="Nuevo Empleado"
          />
        )}
      </React.Fragment>
    )}
  </Query>
);
