import gql from "graphql-tag";

export const CREATE_CLIENT_CONTRACT = gql`
  mutation($contractData: CreateClientContractInput!) {
    createClientContract(input: $contractData) {
      clientContract {
        business
        typeContract: clientContractTypeByIdTypeContract {
          typeName
        }
        formatedStartDate
        formatedEndDate
        status
        id
      }
    }
  }
`;
