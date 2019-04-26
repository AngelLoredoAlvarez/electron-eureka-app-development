import gql from "graphql-tag";

export const ALL_CONTRACTS_TO_PAY = gql`
  fragment AllContractsToPay on ClientContractMovementsConnection {
    edges {
      node {
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
          nodeId
        }
      }
    }
  }
`;
