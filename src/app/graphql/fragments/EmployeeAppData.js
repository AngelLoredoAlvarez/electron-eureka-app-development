import gql from "graphql-tag";

export const EMPLOYEE_APP_DATA = gql`
  fragment EmployeeAppData on CurrentEmployee {
    employee {
      fullName
      id
      nodeId
    }
    employeeUser {
      username
      role
      nodeId
    }
  }
`;
