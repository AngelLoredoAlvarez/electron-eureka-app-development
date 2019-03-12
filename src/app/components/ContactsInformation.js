import React from "react";
import { FormControl, Grid, TextField } from "@material-ui/core";
import InputMask from "react-input-mask";
import AutocompleteSelect from "./AutocompleteSelect";

export class ContactsInformation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTypeOne: props.contacts
        ? props.contacts.edges.length !== 0
          ? props.contacts.edges[0].node.typeContact !== "EMAIL"
            ? {
                label: props.contacts.edges[0].node.typeContact,
                value: props.contacts.edges[0].node.typeContact
              }
            : null
          : null
        : null,
      selectedTypeTwo: props.contacts
        ? props.contacts.edges.length !== 0
          ? props.contacts.edges.length === 3
            ? props.contacts.edges[1].node.typeContact !== "EMAIL"
              ? {
                  label: props.contacts.edges[1].node.typeContact,
                  value: props.contacts.edges[1].node.typeContact
                }
              : null
            : props.contacts.edges.length === 2
            ? props.contacts.edges[1].node.typeContact !== "EMAIL"
              ? {
                  label: props.contacts.edges[1].node.typeContact,
                  value: props.contacts.edges[1].node.typeContact
                }
              : null
            : null
          : null
        : null
    };
  }

  handleTypeOneChange = selectedTypeOne => {
    this.setState({ selectedTypeOne });
    this.props.setFieldValue("type_contact_one", selectedTypeOne.value);
  };

  handleTypeTwoChange = selectedTypeTwo => {
    this.setState({ selectedTypeTwo });
    this.props.setFieldValue("type_contact_two", selectedTypeTwo.value);
  };

  render() {
    const { errors, handleChange, touched, values } = this.props;

    return (
      <Grid container={true} direction="row" item={true} spacing={8} xs={12}>
        <Grid item={true} xs={2}>
          <FormControl>
            <InputMask
              alwaysShowMask={false}
              disabled={this.props.disableAdmin}
              formatChars={{ "?": "[0-9]" }}
              mask="(???) ??? ?? ??"
              maskChar="_"
              onChange={handleChange}
              value={values.contact_one}
            >
              {inputProps => (
                <TextField
                  id="contact_one"
                  {...inputProps}
                  label="Contacto 1"
                  name="contact_one"
                />
              )}
            </InputMask>
          </FormControl>
        </Grid>
        <Grid item={true} xs={2}>
          <AutocompleteSelect
            error={values.contact_one && errors.type_contact_one}
            fullWidth={true}
            handleChange={this.handleTypeOneChange}
            isDisabled={this.props.disableAdmin}
            placeholder="Tipo..."
            suggestions={[
              {
                label: "FIJO",
                value: "FIJO"
              },
              {
                label: "CELULAR",
                value: "CELULAR"
              }
            ]}
            touched={touched.type_contact_one}
            value={this.state.selectedTypeOne}
          />
        </Grid>
        <Grid item={true} xs={2}>
          <FormControl>
            <InputMask
              alwaysShowMask={false}
              disabled={this.props.disableAdmin}
              formatChars={{ "?": "[0-9]" }}
              mask="(???) ??? ?? ??"
              maskChar="_"
              onChange={handleChange}
              value={values.contact_two}
            >
              {inputProps => (
                <TextField
                  id="contact_one"
                  {...inputProps}
                  label="Contacto 2"
                  name="contact_two"
                />
              )}
            </InputMask>
          </FormControl>
        </Grid>
        <Grid item={true} xs={2}>
          <AutocompleteSelect
            error={values.contact_two && errors.type_contact_two}
            fullWidth={true}
            handleChange={this.handleTypeTwoChange}
            isDisabled={this.props.disableAdmin}
            placeholder="Tipo..."
            suggestions={[
              {
                label: "FIJO",
                value: "FIJO"
              },
              {
                label: "CELULAR",
                value: "CELULAR"
              }
            ]}
            touched={touched.type_contact_two}
            value={this.state.selectedTypeTwo}
          />
        </Grid>
        <Grid item={true} xs={4}>
          <FormControl fullWidth={true}>
            <InputMask
              alwaysShowMask={true}
              disabled={this.props.disableAdmin}
              formatChars={{
                "?": "[a-zA-Z0-9_\\-\\.\\@]"
              }}
              mask="?????????????????????????????????????????????????"
              maskChar=""
              onChange={handleChange}
              value={values.email}
            >
              {inputProps => (
                <TextField
                  id="email"
                  {...inputProps}
                  label="Correo Electrónico"
                  name="email"
                />
              )}
            </InputMask>
          </FormControl>
        </Grid>
      </Grid>
    );
  }
}
