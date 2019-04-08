import gql from "graphql-tag";

export const DELETE_CLIENT = gql`
  mutation($clientInput: DeleteClientInput!) {
    deleteClient(input: $clientInput) {
      client {
        id
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
