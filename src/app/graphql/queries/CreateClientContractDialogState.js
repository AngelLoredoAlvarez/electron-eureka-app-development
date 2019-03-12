import gql from "graphql-tag";

export const CREATE_CLIENT_CONTRACT_DIALOG_STATE = gql`
  query {
    createClientContractDialogState @client {
      isOpen
    }
  }
`;
