import gql from "graphql-tag";

export const CREATE_ROLE = gql`
  mutation($roleData: CreateRoleInput!) {
    createRole(input: $roleData) {
      string
    }
  }
`;
