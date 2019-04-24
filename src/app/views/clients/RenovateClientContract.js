import React from "react";
import { CustomDialog } from "../../components/CustomDialog";
import { Mutation } from "react-apollo";
import { PAY_AND_RENOVATE_CLIENT_CONTRACT } from "../../graphql/mutations/PayAndRenovateClientContract";
import { ALL_CLIENT_CONTRACT_MOVEMENTS } from "../../graphql/queries/AllClientContractMovements";
import { RenovateContractForm } from "../../forms/RenovateContractForm";

export const RenovateClientContract = ({
  idContract,
  isOpen,
  onClose,
  typeContract
}) => (
  <CustomDialog isOpen={isOpen} maxWidth="sm" title="Renovar Contrato">
    <Mutation
      mutation={PAY_AND_RENOVATE_CLIENT_CONTRACT}
      onCompleted={onClose}
      refetchQueries={() => [
        {
          query: ALL_CLIENT_CONTRACT_MOVEMENTS,
          variables: { idContract }
        }
      ]}
    >
      {payAndRenovateClientContract => (
        <RenovateContractForm
          idContract={idContract}
          onClose={onClose}
          payAndRenovateClientContract={payAndRenovateClientContract}
          typeContract={typeContract}
        />
      )}
    </Mutation>
  </CustomDialog>
);
