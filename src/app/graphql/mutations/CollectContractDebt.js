import gql from "graphql-tag";

export const COLLECT_CONTRACT_DEBT = gql`
  mutation($contractMovementInput: CollectContractDebtInput!) {
    collectContractDebt(input: $contractMovementInput) {
      clientMutationId
    }
  }
`;
