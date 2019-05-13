import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  Button,
  DialogContent,
  DialogActions,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Grid,
  InputLabel,
  Switch,
  TextField
} from "@material-ui/core";
import InputMask from "react-input-mask";

const validationSchema = Yup.object({
  role: Yup.string("Ingresa el Nombre del Rol").required(
    "Ingresa el Nombre del Rol"
  )
});

export const RoleForm = ({
  action,
  role,
  addModifyClient,
  deleteClient,
  addModifyEmployee,
  deleteEmployee,
  onClose,
  updating
}) => (
  <Formik
    initialValues={{
      role: role ? role : "",
      prevRoleName: role ? role : "",
      addModifyClient: addModifyClient ? true : false,
      deleteClient: deleteClient ? true : false,
      addModifyEmployee: addModifyEmployee ? true : false,
      deleteEmployee: deleteEmployee ? true : false
    }}
    onSubmit={values => {
      const roleData = {
        roleName: values.role,
        rolePrivileges: [
          {
            module: "Clients",
            addModify: values.addModifyClient,
            delete: values.deleteClient
          },
          {
            module: "Employees",
            addModify: values.addModifyEmployee,
            delete: values.deleteEmployee
          }
        ]
      };

      if (values.prevRoleName) roleData.prevRoleName = values.prevRoleName;

      action({
        variables: {
          roleData
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
          <Grid container={true} direction="row" spacing={24}>
            <Grid item={true} xs={12}>
              <FormControl fullWidth={true}>
                <InputMask
                  alwaysShowMask={true}
                  disabled={updating}
                  formatChars={{ "?": "[a-zA-Z]" }}
                  mask="???????????????"
                  maskChar=""
                  onChange={handleChange}
                  value={values.role}
                >
                  {inputProps => (
                    <TextField
                      autoFocus={true}
                      error={errors.role && touched.role ? true : false}
                      helperText={
                        errors.role && touched.role ? `${errors.role}` : ""
                      }
                      id="role"
                      {...inputProps}
                      label="Nombre del Rol"
                      name="role"
                    />
                  )}
                </InputMask>
              </FormControl>
            </Grid>
            <Grid container={true} direction="row" item={true} xs={12}>
              <Grid item={true} xs={6}>
                <FormControl component="fieldset">
                  <FormLabel>Clientes</FormLabel>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={values.addModifyClient}
                          id="addModifyClient"
                          name="addModifyClient"
                          onChange={handleChange}
                          value={values.addModifyClient}
                        />
                      }
                      label="Agregar y Modificar"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={values.deleteClient}
                          id="deleteClient"
                          name="deleteClient"
                          onChange={handleChange}
                          value={values.deleteClient}
                        />
                      }
                      label="Eliminar"
                    />
                  </FormGroup>
                </FormControl>
              </Grid>
              <Grid item={true} xs={6}>
                <FormControl component="fieldset">
                  <FormLabel>Empleados</FormLabel>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={values.addModifyEmployee}
                          id="addModifyEmployee"
                          name="addModifyEmployee"
                          onChange={handleChange}
                          value={values.addModifyEmployee}
                        />
                      }
                      label="Agregar y Modificar"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={values.deleteEmployee}
                          id="deleteEmployee"
                          name="deleteEmployee"
                          onChange={handleChange}
                          value={values.deleteEmployee}
                        />
                      }
                      label="Eliminar"
                    />
                  </FormGroup>
                </FormControl>
              </Grid>
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
