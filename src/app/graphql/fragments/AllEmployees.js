import gql from "graphql-tag";

export const ALL_EMPLOYEES = gql`
  fragment AllEmployees on EmployeesConnection {
    edges {
      node {
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
