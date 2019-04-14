import gql from "graphql-tag";

export const ALL_STREETS = gql`
  fragment AllStreets on StreetsConnection {
    edges {
      node {
        nodeId
        id
        street
        idTownship
      }
    }
  }
`;
