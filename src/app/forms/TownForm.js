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
  town: Yup.string("Ingresa el Nombre de la Ciudad").required(
    "Ingresa el Nombre de la Ciudad"
  )
});

export const TownForm = ({ action, id, town, onClose }) => (
  <Formik
    initialValues={{
      town: town ? town : ""
    }}
    onSubmit={values => {
      const townData = {
        town: values.town
      };

      if (id) townData.id = id;

      action({
        variables: {
          townData
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
                value={values.town}
              >
                {inputProps => (
                  <TextField
                    autoFocus={true}
                    error={errors.town && touched.town ? true : false}
                    helperText={
                      errors.town && touched.town ? `${errors.town}` : ""
                    }
                    id="town"
                    {...inputProps}
                    label="Nombre de la Ciudad"
                    name="town"
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
