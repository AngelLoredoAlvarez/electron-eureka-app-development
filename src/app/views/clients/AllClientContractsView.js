import React from "react";
import { CustomDialog } from "../../components/CustomDialog";
import { AllClientsContractsTable } from "./AllClientContractsTable";

export const AllClientContractsView = ({
  handleAllClientContractsViewDialogState,
  idClient,
  isOpen
}) => (
  <CustomDialog
    isOpen={isOpen}
    maxWidth="md"
    onClose={handleAllClientContractsViewDialogState}
    title="Contratos del Cliente"
  >
    <AllClientsContractsTable idClient={idClient} />
  </CustomDialog>
);
