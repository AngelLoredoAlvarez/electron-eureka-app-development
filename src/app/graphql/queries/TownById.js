import gql from "graphql-tag";

export const TOWN_BY_ID = gql`
  query($idTown: Int!) {
    townById(id: $idTown) {
      nodeId
      id
      town
    }
  }
`;
