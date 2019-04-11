import gql from "graphql-tag";

export const STREET_BY_ID = gql`
  query($idStreet: Int!) {
    streetById(id: $idStreet) {
      id
      street
      idTownship
    }
  }
`;
