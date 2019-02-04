import gql from "graphql-tag";

export const EMPLOYEE_PRIVILEGES = gql`
  fragment EmployeePrivileges on CurrentEmployee {
    privilegesModules {
      module
      privileges
    }
  }
`;
