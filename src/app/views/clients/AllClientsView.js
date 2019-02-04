import React from "react";
import { Query } from "react-apollo";
import { CLIENTS_LIST_DIALOG_STATE } from "../../graphql/queries/ClientsListDialogState";
import { AllClientsTable } from "./AllClientsTable";
import { DialogContent } from "@material-ui/core";
import { CustomDialog } from "../../components/CustomDialog";

export const AllClientsView = () => (
  <Query query={CLIENTS_LIST_DIALOG_STATE}>
    {({ client, data: { clientsListDialogState } }) => (
      <CustomDialog
        isOpen={clientsListDialogState.isOpen}
        maxWidth="lg"
        onClose={() =>
          client.writeData({
            data: {
              clientsListDialogState: {
                __typename: "ClientsListDialogState",
                isOpen: false
              }
            }
          })
        }
        title="Clientes"
      >
        <DialogContent>
          <AllClientsTable />
        </DialogContent>
      </CustomDialog>
    )}
  </Query>
);
