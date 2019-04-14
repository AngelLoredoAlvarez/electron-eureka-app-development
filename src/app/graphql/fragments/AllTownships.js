import gql from "graphql-tag";

export const ALL_TOWNSHIPS = gql`
  fragment AllTownships on TownshipsConnection {
    edges {
      node {
        nodeId
        id
        township
        idTown
      }
    }
  }
`;
