import gql from "graphql-tag";

export const MODIFY_STREET = gql`
  mutation($streetData: ModifyStreetInput!) {
    modifyStreet(input: $streetData) {
      street {
        nodeId
        id
        street
        idTownship
      }
    }
  }
`;
