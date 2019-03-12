import gql from "graphql-tag";

export const CURRENT_EMPLOYEE_ALL_CONTRACTS_TO_PAY = gql`
  query {
    currentEmployee {
      employee {
        fullName
      }
    }
    allContractsToPay {
      edges {
        node {
          business
          client: clientByIdClient {
            fullName
          }
          formatedStartDate
          formatedEndDate
          typeContract
        }
      }
    }
  }
`;
