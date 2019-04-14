import gql from "graphql-tag";

export const CREATE_EMPLOYEE = gql`
  mutation($employeeData: CreateEmployeeInput!) {
    createEmployee(input: $employeeData) {
      employee {
        fullName
        fullAddress
        contacts: employeeContactsByIdEmployee {
          edges {
            node {
              typeContact
              contact
            }
          }
        }
        id
        nodeId
      }
    }
  }
`;
