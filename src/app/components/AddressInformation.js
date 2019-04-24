import React from "react";
import { Grid, TextField } from "@material-ui/core";
import InputMask from "react-input-mask";
import AutocompleteSelect from "./AutocompleteSelect";
import { TownMenuButton } from "./TownMenuButton";
import { TownshipMenuButton } from "./TownshipMenuButton";
import { StreetMenuButton } from "./StreetMenuButton";

export class AddressInformation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allTownsSuggestions: props.allTownsSuggestions,
      allTownshipsSuggestions: props.allTownshipsSuggestions,
      allStreetsSuggestions: props.allStreetsSuggestions,
      filteredTownshipsSuggestions: props.idTownship
        ? props.allTownshipsSuggestions.filter(
            township => township.link === props.idTown
          )
        : [],
      filteredStreetsSuggestions: props.idStreet
        ? props.allStreetsSuggestions.filter(
            street => street.link === props.idTownship
          )
        : [],
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

  componentDidUpdate = (prevProps, prevState) => {
    const { selectedTown, selectedTownship } = this.state;

    if (prevProps !== this.props) {
      this.setState({
        allTownsSuggestions: this.props.allTownsSuggestions,
        allTownshipsSuggestions: this.props.allTownshipsSuggestions,
        allStreetsSuggestions: this.props.allStreetsSuggestions,
        filteredTownshipsSuggestions: selectedTown
          ? this.props.allTownshipsSuggestions.filter(
              township => township.link === selectedTown.value
            )
          : [],
        filteredStreetsSuggestions: selectedTownship
          ? this.props.allStreetsSuggestions.filter(
              street => street.link === selectedTownship.value
            )
          : []
      });
    }
  };

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

    newFilteredTownshipsSuggestions.length > 0
      ? this.handleTownshipChange(newFilteredTownshipsSuggestions[0])
      : this.handleTownshipChange(null);
  };

  handleTownshipChange = selectedTownship => {
    const newFilteredStreetsSuggestions =
      selectedTownship !== null
        ? this.state.allStreetsSuggestions.filter(
            street => street.link === selectedTownship.value
          )
        : [];

    this.setState({
      filteredStreetsSuggestions: newFilteredStreetsSuggestions,
      selectedTownship: selectedTownship,
      selectedStreet: newFilteredStreetsSuggestions[0]
    });

    this.props.setFieldValue(
      "idTownship",
      selectedTownship !== null ? selectedTownship.value : ""
    );

    newFilteredStreetsSuggestions.length > 0
      ? this.handleStreetChange(newFilteredStreetsSuggestions[0])
      : this.handleStreetChange(null);
  };

  handleStreetChange = selectedStreet => {
    this.props.setFieldValue(
      "idStreet",
      selectedStreet !== null ? selectedStreet.value : ""
    );
    this.setState({ selectedStreet });
  };

  render() {
    return (
      <Grid container={true} direction="row" item={true} xs={12}>
        <Grid item={true} xs={3}>
          <AutocompleteSelect
            error={this.props.errors.idTown}
            fullWidth={true}
            handleChange={this.handleTownChange}
            isDisabled={this.props.disableAdmin}
            placeholder="Municipio"
            suggestions={this.state.allTownsSuggestions}
            touched={this.props.touched.idTown}
            value={this.state.selectedTown}
          />
        </Grid>
        <Grid item={true}>
          <TownMenuButton
            selectedTown={this.state.selectedTown}
            setSelection={this.handleTownChange}
          />
        </Grid>
        <Grid item={true} xs={3}>
          <AutocompleteSelect
            error={this.props.errors.idTownship}
            fullWidth={true}
            handleChange={this.handleTownshipChange}
            isDisabled={this.props.disableAdmin}
            placeholder="Asentamiento"
            suggestions={this.state.filteredTownshipsSuggestions}
            touched={this.props.touched.idTownship}
            value={this.state.selectedTownship}
          />
        </Grid>
        <Grid item={true}>
          <TownshipMenuButton
            selectedTown={this.state.selectedTown}
            selectedTownship={this.state.selectedTownship}
            setSelection={this.handleTownshipChange}
          />
        </Grid>
        <Grid item={true} xs={3}>
          <AutocompleteSelect
            error={this.props.errors.idStreet}
            fullWidth={true}
            handleChange={this.handleStreetChange}
            isDisabled={this.props.disableAdmin}
            placeholder="Calle"
            suggestions={this.state.filteredStreetsSuggestions}
            touched={this.props.touched.idStreet}
            value={this.state.selectedStreet}
          />
        </Grid>
        <Grid item={true}>
          <StreetMenuButton
            selectedTownship={this.state.selectedTownship}
            selectedStreet={this.state.selectedStreet}
            setSelection={this.handleStreetChange}
          />
        </Grid>
        <Grid item={true} xs={1}>
          <InputMask
            alwaysShowMask={true}
            formatChars={{ "?": "[Ss/Nn0-9]" }}
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
        </Grid>
      </Grid>
    );
  }
}
