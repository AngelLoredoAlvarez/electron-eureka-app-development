import gql from "graphql-tag";

export const CLIENT_CONTRACT_FIELDS = gql`
  fragment ClientContractFields on ClientContract {
    business
    typeContract: clientContractTypeByIdTypeContract {
      id
    }
    idTown
    idTownship
    idStreet
    exteriorNumber
    contacts: businessContactsByIdContract {
      edges {
        node {
          typeContact
          contact
        }
      }
    }
  }
`;
