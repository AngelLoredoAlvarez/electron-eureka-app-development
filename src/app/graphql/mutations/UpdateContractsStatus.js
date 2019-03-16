import gql from "graphql-tag";

export const UPDATE_CONTRACTS_STATUS = gql`
  mutation {
    updateContractsStatus(input: {}) {
      clientMutationId
    }
  }
`;
