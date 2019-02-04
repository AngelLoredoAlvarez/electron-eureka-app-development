import React from "react";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText
} from "@material-ui/core";
import { CustomDialog } from "./CustomDialog";

export class NetworkError extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: props.isOpen
    };
  }

  handleDialogState = () => {
    this.setState(state => ({
      isOpen: !state.isOpen
    }));
  };

  render() {
    return (
      <CustomDialog
        isOpen={this.state.isOpen}
        maxWidth="sm"
        title="Error de Sistema"
      >
        <DialogContent>
          <DialogContentText>
            Error de Sistema: {this.props.networkError.message}. Notifique al
            administrador.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            onClick={this.handleDialogState}
            variant="contained"
          >
            Aceptar
          </Button>
        </DialogActions>
      </CustomDialog>
    );
  }
}
