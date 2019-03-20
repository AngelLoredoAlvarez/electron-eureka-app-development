import gql from "graphql-tag";

export const DEBTS_LIST_DIALOG_STATE = gql`
  query {
    debtsListDialogState @client {
      isOpen
    }
  }
`;
