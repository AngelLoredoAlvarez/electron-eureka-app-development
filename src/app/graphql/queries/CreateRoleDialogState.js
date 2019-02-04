import gql from "graphql-tag";

export const CREATE_ROLE_DIALOG_STATE = gql`
  query {
    createRoleDialogState @client {
      isOpen
    }
  }
`;
