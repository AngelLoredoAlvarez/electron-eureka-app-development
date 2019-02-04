import { CREATE_CLIENT_CONTRACT_DIALOG_STATE } from "../queries/CreateClientContractDialogState";

export default (_, { isOpen }, { cache }) => {
  const { createClientContractDialogState } = cache.readQuery({
    query: CREATE_CLIENT_CONTRACT_DIALOG_STATE
  });

  const data = {
    createClientContractDialogState: {
      ...createClientContractDialogState,
      isOpen
    }
  };

  cache.writeQuery({
    query: CREATE_CLIENT_CONTRACT_DIALOG_STATE,
    data: data
  });

  return null;
};
