import { CREATE_ROLE_DIALOG_STATE } from "../queries/CreateRoleDialogState";

export default (_, { isOpen }, { cache }) => {
  const { createRoleDialogState } = cache.readQuery({
    query: CREATE_ROLE_DIALOG_STATE
  });

  const data = {
    createRoleDialogState: {
      ...createRoleDialogState,
      isOpen
    }
  };

  cache.writeQuery({
    query: CREATE_ROLE_DIALOG_STATE,
    data: data
  });

  return null;
};
