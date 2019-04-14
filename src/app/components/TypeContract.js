import React from "react";
import AutocompleteSelect from "./AutocompleteSelect";
import { Grid, IconButton, Tooltip } from "@material-ui/core";
import { Assessment } from "@material-ui/icons";

export class TypeContract extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      typeContractsSuggestions: props.allClientContractTypesSuggestions,
      selectedTypeContract: props.idTypeContract
        ? props.allClientContractTypesSuggestions.find(
            typeContract => typeContract.value === props.idTypeContract
          )
        : null
    };
  }

  handleTypeContractChange = selectedTypeContract => {
    this.setState({
      selectedTypeContract: selectedTypeContract
    });

    this.props.setFieldValue("idTypeContract", selectedTypeContract.value);
  };

  render() {
    return (
      <Grid container={true} item={true} xs={12}>
        <Grid item={true} xs={10}>
          <AutocompleteSelect
            error={this.props.error}
            fullWidth={this.props.fullWidth}
            handleChange={this.handleTypeContractChange}
            placeholder="Tipo de Contrato..."
            suggestions={this.state.typeContractsSuggestions}
            touched={this.props.touched}
            value={this.state.selectedTypeContract}
          />
        </Grid>
        <Grid item={true}>
          <Tooltip title="Administrar Tipos">
            <IconButton>
              <Assessment />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    );
  }
}
