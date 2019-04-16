import gql from "graphql-tag";

export const ALL_CLIENT_CONTRACTS = gql`
  fragment AllClientContracts on ClientContractsConnection {
    edges {
      node {
        business
        typeContract: clientContractTypeByIdTypeContract {
          id
          typeName
        }
        formatedStartDate
        formatedEndDate
        status
        id
        nodeId
      }
    }
  }
`;
