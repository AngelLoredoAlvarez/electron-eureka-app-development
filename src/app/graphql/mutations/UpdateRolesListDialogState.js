import gql from "graphql-tag";

export const UPDATE_ROLES_LIST_DIALOG_STATE = gql`
  mutation($isOpen: Boolean!) {
    UpdateRolesListDialogState(isOpen: $isOpen) @client
  }
`;
