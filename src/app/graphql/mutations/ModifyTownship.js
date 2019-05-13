import gql from "graphql-tag";

export const MODIFY_TOWNSHIP = gql`
  mutation($townshipData: ModifyTownshipInput!) {
    modifyTownship(input: $townshipData) {
      township {
        nodeId
        id
        typeTownship
        township
        postalCode
        idTown
      }
    }
  }
`;
