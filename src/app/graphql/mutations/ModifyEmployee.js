import gql from "graphql-tag";

export const MODIFY_EMPLOYEE = gql`
  mutation modifyEmployee($employeeData: ModifyEmployeeInput!) {
    modifyEmployee(input: $employeeData) {
      selectedEmployee {
        employee {
          nodeId
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
        }
        employeeUser {
          username
          role
        }
      }
    }
  }
`;
