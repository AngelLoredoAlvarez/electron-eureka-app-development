import { CLIENTS_LIST_DIALOG_STATE } from "../queries/ClientsListDialogState";

export default (_, { isOpen }, { cache }) => {
  const { clientsListDialogState } = cache.readQuery({
    query: CLIENTS_LIST_DIALOG_STATE
  });

  const data = {
    clientsListDialogState: {
      ...clientsListDialogState,
      isOpen
    }
  };

  cache.writeQuery({
    query: CLIENTS_LIST_DIALOG_STATE,
    data: data
  });

  return null;
};
