import gql from "graphql-tag";

export const UPDATE_EMPLOYEES_LIST_DIALOG_STATE = gql`
  mutation($isOpen: Boolean!) {
    UpdateEmployeesListDialogState(isOpen: $isOpen) @client
  }
`;
