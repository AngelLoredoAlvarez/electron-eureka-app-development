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

const validationSchema = Yup.object({
  street: Yup.string("Ingresa el Nombre de la Calle").required(
    "Ingresa el Nombre de la Calle"
  )
});

export const StreetForm = ({ action, id, street, idTownship, onClose }) => (
  <Formik
    initialValues={{
      street: street ? street : ""
    }}
    onSubmit={values => {
      const streetData = {
        street: values.street,
        idTownship: idTownship
      };

      if (id) streetData.id = id;

      action({
        variables: {
          streetData
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
        <DialogContent>
          <Grid>
            <FormControl fullWidth={true}>
              <InputMask
                alwaysShowMask={true}
                formatChars={{ "?": "[a-zA-ZáéíóúñÁÉÍÓÚÑ\\s]" }}
                mask="????????????????????"
                maskChar=""
                onChange={handleChange}
                value={values.street}
              >
                {inputProps => (
                  <TextField
                    autoFocus={true}
                    error={errors.street && touched.street ? true : false}
                    helperText={
                      errors.street && touched.street ? `${errors.street}` : ""
                    }
                    id="street"
                    {...inputProps}
                    label="Nombre de la Calle"
                    name="street"
                  />
                )}
              </InputMask>
            </FormControl>
          </Grid>
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
