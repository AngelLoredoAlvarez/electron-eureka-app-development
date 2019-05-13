import gql from "graphql-tag";

export const CREATE_TOWN = gql`
  mutation($townData: CreateTownInput!) {
    createTown(input: $townData) {
      town {
        nodeId
        id
        town
      }
    }
  }
`;
