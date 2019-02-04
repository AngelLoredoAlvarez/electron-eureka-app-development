import gql from "graphql-tag";

export const CLIENT_CONTRACT_FIELDS = gql`
  fragment ClientContractFields on ClientContract {
    business
    idTown
    idTownship
    idStreet
    exteriorNumber
    interiorNumber
    fullAddress
    contacts: businessContactsByIdContract {
      edges {
        node {
          typeContact
          contact
        }
      }
    }
    typeContract
    formatedStartDate
    formatedEndDate
    id
  }
`;
