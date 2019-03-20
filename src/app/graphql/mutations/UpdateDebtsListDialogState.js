import gql from "graphql-tag";

export const UPDATE_DEBTS_LIST_DIALOG_STATE = gql`
  mutation($isOpen: Boolean!) {
    UpdateDebtsListDialogState(isOpen: $isOpen) @client
  }
`;
