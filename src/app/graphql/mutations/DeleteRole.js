import gql from "graphql-tag";

export const DELETE_ROLE = gql`
  mutation($roleInput: DeleteRoleInput!) {
    deleteRole(input: $roleInput) {
      string
    }
  }
`;
