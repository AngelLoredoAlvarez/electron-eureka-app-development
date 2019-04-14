import gql from "graphql-tag";

export const ALL_CLIENTS = gql`
  fragment AllClients on ClientsConnection {
    edges {
      node {
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
        nodeId
      }
    }
  }
`;
