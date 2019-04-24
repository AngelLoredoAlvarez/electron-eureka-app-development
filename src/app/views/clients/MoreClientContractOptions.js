import React from "react";
import { IconButton, Menu, MenuItem, Tooltip } from "@material-ui/core";
import {
  Delete,
  Details,
  Edit,
  AttachMoney,
  MoreVert,
  Update
} from "@material-ui/icons";
import { ClientContractDetailsView } from "./ClientContractDetailsView";
import { ClientContractMovementsView } from "./ClientContractMovementsView";
import { RenovateClientContract } from "./RenovateClientContract";
import { ModifyClientContractView } from "./ModifyClientContractView";
import { DeleteClientContractView } from "./DeleteClientContractView";

export class MoreClientContractOptions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
      moreContractInfoDialogState: false,
      clientContractMovements: false,
      renovateClientContractDialogState: false,
      modifyClientContractDialogState: false,
      deleteClientContractDialogState: false
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

  handleMoreInfoDialogState = () => {
    this.setState(state => ({
      moreContractInfoDialogState: !state.moreContractInfoDialogState
    }));
  };

  handleClientContractMovements = () => {
    this.setState(state => ({
      clientContractMovements: !state.clientContractMovements
    }));
  };

  handleRenovateClientContractDialogState = () => {
    this.setState(state => ({
      renovateClientContractDialogState: !state.renovateClientContractDialogState
    }));
  };

  handleModifyClientContractDialogState = () => {
    this.setState(state => ({
      modifyClientContractDialogState: !state.modifyClientContractDialogState
    }));
  };

  handleDeleteClientContractDialogState = () => {
    this.setState(state => ({
      deleteClientContractDialogState: !state.deleteClientContractDialogState
    }));
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div>
        <IconButton onClick={this.handleOptionsOpen}>
          <MoreVert />
        </IconButton>
        <Menu anchorEl={anchorEl} onClose={this.handleOptionsClose} open={open}>
          <MenuItem onClick={this.handleOptionsClose}>
            <Tooltip title="Más Información">
              <IconButton onClick={this.handleMoreInfoDialogState}>
                <Details />
              </IconButton>
            </Tooltip>
          </MenuItem>
          <MenuItem onClick={this.handleOptionsClose}>
            <Tooltip title="Pagos / Adeudos">
              <IconButton onClick={this.handleClientContractMovements}>
                <AttachMoney />
              </IconButton>
            </Tooltip>
          </MenuItem>
          {this.props.status === "Finalizado" && (
            <MenuItem onClick={this.handleOptionsClose}>
              <Tooltip title="Renovar Contrato">
                <IconButton
                  onClick={this.handleRenovateClientContractDialogState}
                >
                  <Update />
                </IconButton>
              </Tooltip>
            </MenuItem>
          )}
          {this.props.status !== "Adeudo" && this.props.status !== "Por Pagar" && (
            <MenuItem onClick={this.handleOptionsClose}>
              <Tooltip title="Modificar Datos del Contrato">
                <IconButton
                  onClick={this.handleModifyClientContractDialogState}
                >
                  <Edit />
                </IconButton>
              </Tooltip>
            </MenuItem>
          )}
          {this.props.status === "Finalizado" && (
            <MenuItem onClick={this.handleOptionsClose}>
              <Tooltip title="Eliminar Contrato">
                <IconButton
                  onClick={this.handleDeleteClientContractDialogState}
                >
                  <Delete />
                </IconButton>
              </Tooltip>
            </MenuItem>
          )}
        </Menu>
        {this.state.moreContractInfoDialogState && (
          <ClientContractDetailsView
            idContract={this.props.idContract}
            isOpen={this.state.moreContractInfoDialogState}
            maxWidth="sm"
            onClose={this.handleMoreInfoDialogState}
            title="Detalles del Contrato"
          />
        )}
        {this.state.clientContractMovements && (
          <ClientContractMovementsView
            idContract={this.props.idContract}
            isOpen={this.state.clientContractMovements}
            onClose={this.handleClientContractMovements}
          />
        )}
        {this.state.renovateClientContractDialogState && (
          <RenovateClientContract
            idContract={this.props.idContract}
            isOpen={this.state.renovateClientContractDialogState}
            onClose={this.handleRenovateClientContractDialogState}
            typeContract={this.props.typeContract}
          />
        )}
        {this.state.modifyClientContractDialogState && (
          <ModifyClientContractView
            idClient={this.props.idClient}
            idContract={this.props.idContract}
            isOpen={this.state.modifyClientContractDialogState}
            onClose={this.handleModifyClientContractDialogState}
          />
        )}
        {this.state.deleteClientContractDialogState && (
          <DeleteClientContractView
            idClient={this.props.idClient}
            idContract={this.props.idContract}
            isOpen={this.state.deleteClientContractDialogState}
            onClose={this.handleDeleteClientContractDialogState}
          />
        )}
      </div>
    );
  }
}
