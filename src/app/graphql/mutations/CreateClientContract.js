import gql from "graphql-tag";

export const CREATE_CLIENT_CONTRACT = gql`
  mutation($contractData: CreateClientContractInput!) {
    createClientContract(input: $contractData) {
      clientContract {
        business
        formatedStartDate
        formatedEndDate
        status
        typeContract
        id
      }
    }
  }
`;
