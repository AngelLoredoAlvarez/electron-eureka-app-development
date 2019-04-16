import gql from "graphql-tag";

export const EMPLOYEE_APP_DATA = gql`
  fragment EmployeeAppData on CurrentEmployee {
    employee {
      nodeId
      id
      fullName
    }
    employeeUser {
      role
    }
  }
`;
