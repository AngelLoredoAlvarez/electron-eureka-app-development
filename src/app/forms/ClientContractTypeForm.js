import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  Button,
  DialogContent,
  DialogActions,
  FormControl,
  Grid,
  TextField
} from "@material-ui/core";
import InputMask from "react-input-mask";
import NumberFormat from "react-number-format";
import { TaxType } from "../views/clients/TaxType";

const validationSchema = Yup.object({
  typeName: Yup.string("Ingresa el Nombre").required("Ingresa el Nombre")
});

export const ClientContractTypeForm = ({
  action,
  typeName,
  numberMonths,
  monthPrice,
  taxType,
  taxPercentage,
  discountPercentage,
  id,
  onClose
}) => (
  <Formik
    initialValues={{
      typeName: typeName ? typeName : "",
      numberMonths: numberMonths ? numberMonths : 1,
      monthPrice: monthPrice ? monthPrice : 0,
      taxType: taxType ? taxType : "",
      taxPercentage: taxPercentage ? taxPercentage : 0,
      discountPercentage: discountPercentage ? discountPercentage : 0
    }}
    onSubmit={values => {
      const clientContractTypeData = {
        typeName: values.typeName,
        numberMonths: values.numberMonths,
        monthPrice: values.monthPrice,
        taxType: values.taxType,
        taxPercentage: values.taxPercentage,
        discountPercentage: values.discountPercentage
      };

      if (id) clientContractTypeData.id = id;

      action({
        variables: {
          clientContractTypeData
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
          <Grid container={true} direction="column" spacing={16}>
            <Grid item={true}>
              <FormControl fullWidth={true}>
                <InputMask
                  alwaysShowMask={true}
                  formatChars={{ "?": "[a-zA-ZáéíóúñÁÉÍÓÚÑ\\s0-9]" }}
                  mask="????????????????????"
                  maskChar=""
                  onChange={handleChange}
                  value={values.typeName}
                >
                  {inputProps => (
                    <TextField
                      error={errors.typeName && touched.typeName ? true : false}
                      helperText={
                        errors.typeName && touched.typeName
                          ? `${errors.typeName}`
                          : ""
                      }
                      id="typeName"
                      {...inputProps}
                      label="Nombre"
                      name="typeName"
                    />
                  )}
                </InputMask>
              </FormControl>
            </Grid>
            <Grid item={true}>
              <FormControl fullWidth={true}>
                <TextField
                  id="numberMonths"
                  name="numberMonths"
                  label="Cantidad de Meses"
                  InputLabelProps={{
                    shrink: true
                  }}
                  inputProps={{
                    min: 1,
                    max: 100,
                    step: 1
                  }}
                  type="number"
                  onChange={handleChange}
                  value={values.numberMonths}
                />
              </FormControl>
            </Grid>
            <Grid item={true}>
              <FormControl fullWidth={true}>
                <NumberFormat
                  allowNegative={false}
                  customInput={TextField}
                  decimalSeparator="."
                  decimalScale={2}
                  defaultValue={values.monthPrice}
                  fixedDecimalScale={true}
                  id="monthPrice"
                  label="Precio Por Mes $"
                  name="monthPrice"
                  thousandSeparator=","
                  onChange={handleChange}
                  value={values.monthPrice}
                />
              </FormControl>
            </Grid>
            <Grid item={true}>
              <TaxType
                error={errors.taxType}
                setFieldValue={setFieldValue}
                taxType={values.taxType}
                touched={touched.taxType}
              />
            </Grid>
            <Grid item={true}>
              <FormControl fullWidth={true}>
                <TextField
                  id="taxPercentage"
                  name="taxPercentage"
                  label="Porcentage %"
                  InputLabelProps={{
                    shrink: true
                  }}
                  inputProps={{
                    min: 1,
                    max: 100,
                    step: 1
                  }}
                  type="number"
                  onChange={handleChange}
                  value={values.taxPercentage}
                />
              </FormControl>
            </Grid>
            <Grid item={true}>
              <FormControl fullWidth={true}>
                <TextField
                  id="discountPercentage"
                  name="discountPercentage"
                  label="Descuento %"
                  InputLabelProps={{
                    shrink: true
                  }}
                  inputProps={{
                    min: 1,
                    max: 100,
                    step: 1
                  }}
                  type="number"
                  onChange={handleChange}
                  value={values.discountPercentage}
                />
              </FormControl>
            </Grid>
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
