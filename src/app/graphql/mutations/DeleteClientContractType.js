import gql from "graphql-tag";

export const DELETE_CLIENT_CONTRACT_TYPE = gql`
  mutation($clientContractTypeInput: DeleteClientContractTypeInput!) {
    deleteClientContractType(input: $clientContractTypeInput) {
      clientContractType {
        nodeId
      }
    }
  }
`;
