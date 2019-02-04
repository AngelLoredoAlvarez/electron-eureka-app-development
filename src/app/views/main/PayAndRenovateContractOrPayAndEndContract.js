import React from "react";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  Fab,
  Tooltip
} from "@material-ui/core";
import { CreditCard } from "@material-ui/icons";
import { CustomDialog } from "../../components/CustomDialog";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { PAY_AND_END_CLIENT_CONTRACT } from "../../graphql/mutations/PayAndEndClientContract";
import { ALL_CONTRACTS_TO_PAY } from "../../graphql/fragments/AllContractsToPay";
import { ALL_CLIENT_CONTRACTS } from "../../graphql/fragments/AllClientContracts";
import { RenovateClientContract } from "../../components/RenovateClientContract";

export class PayAndRenovateContractOrPayAndEndContract extends React.Component {
  state = {
    payAndRenovateContractOrPayAndEndContractIsOpen: false,
    renovateContractIsOpen: false
  };

  handlePayAndRenovateContractOrPayAndEndContractDialogState = () => {
    this.setState(state => ({
      payAndRenovateContractOrPayAndEndContractIsOpen: !state.payAndRenovateContractOrPayAndEndContractIsOpen
    }));
  };

  handleRenovateContractDialogState = () => {
    this.setState(state => ({
      renovateContractIsOpen: !state.renovateContractIsOpen,
      payAndRenovateContractOrPayAndEndContractIsOpen:
        state.payAndRenovateContractOrPayAndEndContractIsOpen &&
        !state.payAndRenovateContractOrPayAndEndContractIsOpen
    }));
  };

  render() {
    return (
      <div>
        <Tooltip title="Cobrar">
          <Fab
            color="primary"
            onClick={
              this.handlePayAndRenovateContractOrPayAndEndContractDialogState
            }
            size="small"
          >
            <CreditCard />
          </Fab>
        </Tooltip>
        {this.state.payAndRenovateContractOrPayAndEndContractIsOpen && (
          <CustomDialog
            isOpen={this.state.payAndRenovateContractOrPayAndEndContractIsOpen}
            maxWidth="sm"
            title="Pagar y Renovar Contrato / Pagar Contrato"
          >
            <DialogContent>
              <DialogContentText>
                ¿Qué acción deseas realizar para el contrato de{" "}
                {this.props.business}?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                color="primary"
                onClick={this.handleRenovateContractDialogState}
                variant="contained"
              >
                Pagar y Renovar
              </Button>
              <Mutation
                mutation={PAY_AND_END_CLIENT_CONTRACT}
                onCompleted={
                  this
                    .handlePayAndRenovateContractOrPayAndEndContractDialogState
                }
                refetchQueries={data => [
                  {
                    query: gql`
                      query($idClient: UUID!) {
                        allClientContracts(
                          condition: { idClient: $idClient }
                          orderBy: START_DATE_DESC
                        ) {
                          ...AllClientContracts
                        }
                      }
                      ${ALL_CLIENT_CONTRACTS}
                    `,
                    variables: { idClient: this.props.idClient }
                  }
                ]}
                update={(cache, { data: { payAndEndClientContract } }) => {
                  const ALL_CONTRACTS_TO_PAY_QUERY = gql`
                    query($idClient: UUID!) {
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
                    ({ node }) =>
                      node.id !== payAndEndClientContract.clientContract.id
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
                variables={{
                  contractInput: { idContract: this.props.idContract }
                }}
              >
                {payAndEndClientContract => (
                  <Button
                    color="default"
                    onClick={payAndEndClientContract}
                    variant="contained"
                  >
                    Pagar y Finalizar
                  </Button>
                )}
              </Mutation>
              <Button
                color="secondary"
                onClick={
                  this
                    .handlePayAndRenovateContractOrPayAndEndContractDialogState
                }
                variant="contained"
              >
                Cancelar
              </Button>
            </DialogActions>
          </CustomDialog>
        )}
        {this.state.renovateContractIsOpen && (
          <RenovateClientContract
            idClient={this.props.idClient}
            idContract={this.props.idContract}
            isOpen={this.state.renovateContractIsOpen}
            onClose={this.handleRenovateContractDialogState}
            typeContract={this.props.typeContract}
          />
        )}
      </div>
    );
  }
}
