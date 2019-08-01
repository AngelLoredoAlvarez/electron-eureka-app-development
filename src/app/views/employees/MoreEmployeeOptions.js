import React from "react";
import { IconButton, Menu, MenuItem, Tooltip } from "@material-ui/core";
import { Delete, Edit, MoreVert } from "@material-ui/icons";
import { ModifyEmployeeView } from "./ModifyEmployeeView";
import { DeleteEmployeeView } from "./DeleteEmployeeView";

export class MoreEmployeeOptions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
      modifyEmployeeViewDialogState: false,
      deleteEmployeeViewDialogState: false
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

  handleModifyEmployeeViewDialogState = () => {
    this.setState(state => ({
      modifyEmployeeViewDialogState: !state.modifyEmployeeViewDialogState
    }));
  };

  handleDeleteEmployeeViewDialogState = () => {
    this.setState(state => ({
      deleteEmployeeViewDialogState: !state.deleteEmployeeViewDialogState
    }));
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div>
        {this.props.id === 1 &&
        this.props.roleCurrentEmployee !== "eureka_administrador" ? null : (
          <IconButton onClick={this.handleOptionsOpen}>
            <MoreVert />
          </IconButton>
        )}
        <Menu anchorEl={anchorEl} onClose={this.handleOptionsClose} open={open}>
          {this.props.privilegesModules
            .find(({ module }) => module === "employee")
            .privileges.includes("UPDATE") && (
            <MenuItem onClick={this.handleOptionsClose}>
              <Tooltip title="Modificar Empleado">
                <IconButton onClick={this.handleModifyEmployeeViewDialogState}>
                  <Edit />
                </IconButton>
              </Tooltip>
            </MenuItem>
          )}
          {this.props.id === 1 ? null : this.props.privilegesModules
              .find(({ module }) => module === "employee")
              .privileges.includes("DELETE") &&
            this.props.id !== this.props.idCurrentEmployee ? (
            <MenuItem onClick={this.handleOptionsClose}>
              <Tooltip title="Eliminar Empleado">
                <IconButton onClick={this.handleDeleteEmployeeViewDialogState}>
                  <Delete />
                </IconButton>
              </Tooltip>
            </MenuItem>
          ) : null}
        </Menu>
        {this.state.modifyEmployeeViewDialogState && (
          <ModifyEmployeeView
            id={this.props.id}
            isOpen={this.state.modifyEmployeeViewDialogState}
            onClose={this.handleModifyEmployeeViewDialogState}
          />
        )}
        {this.state.deleteEmployeeViewDialogState && (
          <DeleteEmployeeView
            id={this.props.id}
            isOpen={this.state.deleteEmployeeViewDialogState}
            onClose={this.handleDeleteEmployeeViewDialogState}
          />
        )}
      </div>
    );
  }
}
