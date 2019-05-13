import gql from "graphql-tag";

export const MODIFY_ROLE = gql`
  mutation($roleData: ModifyRoleInput!) {
    modifyRole(input: $roleData) {
      selectedRole {
        roleName
        privileges {
          module
          privileges
        }
      }
    }
  }
`;
