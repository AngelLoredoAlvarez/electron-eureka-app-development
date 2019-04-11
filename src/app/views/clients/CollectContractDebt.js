import React, { useState } from "react";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  Fab,
  Tooltip
} from "@material-ui/core";
import { AttachMoney } from "@material-ui/icons";
import { CustomDialog } from "../../components/CustomDialog";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { COLLECT_CONTRACT_DEBT } from "../../graphql/mutations/CollectContractDebt";
import { ALL_CLIENT_CONTRACTS } from "../../graphql/fragments/AllClientContracts";
import { ALL_CLIENT_CONTRACT_MOVEMENTS } from "../../graphql/queries/AllClientContractMovements";
import { ALL_CLIENTS_DEBTS } from "../../graphql/queries/AllClientsDebts";
import { LoadingProgressSpinner } from "../../components/LoadingProgressSpinner";

export const CollectContractDebt = ({
  client,
  idClient,
  dateOfDebt,
  idContract
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <React.Fragment>
      <Tooltip title="Cobrar">
        <Fab
          color="primary"
          onClick={() => setIsOpen(prevState => !prevState)}
          size="small"
        >
          <AttachMoney />
        </Fab>
      </Tooltip>
      {isOpen && (
        <CustomDialog isOpen={isOpen} maxWidth="sm" title="¿Cobrar Adeudo?">
          <Mutation
            mutation={COLLECT_CONTRACT_DEBT}
            onCompleted={() => setIsOpen(prevState => !prevState)}
            refetchQueries={() => [
              {
                query: ALL_CLIENTS_DEBTS
              },
              {
                query: gql`
                  query($idClient: Int!) {
                    allClientContracts(idClient: $idClient) {
                      ...AllClientContracts
                    }
                  }
                  ${ALL_CLIENT_CONTRACTS}
                `,
                variables: { idClient }
              },
              {
                query: ALL_CLIENT_CONTRACT_MOVEMENTS,
                variables: { idContract }
              }
            ]}
            variables={{
              contractMovementInput: {
                dateOfDebt: dateOfDebt,
                idContract: idContract
              }
            }}
          >
            {(collectContractDebt, { loading }) => {
              if (loading) return <LoadingProgressSpinner />;

              return (
                <React.Fragment>
                  <DialogContent>
                    <DialogContentText>
                      ¿Desea cobrar el adeudo del cliente: {client}?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      color="primary"
                      onClick={collectContractDebt}
                      variant="contained"
                    >
                      Cobrar
                    </Button>
                    <Button
                      color="secondary"
                      onClick={() => setIsOpen(prevState => !prevState)}
                      variant="contained"
                    >
                      Cancelar
                    </Button>
                  </DialogActions>
                </React.Fragment>
              );
            }}
          </Mutation>
        </CustomDialog>
      )}
    </React.Fragment>
  );
};
