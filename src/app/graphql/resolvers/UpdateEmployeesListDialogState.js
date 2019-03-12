import { EMPLOYEES_LIST_DIALOG_STATE } from "../queries/EmployeesListDialogState";

export default (_, { isOpen }, { cache }) => {
  const { employeesListDialogState } = cache.readQuery({
    query: EMPLOYEES_LIST_DIALOG_STATE
  });

  const data = {
    employeesListDialogState: {
      ...employeesListDialogState,
      isOpen
    }
  };

  cache.writeQuery({
    query: EMPLOYEES_LIST_DIALOG_STATE,
    data: data
  });

  return null;
};
