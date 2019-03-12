import gql from "graphql-tag";

export const CREATE_CLIENT_DIALOG_STATE = gql`
  query {
    createClientDialogState @client {
      isOpen
    }
  }
`;
