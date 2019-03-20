import React from "react";
import { Query } from "react-apollo";
import { DEBTS_LIST_DIALOG_STATE } from "../../graphql/queries/DebtsListDialogState";
import { AllDebtsTable } from "./AllDebtsTable";
import { DialogContent } from "@material-ui/core";
import { CustomDialog } from "../../components/CustomDialog";

export const AllDebtsView = () => (
  <Query query={DEBTS_LIST_DIALOG_STATE}>
    {({ client, data: { debtsListDialogState } }) => (
      <CustomDialog
        isOpen={debtsListDialogState.isOpen}
        maxWidth="lg"
        onClose={() =>
          client.writeData({
            data: {
              debtsListDialogState: {
                __typename: "DebtsListDialogState",
                isOpen: false
              }
            }
          })
        }
        title="Adeudos"
      >
        <DialogContent>
          <AllDebtsTable />
        </DialogContent>
      </CustomDialog>
    )}
  </Query>
);
