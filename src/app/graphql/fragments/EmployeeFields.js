import gql from "graphql-tag";

export const EMPLOYEE_FIELDS = gql`
  fragment EmployeeFields on Employee {
    nodeId
    name
    firstName
    lastName
    idTown
    idTownship
    idStreet
    exteriorNumber
    contacts: employeeContactsByIdEmployee {
      edges {
        node {
          typeContact
          contact
        }
      }
    }
  }
`;
