import React from "react";
import InputMask from "react-input-mask";
import { FormControl, Grid, TextField } from "@material-ui/core";
import { AddressInformation } from "./AddressInformation";
import { ContactsInformation } from "./ContactsInformation";

export const CommonInformationForm = ({
  allTownsSuggestions,
  allTownshipsSuggestions,
  allStreetsSuggestions,
  disableAdmin,
  errors,
  handleChange,
  idTown,
  idTownship,
  idStreet,
  contacts,
  setFieldValue,
  touched,
  values
}) => (
  <div>
    <Grid container={true} direction="row" item={true} spacing={8} xs={12}>
      <Grid item={true} xs={4}>
        <FormControl fullWidth={true}>
          <InputMask
            alwaysShowMask={true}
            disabled={disableAdmin}
            formatChars={{ "?": "[a-zA-ZáéíóúñÁÉÍÓÚÑ\\s]" }}
            mask="????????????????????"
            maskChar=""
            onChange={handleChange}
            value={values.name}
          >
            {inputProps => (
              <TextField
                autoFocus={true}
                error={errors.name && touched.name ? true : false}
                helperText={errors.name && touched.name ? `${errors.name}` : ""}
                id="name"
                {...inputProps}
                label="Nombre(s)"
                name="name"
              />
            )}
          </InputMask>
        </FormControl>
      </Grid>
      <Grid item={true} xs={4}>
        <FormControl fullWidth={true}>
          <InputMask
            alwaysShowMask={true}
            disabled={disableAdmin}
            formatChars={{ "?": "[a-zA-ZáéíóúñÁÉÍÓÚÑ\\s]" }}
            mask="???????????????"
            maskChar=""
            onChange={handleChange}
            value={values.firstName}
          >
            {inputProps => (
              <TextField
                error={errors.firstName && touched.firstName ? true : false}
                helperText={
                  errors.firstName && touched.firstName
                    ? `${errors.firstName}`
                    : ""
                }
                id="firstName"
                {...inputProps}
                label="Apellido Paterno"
                name="firstName"
              />
            )}
          </InputMask>
        </FormControl>
      </Grid>
      <Grid item={true} xs={4}>
        <FormControl fullWidth={true}>
          <InputMask
            alwaysShowMask={true}
            disabled={disableAdmin}
            formatChars={{ "?": "[a-zA-ZáéíóúñÁÉÍÓÚÑ\\s]" }}
            mask="???????????????"
            maskChar=""
            onChange={handleChange}
            value={values.lastName}
          >
            {inputProps => (
              <TextField
                id="lastName"
                {...inputProps}
                label="Apellido Materno"
                name="lastName"
              />
            )}
          </InputMask>
        </FormControl>
      </Grid>
      <AddressInformation
        allTownsSuggestions={allTownsSuggestions}
        allTownshipsSuggestions={allTownshipsSuggestions}
        allStreetsSuggestions={allStreetsSuggestions}
        disableAdmin={disableAdmin}
        errors={errors}
        handleChange={handleChange}
        idTown={idTown}
        idTownship={idTownship}
        idStreet={idStreet}
        setFieldValue={setFieldValue}
        touched={touched}
        values={values}
      />
      <ContactsInformation
        contacts={contacts}
        disableAdmin={disableAdmin}
        errors={errors}
        handleChange={handleChange}
        setFieldValue={setFieldValue}
        touched={touched}
        values={values}
      />
    </Grid>
  </div>
);
