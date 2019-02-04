import gql from "graphql-tag";

export const ROLES_LIST_DIALOG_STATE = gql`
  query {
    rolesListDialogState @client {
      isOpen
    }
  }
`;
