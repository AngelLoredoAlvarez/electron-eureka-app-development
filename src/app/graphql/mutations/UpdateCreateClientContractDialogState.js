import gql from "graphql-tag";

export const UPDATE_CREATE_CLIENT_CONTRACT_DIALOG_STATE = gql`
  mutation($isOpen: Boolean!) {
    UpdateCreateClientContractDialogState(isOpen: $isOpen) @client
  }
`;
