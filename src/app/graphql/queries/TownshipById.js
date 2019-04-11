import gql from "graphql-tag";

export const TOWNSHIP_BY_ID = gql`
  query($idTownship: Int!) {
    townshipById(id: $idTownship) {
      id
      typeTownship
      township
      postalCode
      idTown
    }
  }
`;
