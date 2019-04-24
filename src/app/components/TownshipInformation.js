import React, { useState } from "react";
import { FormControl, Grid, TextField } from "@material-ui/core";
import InputMask from "react-input-mask";
import AutocompleteSelect from "./AutocompleteSelect";

export const TownshipInformation = ({
  errors,
  handleChange,
  setFieldValue,
  touched,
  values
}) => {
  const TYPE_TOWNSHIP_SUGGESTIONS = [
    { label: "Aeropuerto", value: "Aeropuerto" },
    { label: "Ampliación", value: "Ampliación" },
    { label: "Barrio", value: "Barrio" },
    { label: "Cantón", value: "Cantón" },
    { label: "Ciudad", value: "Ciudad" },
    { label: "Ciudad Industrial", value: "Ciudad Industrial" },
    { label: "Colonia", value: "Colonia" },
    { label: "Condominio", value: "Condominio" },
    { label: "Conjunto Habitacional", value: "Conjunto Habitacional" },
    { label: "Corredor Industrial", value: "Corredor Industrial" },
    { label: "Cuartel", value: "Cuartel" },
    { label: "Ejido", value: "Ejido" },
    { label: "Estación", value: "Estación" },
    { label: "Exhacienda", value: "Exhacienda" },
    { label: "Finca", value: "Finca" },
    { label: "Fracción", value: "Fracción" },
    { label: "Fraccionamiento", value: "Fraccionamiento" },
    { label: "Gran Usuario", value: "Gran Usuario" },
    { label: "Granja", value: "Granja" },
    { label: "Hacienda", value: "Hacienda" },
    { label: "Ingenio", value: "Ingenio" },
    { label: "Manzana", value: "Manzana" },
    { label: "Paraje", value: "Paraje" },
    { label: "Poblado Comunal", value: "Poblado Comunal" },
    { label: "Parque Industrial", value: "Parque Industrial" },
    { label: "Poblado Comunal", value: "Poblado Comunal" },
    { label: "Privada", value: "Privada" },
    { label: "Prolongación", value: "Prolongación" },
    { label: "Pueblo", value: "Pueblo" },
    { label: "Puerto", value: "Puerto" },
    { label: "Ranchería", value: "Ranchería" },
    { label: "Rancho", value: "Rancho" },
    { label: "Región", value: "Región" },
    { label: "Residencial", value: "Residencial" },
    { label: "Rinconada", value: "Rinconada" },
    { label: "Sección", value: "Sección" },
    { label: "Sector", value: "Sector" },
    { label: "Super Manzana", value: "Super Manzana" },
    { label: "Unidad", value: "Unidad" },
    { label: "Unidad Habitacional", value: "Unidad Habitacional" },
    { label: "Villa", value: "Villa" },
    { label: "Zona Federal", value: "Zona Federal" },
    { label: "Zona Industrial", value: "Zona Industrial" },
    { label: "Zona Militar", value: "Zona Militar" },
    { label: "Zona Naval", value: "Zona Naval" }
  ];

  const [selectedTownship, setSelectedTownship] = useState(
    TYPE_TOWNSHIP_SUGGESTIONS.filter(
      suggestion => suggestion.value === values.typeTownship
    )
  );

  const getSelectedTownship = selectedTownship => {
    setSelectedTownship(selectedTownship);
    setFieldValue("typeTownship", selectedTownship.label);
  };

  return (
    <Grid container={true} direction="column" spacing={16}>
      <Grid item={true}>
        <FormControl fullWidth={true}>
          <AutocompleteSelect
            error={errors.typeTownship}
            fullWidth={true}
            handleChange={getSelectedTownship}
            placeholder="Tipo de Asentamiento..."
            suggestions={TYPE_TOWNSHIP_SUGGESTIONS}
            touched={touched.typeTownship}
            value={selectedTownship}
          />
        </FormControl>
      </Grid>
      <Grid item={true}>
        <FormControl fullWidth={true}>
          <InputMask
            alwaysShowMask={true}
            formatChars={{ "?": "[a-zA-ZáéíóúñÁÉÍÓÚÑ\\s]" }}
            mask="???????????????"
            maskChar=""
            onChange={handleChange}
            value={values.township}
          >
            {inputProps => (
              <TextField
                error={errors.township && touched.township ? true : false}
                helperText={
                  errors.township && touched.township
                    ? `${errors.township}`
                    : ""
                }
                id="township"
                {...inputProps}
                label="Nombrel del Asentamiento"
                name="township"
              />
            )}
          </InputMask>
        </FormControl>
      </Grid>
      <Grid item={true}>
        <FormControl fullWidth={true}>
          <InputMask
            alwaysShowMask={true}
            formatChars={{ "?": "[0-9]" }}
            mask="?????"
            maskChar=""
            onChange={handleChange}
            value={values.postalCode}
          >
            {inputProps => (
              <TextField
                error={errors.postalCode && touched.postalCode ? true : false}
                helperText={
                  errors.postalCode && touched.postalCode
                    ? `${errors.postalCode}`
                    : ""
                }
                id="postalCode"
                {...inputProps}
                label="Código Postal"
                name="postalCode"
              />
            )}
          </InputMask>
        </FormControl>
      </Grid>
    </Grid>
  );
};
