import gql from "graphql-tag";

export const COLLECT_CONTRACT_DEBT = gql`
  mutation($contractMovementInput: CollectContractDebtInput!) {
    collectContractDebt(input: $contractMovementInput) {
      clientContractMovement {
        contract: clientContractByIdContract {
          business
          client: clientByIdClient {
            fullName
          }
          contacts: businessContactsByIdContract {
            edges {
              node {
                contact
              }
            }
          }
        }
        date
        formatedMovementDate
        idContract
      }
    }
  }
`;
