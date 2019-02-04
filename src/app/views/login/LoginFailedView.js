import React from "react";
import {
  Button,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@material-ui/core";
import { Mutation, Query } from "react-apollo";
import { LOGIN_FAILED_DIALOG_STATE } from "../../graphql/queries/LoginFailedDialogState";
import { UPDATE_LOGIN_FAILED_DIALOG_STATE } from "../../graphql/mutations/UpdateLoginFailedDialogState";
import { CustomDialog } from "../../components/CustomDialog";

export const LoginFailedView = () => (
  <Query query={LOGIN_FAILED_DIALOG_STATE}>
    {({ data: { loginFailedDialogState } }) => (
      <CustomDialog
        isOpen={loginFailedDialogState.isOpen}
        title="Error al Iniciar Sesión"
      >
        <DialogContent>
          <DialogContentText>
            Nombre de Usuario y/o Contraseña Incorrectos
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Mutation
            mutation={UPDATE_LOGIN_FAILED_DIALOG_STATE}
            variables={{ isOpen: false }}
          >
            {updateLoginFailedDialogState => (
              <Button
                color="primary"
                onClick={updateLoginFailedDialogState}
                variant="contained"
              >
                Aceptar
              </Button>
            )}
          </Mutation>
        </DialogActions>
      </CustomDialog>
    )}
  </Query>
);
