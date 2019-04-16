import gql from "graphql-tag";

export const MODIFY_CLIENT_CONTRACT = gql`
  mutation($contractData: ModifyClientContractInput!) {
    modifyClientContract(input: $contractData) {
      clientContract {
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
        formatedStartDate
        formatedEndDate
        status
        id
        nodeId
      }
    }
  }
`;
