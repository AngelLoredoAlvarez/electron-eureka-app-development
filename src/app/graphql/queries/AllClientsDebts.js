import gql from "graphql-tag";

export const ALL_CLIENTS_DEBTS = gql`
  query {
    allClientsDebts {
      edges {
        node {
          contract: clientContractByIdContract {
            business
            client: clientByIdClient {
              fullName
            }
          }
          formatedMovementDate
          idContract
        }
      }
    }
  }
`;
