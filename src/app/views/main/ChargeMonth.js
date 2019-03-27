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
import { CHARGE_MONTH } from "../../graphql/mutations/ChargeMonth";
import { ALL_CONTRACTS_TO_PAY } from "../../graphql/fragments/AllContractsToPay";
import { ALL_CLIENT_CONTRACT_MOVEMENTS } from "../../graphql/queries/AllClientContractMovements";
import { LoadingProgressSpinner } from "../../components/LoadingProgressSpinner";

const ALL_CONTRACTS_TO_PAY_QUERY = gql`
  query {
    allContractsToPay {
      ...AllContractsToPay
    }
  }
  ${ALL_CONTRACTS_TO_PAY}
`;

export const ChargeMonth = ({ client, idContract }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <React.Fragment>
      <Tooltip title="Cobrar Mensualidad">
        <Fab color="primary" onClick={() => setIsOpen(!isOpen)} size="small">
          <AttachMoney />
        </Fab>
      </Tooltip>
      {isOpen && (
        <CustomDialog
          isOpen={isOpen}
          maxWidth="sm"
          title="¿Cobrar Mensualidad?"
        >
          <Mutation
            mutation={CHARGE_MONTH}
            onCompleted={() => setIsOpen(!isOpen)}
            refetchQueries={() => [
              {
                query: ALL_CLIENT_CONTRACT_MOVEMENTS,
                variables: { idContract }
              }
            ]}
            update={(cache, { data: { chargeMonth } }) => {
              let { allContractsToPay } = cache.readQuery({
                query: ALL_CONTRACTS_TO_PAY_QUERY
              });

              allContractsToPay.edges = allContractsToPay.edges.filter(
                ({ node }) => node.contract.id !== chargeMonth.contract.id
              );

              cache.writeQuery({
                query: ALL_CONTRACTS_TO_PAY_QUERY,
                data: {
                  allContractsToPay: {
                    ...allContractsToPay,
                    allContractsToPay
                  }
                }
              });

              return null;
            }}
            variables={{ month: { idContract } }}
          >
            {(chargeMonth, { loading }) => {
              if (loading) return <LoadingProgressSpinner />;

              return (
                <React.Fragment>
                  <DialogContent>
                    <DialogContentText>
                      ¿Desea cobrar la mensualidad del cliente: {client}?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      color="primary"
                      onClick={chargeMonth}
                      variant="contained"
                    >
                      Cobrar
                    </Button>
                    <Button
                      color="secondary"
                      onClick={() => setIsOpen(!isOpen)}
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
