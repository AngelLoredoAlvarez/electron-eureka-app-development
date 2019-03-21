import gql from "graphql-tag";

export const ALL_CLIENT_CONTRACT_MOVEMENTS = gql`
  query($idContract: UUID!) {
    allClientContractMovements(idContract: $idContract) {
      edges {
        node {
          formatedMovementDate
          movement
        }
      }
    }
  }
`;
