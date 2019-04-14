import gql from "graphql-tag";

export const DELETE_EMPLOYEE = gql`
  mutation($employeeInput: DeleteEmployeeInput!) {
    deleteEmployee(input: $employeeInput) {
      employee {
        nodeId
        name
        firstName
        lastName
        idTown
        idTownship
        idStreet
        exteriorNumber
        createdAt
      }
    }
  }
`;
