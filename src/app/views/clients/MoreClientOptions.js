import React from "react";
import { IconButton, Menu, MenuItem, Tooltip } from "@material-ui/core";
import { Assignment, Delete, Edit, MoreVert } from "@material-ui/icons";
import { ModifyClientView } from "./ModifyClientView";
import { DeleteClientView } from "./DeleteClientView";
import { AllClientContractsView } from "./AllClientContractsView";

export class MoreClientOptions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
      modifyClientViewDialogState: false,
      deleteClientViewDialogState: false,
      allClientContractsViewDialogState: false
    };
  }

  handleOptionsOpen = event => {
    this.setState({
      anchorEl: event.currentTarget
    });
  };

  handleOptionsClose = () => {
    this.setState({
      anchorEl: null
    });
  };

  handleModifyClientViewDialogState = () => {
    this.setState(state => ({
      modifyClientViewDialogState: !state.modifyClientViewDialogState
    }));
  };

  handleDeleteClientViewDialogState = () => {
    this.setState(state => ({
      deleteClientViewDialogState: !state.deleteClientViewDialogState
    }));
  };

  handleAllClientContractsViewDialogState = () => {
    this.setState(state => ({
      allClientContractsViewDialogState: !state.allClientContractsViewDialogState
    }));
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <React.Fragment>
        <IconButton onClick={this.handleOptionsOpen}>
          <MoreVert />
        </IconButton>
        <Menu anchorEl={anchorEl} onClose={this.handleOptionsClose} open={open}>
          {this.props.privilegesModules
            .find(({ module }) => module === "client")
            .privileges.includes("UPDATE") && (
            <MenuItem onClick={this.handleOptionsClose}>
              <Tooltip title="Modificar Cliente">
                <IconButton onClick={this.handleModifyClientViewDialogState}>
                  <Edit />
                </IconButton>
              </Tooltip>
            </MenuItem>
          )}
          {this.props.privilegesModules
            .find(({ module }) => module === "client")
            .privileges.includes("DELETE") && (
            <MenuItem onClick={this.handleOptionsClose}>
              <Tooltip title="Eliminar Cliente">
                <IconButton onClick={this.handleDeleteClientViewDialogState}>
                  <Delete />
                </IconButton>
              </Tooltip>
            </MenuItem>
          )}
          {this.props.privilegesModules
            .find(({ module }) => module === "client_contract")
            .privileges.includes("SELECT") && (
            <MenuItem onClick={this.handleOptionsClose}>
              <Tooltip title="Contratos">
                <IconButton
                  onClick={this.handleAllClientContractsViewDialogState}
                >
                  <Assignment />
                </IconButton>
              </Tooltip>
            </MenuItem>
          )}
        </Menu>
        {this.state.modifyClientViewDialogState && (
          <ModifyClientView
            handleModifyClientViewDialogState={
              this.handleModifyClientViewDialogState
            }
            id={this.props.idClient}
            isOpen={this.state.modifyClientViewDialogState}
          />
        )}
        {this.state.deleteClientViewDialogState && (
          <DeleteClientView
            handleDeleteClientViewDialogState={
              this.handleDeleteClientViewDialogState
            }
            id={this.props.idClient}
            isOpen={this.state.deleteClientViewDialogState}
          />
        )}
        {this.state.allClientContractsViewDialogState && (
          <AllClientContractsView
            handleAllClientContractsViewDialogState={
              this.handleAllClientContractsViewDialogState
            }
            idClient={this.props.idClient}
            isOpen={this.state.allClientContractsViewDialogState}
          />
        )}
      </React.Fragment>
    );
  }
}
