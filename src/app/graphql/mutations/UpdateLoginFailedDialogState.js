import gql from "graphql-tag";

export const UPDATE_LOGIN_FAILED_DIALOG_STATE = gql`
  mutation($isOpen: Boolean!) {
    UpdateLoginFailedDialogState(isOpen: $isOpen) @client
  }
`;
