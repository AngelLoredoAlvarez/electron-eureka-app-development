import gql from "graphql-tag";

export const ALL_ROLES = gql`
  fragment AllRoles on AllRolesConnection {
    edges {
      node
    }
  }
`;
