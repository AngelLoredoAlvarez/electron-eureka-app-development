import { DEBTS_LIST_DIALOG_STATE } from "../queries/DebtsListDialogState";

export default (_, { isOpen }, { cache }) => {
  const { debtsListDialogState } = cache.readQuery({
    query: DEBTS_LIST_DIALOG_STATE
  });

  const data = {
    debtsListDialogState: {
      ...debtsListDialogState,
      isOpen
    }
  };

  cache.writeQuery({
    query: DEBTS_LIST_DIALOG_STATE,
    data: data
  });

  return null;
};
