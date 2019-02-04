import React from "react";
import AutocompleteSelect from "./AutocompleteSelect";

export class TypeContract extends React.Component {
  constructor(props) {
    super(props);

    const typeContractsSuggestions = [
      {
        label: "1 MES - $100.00",
        value: "1 MES"
      },
      {
        label: "2 MESES - $150.00",
        value: "2 MESES"
      },
      {
        label: "3 MESES - $200.00",
        value: "3 MESES"
      }
    ];

    this.state = {
      typeContractsSuggestions: typeContractsSuggestions,
      selectedTypeContract: props.typeContract
        ? typeContractsSuggestions.find(
            typeContract => typeContract.value === props.typeContract
          )
        : null
    };
  }

  handleTypeContractChange = selectedTypeContract => {
    this.setState({
      selectedTypeContract: selectedTypeContract
    });

    this.props.setFieldValue("typeContract", selectedTypeContract.value);
  };

  render() {
    return (
      <AutocompleteSelect
        error={this.props.error}
        fullWidth={this.props.fullWidth}
        handleChange={this.handleTypeContractChange}
        placeholder="Tipo de Contrato..."
        suggestions={this.state.typeContractsSuggestions}
        touched={this.props.touched}
        value={this.state.selectedTypeContract}
      />
    );
  }
}
