import gql from "graphql-tag";

export const PAY_AND_RENOVATE_CLIENT_CONTRACT = gql`
  mutation($contractInput: PayAndRenovateClientContractInput!) {
    payAndRenovateClientContract(input: $contractInput) {
      clientContract {
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
