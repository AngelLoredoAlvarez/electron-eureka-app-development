import gql from "graphql-tag";

export const MODIFY_CLIENT_CONTRACT_TYPE = gql`
  mutation($clientContractTypeData: ModifyClientContractTypeInput!) {
    modifyClientContractType(input: $clientContractTypeData) {
      clientContractType {
        typeName
        numberMonths
        monthPrice
        taxType
        taxPercentage
        discountPercentage
        nodeId
      }
    }
  }
`;
