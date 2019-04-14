import gql from "graphql-tag";

export const ALL_TOWNS = gql`
  fragment AllTowns on TownsConnection {
    edges {
      node {
        nodeId
        id
        town
      }
    }
  }
`;
