import gql from "graphql-tag";

export const CREATE_CLIENT = gql`
  mutation($clientData: CreateClientInput!) {
    createClient(input: $clientData) {
      nodeId
      client {
        fullName
        fullAddress
        contacts: clientContactsByIdClient {
          edges {
            node {
              typeContact
              contact
            }
          }
        }
        id
      }
    }
  }
`;
