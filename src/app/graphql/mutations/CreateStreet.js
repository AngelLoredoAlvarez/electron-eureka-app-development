import gql from "graphql-tag";

export const CREATE_STREET = gql`
  mutation($streetData: CreateStreetInput!) {
    createStreet(input: $streetData) {
      street {
        nodeId
        id
        street
        idTownship
      }
    }
  }
`;
