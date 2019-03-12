import { CREATE_CLIENT_DIALOG_STATE } from "../queries/CreateClientDialogState";

export default (_, { isOpen }, { cache }) => {
  const { createClientDialogState } = cache.readQuery({
    query: CREATE_CLIENT_DIALOG_STATE
  });

  const data = {
    createClientDialogState: {
      ...createClientDialogState,
      isOpen
    }
  };

  cache.writeQuery({
    query: CREATE_CLIENT_DIALOG_STATE,
    data: data
  });

  return null;
};
