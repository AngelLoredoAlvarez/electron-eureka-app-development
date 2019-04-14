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
import { ALL_CLIENT_CONTRACTS } from "../../graphql/fragments/AllClientContracts";
import { ALL_CLIENT_CONTRACT_MOVEMENTS } from "../../graphql/queries/AllClientContractMovements";
import { LoadingProgressSpinner } from "../../components/LoadingProgressSpinner";

export const ChargeMonth = ({ client, idClient, idContract }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <React.Fragment>
      <Tooltip title="Cobrar Mensualidad">
        <Fab
          color="primary"
          onClick={() => setIsOpen(prevState => !prevState)}
          size="small"
        >
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
            onCompleted={() => setIsOpen(prevState => !prevState)}
            refetchQueries={() => [
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
            update={(cache, { data: { chargeMonth } }) => {
              const ALL_CONTRACTS_TO_PAY_QUERY = gql`
                query {
                  allContractsToPay {
                    ...AllContractsToPay
                  }
                }
                ${ALL_CONTRACTS_TO_PAY}
              `;

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
            variables={{ monthInput: { idContract } }}
          >
            {(chargeMonth, { loading }) => {
              if (loading) return <LoadingProgressSpinner />;

              return (
                <React.Fragment>
                  <DialogContent>
                    <DialogContentText>
                      ¿Desea cobrar la mensualidad del cliente:{" "}
                      {client.fullName}?
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
