import gql from "graphql-tag";

export const CREATE_EMPLOYEE_DIALOG_STATE = gql`
  query {
    createEmployeeDialogState @client {
      isOpen
    }
  }
`;
