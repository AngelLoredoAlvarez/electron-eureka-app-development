import gql from "graphql-tag";

export const MODIFY_EMPLOYEE = gql`
  mutation modifyEmployee($employeeData: ModifyEmployeeInput!) {
    modifyEmployee(input: $employeeData) {
      selectedEmployee {
        employee {
          name
          firstName
          lastName
          fullName
          idTown
          idTownship
          idStreet
          exteriorNumber
          fullAddress
          contacts: employeeContactsByIdEmployee {
            edges {
              node {
                typeContact
                contact
              }
            }
          }
          nodeId
        }
        employeeUser {
          username
          role
          nodeId
        }
      }
    }
  }
`;
