import gql from "graphql-tag";

export const ALL_CLIENT_CONTRACT_TYPES = gql`
  fragment AllClientContractTypes on ClientContractTypesConnection {
    edges {
      node {
        typeName
        monthPrice
        id
        nodeId
      }
    }
  }
`;
