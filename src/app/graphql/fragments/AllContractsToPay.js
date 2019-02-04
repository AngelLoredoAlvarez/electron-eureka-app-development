import gql from "graphql-tag";

export const ALL_CONTRACTS_TO_PAY = gql`
  fragment AllContractsToPay on ClientContractsConnection {
    edges {
      node {
        business
        client: clientByIdClient {
          id
          fullName
        }
        formatedStartDate
        formatedEndDate
        typeContract
        status
        id
      }
    }
  }
`;
