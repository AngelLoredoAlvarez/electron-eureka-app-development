import gql from "graphql-tag";

export const TOWN_BY_ID = gql`
  query($idTown: UUID!) {
    townById(id: $idTown) {
      id
      town
    }
  }
`;
