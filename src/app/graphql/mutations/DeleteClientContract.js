import gql from "graphql-tag";

export const DELETE_CLIENT_CONTRACT = gql`
  mutation($contractInput: DeleteClientContractInput!) {
    deleteClientContract(input: $contractInput) {
      clientContract {
        id
        business
        idTown
        idTownship
        idStreet
        exteriorNumber
        interiorNumber
        typeContract
        startDate
        endDate
        idClient
      }
    }
  }
`;
