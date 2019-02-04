import gql from "graphql-tag";

export const PAY_AND_END_CLIENT_CONTRACT = gql`
  mutation($contractInput: PayAndEndClientContractInput!) {
    payAndEndClientContract(input: $contractInput) {
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
