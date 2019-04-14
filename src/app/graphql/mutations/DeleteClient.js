import gql from "graphql-tag";

export const DELETE_CLIENT = gql`
  mutation($clientInput: DeleteClientInput!) {
    deleteClient(input: $clientInput) {
      client {
        nodeId
        name
        firstName
        lastName
        idTown
        idTownship
        idStreet
        exteriorNumber
        createdAt
      }
    }
  }
`;
