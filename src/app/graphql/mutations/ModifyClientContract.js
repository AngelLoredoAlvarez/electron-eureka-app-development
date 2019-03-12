import gql from "graphql-tag";

export const MODIFY_CLIENT_CONTRACT = gql`
  mutation($contractData: ModifyClientContractInput!) {
    modifyClientContract(input: $contractData) {
      clientContract {
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
    }
  }
`;
