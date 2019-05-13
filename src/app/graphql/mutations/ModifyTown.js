import gql from "graphql-tag";

export const MODIFY_TOWN = gql`
  mutation($townData: ModifyTownInput!) {
    modifyTown(input: $townData) {
      town {
        nodeId
        id
        town
      }
    }
  }
`;
