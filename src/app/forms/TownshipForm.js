import React from "react";
import { Formik } from "formik";
import {
  Button,
  DialogContent,
  DialogActions,
  FormControl,
  Grid,
  TextField
} from "@material-ui/core";
import * as Yup from "yup";
import InputMask from "react-input-mask";
import { TownshipInformation } from "../components/TownshipInformation";

const validationSchema = Yup.object({
  typeTownship: Yup.string("Selecciona un tipo de Asentamiento").required(
    "Selecciona un tipo de Asentamiento"
  ),
  township: Yup.string("Ingresa el nombre del Asentamiento").required(
    "Ingresa el nombre del Asentamiento"
  ),
  postalCode: Yup.string("Ingresa el Código Postal").required(
    "Ingresa el Código Postal"
  )
});

export const TownshipForm = ({
  action,
  id,
  typeTownship,
  township,
  postalCode,
  idTown,
  onClose
}) => (
  <Formik
    initialValues={{
      typeTownship: typeTownship ? typeTownship : "",
      township: township ? township : "",
      postalCode: postalCode ? postalCode : ""
    }}
    onSubmit={values => {
      const townshipData = {
        typeTownship: values.typeTownship,
        township: values.township,
        postalCode: values.postalCode,
        idTown: idTown
      };

      if (id) townshipData.id = id;

      action({
        variables: {
          townshipData
        }
      });
    }}
    validationSchema={validationSchema}
  >
    {({
      values,
      touched,
      errors,
      dirty,
      isSubmitting,
      handleChange,
      handleBlur,
      handleSubmit,
      handleReset,
      setFieldValue
    }) => (
      <React.Fragment>
        <DialogContent style={{ overflow: "visible" }}>
          <TownshipInformation
            errors={errors}
            handleChange={handleChange}
            setFieldValue={setFieldValue}
            touched={touched}
            values={values}
          />
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleSubmit} variant="contained">
            Guardar
          </Button>
          <Button color="secondary" onClick={onClose} variant="contained">
            Cancelar
          </Button>
        </DialogActions>
      </React.Fragment>
    )}
  </Formik>
);
