import gql from "graphql-tag";

export const UPDATE_CREATE_EMPLOYEE_DIALOG_STATE = gql`
  mutation($isOpen: Boolean!) {
    UpdateCreateEmployeeDialogState(isOpen: $isOpen) @client
  }
`;
