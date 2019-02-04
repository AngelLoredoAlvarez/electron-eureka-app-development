import { CREATE_EMPLOYEE_DIALOG_STATE } from "../queries/CreateEmployeeDialogState";

export default (_, { isOpen }, { cache }) => {
  const { createEmployeeDialogState } = cache.readQuery({
    query: CREATE_EMPLOYEE_DIALOG_STATE
  });

  const data = {
    createEmployeeDialogState: {
      ...createEmployeeDialogState,
      isOpen
    }
  };

  cache.writeQuery({
    query: CREATE_EMPLOYEE_DIALOG_STATE,
    data: data
  });

  return null;
};
