import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  Button,
  DialogContent,
  DialogContentText,
  DialogActions,
  Grid
} from "@material-ui/core";
import { TypeContract } from "../views/clients/TypeContract";

const validationSchema = Yup.object({
  typeContract: Yup.string("Selecciona un Tipo de Contrato").required(
    "Selecciona un Tipo de Contrato"
  )
});

export const RenovateContractForm = ({
  idContract,
  onClose,
  payAndRenovateClientContract,
  typeContract
}) => (
  <Formik
    initialValues={{
      typeContract: typeContract ? typeContract : ""
    }}
    onSubmit={values => {
      payAndRenovateClientContract({
        variables: {
          contractInput: {
            idContract: idContract,
            typeContract: values.typeContract
          }
        }
      });
    }}
    validationSchema={validationSchema}
  >
    {props => {
      const {
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
      } = props;

      return (
        <form onSubmit={handleSubmit}>
          <DialogContent style={{ overflow: "visible" }}>
            <Grid
              alignContent="center"
              alignItems="center"
              container={true}
              direction="row"
              spacing={8}
            >
              <Grid item={true}>
                <DialogContentText>
                  Elige el nuevo periodo de Renovación:
                </DialogContentText>
              </Grid>
              <Grid item={true} xs={5}>
                <TypeContract
                  error={errors.typeContract}
                  fullWidth={true}
                  setFieldValue={setFieldValue}
                  touched={touched.typeContract}
                  typeContract={typeContract}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={handleSubmit} variant="contained">
              Renovar
            </Button>
            <Button color="secondary" onClick={onClose} variant="contained">
              Cancelar
            </Button>
          </DialogActions>
        </form>
      );
    }}
  </Formik>
);
