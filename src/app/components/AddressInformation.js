import React from "react";
import { FormControl, Grid, TextField } from "@material-ui/core";
import InputMask from "react-input-mask";
import AutocompleteSelect from "./AutocompleteSelect";

export class AddressInformation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allTownsSuggestions: props.allTownsSuggestions,
      allTownshipsSuggestions: props.allTownshipsSuggestions,
      allStreetsSuggestions: props.allStreetsSuggestions,
      filteredTownshipsSuggestions:
        props.idTownship &&
        props.allTownshipsSuggestions.filter(
          township => township.link === props.idTown
        ),
      filteredStreetsSuggestions:
        props.idStreet &&
        props.allStreetsSuggestions.filter(
          street => street.link === props.idTownship
        ),
      selectedTown: props.idTown
        ? props.allTownsSuggestions.find(town => town.value === props.idTown)
        : null,
      selectedTownship: props.idTownship
        ? props.allTownshipsSuggestions.find(
            township => township.value === props.idTownship
          )
        : null,
      selectedStreet: props.idStreet
        ? props.allStreetsSuggestions.find(
            street => street.value === props.idStreet
          )
        : null
    };
  }

  handleTownChange = selectedTown => {
    const newFilteredTownshipsSuggestions = this.state.allTownshipsSuggestions.filter(
      township => township.link === selectedTown.value
    );

    this.setState({
      filteredTownshipsSuggestions: newFilteredTownshipsSuggestions,
      selectedTown: selectedTown,
      selectedTownship: newFilteredTownshipsSuggestions[0]
    });

    this.props.setFieldValue("idTown", selectedTown.value);

    this.handleTownshipChange(newFilteredTownshipsSuggestions[0]);
  };

  handleTownshipChange = selectedTownship => {
    const newFilteredStreetsSuggestions = this.state.allStreetsSuggestions.filter(
      street => street.link === selectedTownship.value
    );

    this.setState({
      filteredStreetsSuggestions: newFilteredStreetsSuggestions,
      selectedTownship: selectedTownship,
      selectedStreet: newFilteredStreetsSuggestions[0]
    });

    this.props.setFieldValue("idTownship", selectedTownship.value);

    this.handleStreetChange(newFilteredStreetsSuggestions[0]);
  };

  handleStreetChange = selectedStreet => {
    this.setState({ selectedStreet });
    this.props.setFieldValue("idStreet", selectedStreet.value);
  };

  handleManageAddressInformationDialogState = () => {
    this.setState(state => ({
      manageAddressInformationDialogState: !state.manageAddressInformationDialogState
    }));
  };

  render() {
    return (
      <Grid container={true} direction="row" item={true} spacing={8} xs={12}>
        <Grid item={true} xs={3}>
          <AutocompleteSelect
            error={this.props.errors.idTown}
            fullWidth={true}
            handleChange={this.handleTownChange}
            isDisabled={this.props.disableAdmin}
            placeholder="Ciudad..."
            suggestions={this.state.allTownsSuggestions}
            touched={this.props.touched.idTown}
            value={this.state.selectedTown}
          />
        </Grid>
        <Grid item={true} xs={4}>
          <AutocompleteSelect
            error={this.props.errors.idTownship}
            fullWidth={true}
            handleChange={this.handleTownshipChange}
            isDisabled={this.props.disableAdmin}
            placeholder="Colonia..."
            suggestions={this.state.filteredTownshipsSuggestions}
            touched={this.props.touched.idTownship}
            value={this.state.selectedTownship}
          />
        </Grid>
        <Grid item={true} xs={3}>
          <AutocompleteSelect
            error={this.props.errors.idStreet}
            fullWidth={true}
            handleChange={this.handleStreetChange}
            isDisabled={this.props.disableAdmin}
            placeholder="Calle..."
            suggestions={this.state.filteredStreetsSuggestions}
            touched={this.props.touched.idStreet}
            value={this.state.selectedStreet}
          />
        </Grid>
        <Grid item={true} xs={1}>
          <FormControl fullWidth={true}>
            <InputMask
              alwaysShowMask={true}
              disabled={this.props.disableAdmin}
              formatChars={{ "?": "[0-9]" }}
              mask="?????"
              maskChar=""
              onChange={this.props.handleChange}
              value={this.props.values.exteriorNumber}
            >
              {inputProps => (
                <TextField
                  error={
                    this.props.errors.exteriorNumber &&
                    this.props.touched.exteriorNumber
                      ? true
                      : false
                  }
                  helperText={
                    this.props.errors.exteriorNumber &&
                    this.props.touched.exteriorNumber
                      ? `${this.props.errors.exteriorNumber}`
                      : ""
                  }
                  id="exteriorNumber"
                  {...inputProps}
                  label="No. Ext."
                  name="exteriorNumber"
                />
              )}
            </InputMask>
          </FormControl>
        </Grid>
        <Grid item={true} xs={1}>
          <FormControl fullWidth={true}>
            <InputMask
              alwaysShowMask={true}
              disabled={this.props.disableAdmin}
              formatChars={{ "?": "[0-9]" }}
              mask="?????"
              maskChar=""
              onChange={this.props.handleChange}
              value={this.props.values.interiorNumber}
            >
              {inputProps => (
                <TextField
                  id="interiorNumber"
                  {...inputProps}
                  label="No. Int."
                  name="interiorNumber"
                />
              )}
            </InputMask>
          </FormControl>
        </Grid>
      </Grid>
    );
  }
}
