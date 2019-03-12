import gql from "graphql-tag";

export const ALL_STREETS = gql`
  fragment AllStreets on StreetsConnection {
    edges {
      node {
        id
        street
        idTownship
      }
    }
  }
`;
