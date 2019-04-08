import gql from "graphql-tag";

export const TOWNSHIP_BY_ID = gql`
  query($idTownship: UUID!) {
    townshipById(id: $idTownship) {
      id
      typeTownship
      township
      postalCode
      idTown
    }
  }
`;
