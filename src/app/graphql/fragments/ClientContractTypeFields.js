import gql from "graphql-tag";

export const CLIENT_CONTRACT_TYPE_FIELDS = gql`
  fragment ClientContractTypeFields on ClientContractType {
    typeName
    numberMonths
    monthPrice
    taxType
    taxPercentage
    discountPercentage
    nodeId
  }
`;
