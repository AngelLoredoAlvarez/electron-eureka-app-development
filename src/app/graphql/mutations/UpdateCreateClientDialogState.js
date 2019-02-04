import gql from "graphql-tag";

export const UPDATE_CREATE_CLIENT_DIALOG_STATE = gql`
  mutation($isOpen: Boolean!) {
    UpdateCreateClientDialogState(isOpen: $isOpen) @client
  }
`;
