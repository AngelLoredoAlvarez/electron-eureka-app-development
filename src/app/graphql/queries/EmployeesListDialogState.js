import gql from "graphql-tag";

export const EMPLOYEES_LIST_DIALOG_STATE = gql`
  query {
    employeesListDialogState @client {
      isOpen
    }
  }
`;
