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
              id
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
  }
`;
