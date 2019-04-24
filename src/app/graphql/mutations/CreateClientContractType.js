import gql from "graphql-tag";

export const CREATE_CLIENT_CONTRACT_TYPE = gql`
  mutation($clientContractTypeData: CreateClientContractTypeInput!) {
    createClientContractType(input: $clientContractTypeData) {
      clientContractType {
        typeName
        monthPrice
        id
        nodeId
      }
    }
  }
`;
