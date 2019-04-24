import React from "react";
import AutocompleteSelect from "../../components/AutocompleteSelect";
import { Grid, IconButton, Tooltip } from "@material-ui/core";
import { Assessment } from "@material-ui/icons";
import { CustomDialog } from "../../components/CustomDialog";
import { AllClientContractTypesTable } from "./AllClientContractTypesTable";

export class TypeContract extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      typeContractsSuggestions: props.allClientContractTypesSuggestions,
      selectedTypeContract: props.idTypeContract
        ? props.allClientContractTypesSuggestions.find(
            typeContract => typeContract.value === props.idTypeContract
          )
        : null,
      allClientContractTypesDialogState: false
    };
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps !== this.props) {
      this.setState({
        typeContractsSuggestions: this.props.allClientContractTypesSuggestions
      });
    }
  };

  handleClientContractTypeChange = selectedTypeContract => {
    this.setState({
      selectedTypeContract: selectedTypeContract
    });

    this.props.setFieldValue("idTypeContract", selectedTypeContract.value);
  };

  handleAllClientContractTypesDialogState = () => {
    this.setState(state => ({
      allClientContractTypesDialogState: !state.allClientContractTypesDialogState
    }));
  };

  render() {
    return (
      <Grid container={true} item={true} xs={12}>
        <Grid item={true} xs={10}>
          <AutocompleteSelect
            error={this.props.error}
            fullWidth={this.props.fullWidth}
            handleChange={this.handleClientContractTypeChange}
            placeholder="Tipo de Contrato..."
            suggestions={this.state.typeContractsSuggestions}
            touched={this.props.touched}
            value={this.state.selectedTypeContract}
          />
        </Grid>
        <Grid item={true}>
          <Tooltip title="Administrar Tipos">
            <IconButton onClick={this.handleAllClientContractTypesDialogState}>
              <Assessment />
            </IconButton>
          </Tooltip>
        </Grid>
        {this.state.allClientContractTypesDialogState && (
          <CustomDialog
            isOpen={this.state.allClientContractTypesDialogState}
            maxWidth="sm"
            onClose={this.handleAllClientContractTypesDialogState}
            title="Tipos de Contratos"
          >
            <AllClientContractTypesTable />
          </CustomDialog>
        )}
      </Grid>
    );
  }
}
