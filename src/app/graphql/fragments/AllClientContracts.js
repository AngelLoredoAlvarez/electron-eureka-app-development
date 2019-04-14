import gql from "graphql-tag";

export const ALL_CLIENT_CONTRACTS = gql`
  fragment AllClientContracts on ClientContractsConnection {
    edges {
      node {
        id
        business
        typeContract: clientContractTypeByIdTypeContract {
          typeName
        }
        formatedStartDate
        formatedEndDate
        status
      }
    }
  }
`;
