import React from "react";
import { CustomDialog } from "./CustomDialog";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { PAY_AND_RENOVATE_CLIENT_CONTRACT } from "../graphql/mutations/PayAndRenovateClientContract";
import { ALL_CLIENT_CONTRACTS } from "../graphql/fragments/AllClientContracts";
import { ALL_CONTRACTS_TO_PAY } from "../graphql/fragments/AllContractsToPay";
import { RenovateContractForm } from "../forms/RenovateContractForm";

export const RenovateClientContract = ({
  idClient,
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
          query: gql`
            query($idClient: UUID!) {
              allClientContracts(idClient: $idClient) {
                ...AllClientContracts
              }
            }
            ${ALL_CLIENT_CONTRACTS}
          `,
          variables: { idClient: idClient }
        }
      ]}
      update={(cache, { data: { payAndRenovateClientContract } }) => {
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
          ({ node }) =>
            node.id !== payAndRenovateClientContract.clientContract.id
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
