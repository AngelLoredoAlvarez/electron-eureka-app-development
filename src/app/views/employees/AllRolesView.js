import React from "react";
import { Query } from "react-apollo";
import { ROLES_LIST_DIALOG_STATE } from "../../graphql/queries/RolesListDialogState";
import { CustomDialog } from "../../components/CustomDialog";
import { AllRolesTable } from "./AllRolesTable";

export const AllRolesView = () => (
  <Query query={ROLES_LIST_DIALOG_STATE}>
    {({ client, data: { rolesListDialogState } }) => (
      <CustomDialog
        isOpen={rolesListDialogState.isOpen}
        onClose={() =>
          client.writeData({
            data: {
              rolesListDialogState: {
                __typename: "RolesListDialogState",
                isOpen: false
              }
            }
          })
        }
        title="Roles"
      >
        <AllRolesTable />
      </CustomDialog>
    )}
  </Query>
);
