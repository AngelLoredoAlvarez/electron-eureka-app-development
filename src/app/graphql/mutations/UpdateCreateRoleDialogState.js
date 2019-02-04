import gql from "graphql-tag";

export const UPDATE_CREATE_ROLE_DIALOG_STATE = gql`
  mutation($isOpen: Boolean!) {
    UpdateCreateRoleDialogState(isOpen: $isOpen) @client
  }
`;
