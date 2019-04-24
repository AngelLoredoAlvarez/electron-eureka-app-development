import gql from "graphql-tag";

export const CLIENT_CONTRACT_FIELDS = gql`
  fragment ClientContractFields on ClientContract {
    business
    typeContract: clientContractTypeByIdTypeContract {
      id
      typeName
    }
    idTown
    idTownship
    idStreet
    exteriorNumber
    fullAddress
    contacts: businessContactsByIdContract {
      edges {
        node {
          typeContact
          contact
        }
      }
    }
    nodeId
  }
`;
