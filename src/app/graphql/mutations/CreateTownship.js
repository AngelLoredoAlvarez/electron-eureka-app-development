import gql from "graphql-tag";

export const CREATE_TOWNSHIP = gql`
  mutation($townshipData: CreateTownshipInput!) {
    createTownship(input: $townshipData) {
      township {
        id
        township
        idTown
      }
    }
  }
`;
