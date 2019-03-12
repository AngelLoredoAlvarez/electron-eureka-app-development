import { ROLES_LIST_DIALOG_STATE } from "../queries/RolesListDialogState";

export default (_, { isOpen }, { cache }) => {
  const { rolesListDialogState } = cache.readQuery({
    query: ROLES_LIST_DIALOG_STATE
  });

  const data = {
    rolesListDialogState: {
      ...rolesListDialogState,
      isOpen
    }
  };

  cache.writeQuery({
    query: ROLES_LIST_DIALOG_STATE,
    data: data
  });

  return null;
};
