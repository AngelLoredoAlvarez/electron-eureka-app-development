import gql from "graphql-tag";

export const ROLE_BY_NAME = gql`
  query($roleName: String!) {
    roleByName(roleName: $roleName) {
      edges {
        node {
          module
          privileges
        }
      }
    }
  }
`;
