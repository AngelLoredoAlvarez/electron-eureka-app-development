import gql from "graphql-tag";

export const CHARGE_MONTH = gql`
  mutation($month: ChargeMonthInput!) {
    chargeMonth(input: $month) {
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
        id
      }
    }
  }
`;
