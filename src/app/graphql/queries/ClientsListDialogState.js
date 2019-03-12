import gql from "graphql-tag";

export const CLIENTS_LIST_DIALOG_STATE = gql`
  query {
    clientsListDialogState @client {
      isOpen
    }
  }
`;
