import { LOGIN_FAILED_DIALOG_STATE } from "../queries/LoginFailedDialogState";

export default (_, { isOpen }, { cache }) => {
  const { loginFailedDialogState } = cache.readQuery({
    query: LOGIN_FAILED_DIALOG_STATE
  });

  const data = {
    loginFailedDialogState: {
      ...loginFailedDialogState,
      isOpen
    }
  };

  cache.writeQuery({
    query: LOGIN_FAILED_DIALOG_STATE,
    data: data
  });

  return null;
};
