import gql from "graphql-tag";

export const CHARGE_MONTH = gql`
  mutation($monthInput: ChargeMonthInput!) {
    chargeMonth(input: $monthInput) {
      contract: clientContractByIdContract {
        business
        client: clientByIdClient {
          id
          fullName
        }
        contacts: businessContactsByIdContract {
          edges {
            node {
              contact
            }
          }
        }
        id
      }
    }
  }
`;
