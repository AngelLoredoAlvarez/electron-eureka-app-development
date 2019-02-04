import React from "react";
import { Query } from "react-apollo";
import { EMPLOYEES_LIST_DIALOG_STATE } from "../../graphql/queries/EmployeesListDialogState";
import { DialogContent } from "@material-ui/core";
import { CustomDialog } from "../../components/CustomDialog";
import { AllEmployeesTable } from "./AllEmployeesTable";

export const AllEmployeesView = () => (
  <Query query={EMPLOYEES_LIST_DIALOG_STATE}>
    {({ client, data: { employeesListDialogState } }) => (
      <CustomDialog
        isOpen={employeesListDialogState.isOpen}
        maxWidth="lg"
        onClose={() =>
          client.writeData({
            data: {
              employeesListDialogState: {
                __typename: "EmployeesListDialogState",
                isOpen: false
              }
            }
          })
        }
        title="Empleados"
      >
        <DialogContent>
          <AllEmployeesTable />
        </DialogContent>
      </CustomDialog>
    )}
  </Query>
);
