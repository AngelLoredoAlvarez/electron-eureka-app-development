import gql from "graphql-tag";

export const ALL_CLIENT_CONTRACTS = gql`
  fragment AllClientContracts on ClientContractsConnection {
    edges {
      node {
        business
        formatedStartDate
        formatedEndDate
        typeContract: clientContractTypeByIdTypeContract {
          id
          typeName
        }
        status
        id
        nodeId
      }
    }
  }
`;
