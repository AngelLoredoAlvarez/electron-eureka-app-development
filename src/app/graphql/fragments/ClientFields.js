import gql from "graphql-tag";

export const CLIENT_FIELDS = gql`
  fragment ClientFields on Client {
    name
    firstName
    lastName
    idTown
    idTownship
    idStreet
    exteriorNumber
    interiorNumber
    contacts: clientContactsByIdClient {
      edges {
        node {
          typeContact
          contact
        }
      }
    }
  }
`;
