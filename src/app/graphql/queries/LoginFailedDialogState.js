import gql from "graphql-tag";

export const LOGIN_FAILED_DIALOG_STATE = gql`
  query {
    loginFailedDialogState @client {
      isOpen
    }
  }
`;
