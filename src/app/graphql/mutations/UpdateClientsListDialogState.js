import gql from "graphql-tag";

export const UPDATE_CLIENTS_LIST_DIALOG_STATE = gql`
  mutation($isOpen: Boolean!) {
    UpdateClientsListDialogState(isOpen: $isOpen) @client
  }
`;
