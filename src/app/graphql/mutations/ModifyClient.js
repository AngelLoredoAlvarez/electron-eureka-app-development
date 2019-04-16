import gql from "graphql-tag";

export const MODIFY_CLIENT = gql`
  mutation($clientData: ModifyClientInput!) {
    modifyClient(input: $clientData) {
      client {
        name
        firstName
        lastName
        fullName
        idTown
        idTownship
        idStreet
        exteriorNumber
        fullAddress
        contacts: clientContactsByIdClient {
          edges {
            node {
              typeContact
              contact
            }
          }
        }
        nodeId
      }
    }
  }
`;
