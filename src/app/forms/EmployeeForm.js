import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  Button,
  DialogContent,
  DialogActions,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  TextField
} from "@material-ui/core";
import InputMask from "react-input-mask";
import PasswordField from "material-ui-password-field";
import { CommonInformationForm } from "../components/CommonInformationForm";
import { Role } from "../views/employees/Role";
import { Mutation } from "react-apollo";
import { UPDATE_ROLES_LIST_DIALOG_STATE } from "../graphql/mutations/UpdateRolesListDialogState";
import { AllRolesView } from "../views/employees/AllRolesView";
import { IconButton, Tooltip } from "@material-ui/core";
import { Security } from "@material-ui/icons";

const validationSchema = Yup.object({
  name: Yup.string("Ingresa el Nombre").required("Ingresa el Nombre"),
  firstName: Yup.string("Ingresa el Apellido Paterno").required(
    "Ingresa el Apellido Paterno"
  ),
  idTown: Yup.string("Selecciona una Ciudad").required("Selecciona una Ciudad"),
  idTownship: Yup.string("Selecciona una Colonia").required(
    "Selecciona una Colonia"
  ),
  idStreet: Yup.string("Selecciona una Calle").required("Selecciona una Calle"),
  exteriorNumber: Yup.string("Ingresa").required("Ingresa"),
  contact_one: Yup.string().notRequired(),
  type_contact_one: Yup.string()
    .notRequired()
    .when("contact_one", {
      is: value => value === undefined,
      then: Yup.string().notRequired(),
      otherwise: Yup.string().required("Selecciona...")
    }),
  contact_two: Yup.string().notRequired(),
  type_contact_two: Yup.string()
    .notRequired()
    .when("contact_two", {
      is: value => value === undefined,
      then: Yup.string().notRequired(),
      otherwise: Yup.string().required("Selecciona...")
    }),
  username: Yup.string("Ingresa un Nombre de Usuario").required(
    "Ingresa un Nombre de Usuario"
  ),
  password: Yup.string("Ingresa la Contraseña").required(
    "Ingresa la Contraseña"
  ),
  role: Yup.string("Elige un Rol").required("Elige un Rol")
});

export const EmployeeForm = ({
  action,
  allTownsSuggestions,
  allTownshipsSuggestions,
  allStreetsSuggestions,
  allRolesSuggestions,
  name,
  firstName,
  lastName,
  idTown,
  idTownship,
  idStreet,
  exteriorNumber,
  contacts,
  username,
  role,
  disableAdmin,
  disableRole,
  isAdmin,
  id,
  onClose
}) => (
  <Formik
    initialValues={{
      name: name ? name : "",
      firstName: firstName ? firstName : "",
      lastName: lastName ? lastName : "",
      idTown: idTown ? idTown : "",
      idTownship: idTown ? idTownship : "",
      idStreet: idStreet ? idStreet : "",
      exteriorNumber: exteriorNumber ? exteriorNumber : "",
      contact_one: contacts
        ? contacts.edges.length === 3 ||
          contacts.edges.length === 2 ||
          (contacts.edges.length === 1 &&
            contacts.edges[0].node.typeContact !== "EMAIL")
          ? contacts.edges[0].node.contact
          : ""
        : "",
      type_contact_one: contacts
        ? contacts.edges.length === 3 ||
          contacts.edges.length === 2 ||
          (contacts.edges.length === 1 &&
            contacts.edges[0].node.typeContact !== "EMAIL")
          ? contacts.edges[0].node.typeContact
          : ""
        : "",
      contact_two: contacts
        ? contacts.edges.length === 3
          ? contacts.edges[1].node.contact
          : contacts.edges.length === 2
          ? contacts.edges[1].node.typeContact !== "EMAIL"
            ? contacts.edges[1].node.contact
            : ""
          : ""
        : "",
      type_contact_two: contacts
        ? contacts.edges.length === 3
          ? contacts.edges[1].node.typeContact
          : contacts.edges.length === 2
          ? contacts.edges[1].node.typeContact !== "EMAIL"
            ? contacts.edges[1].node.typeContact
            : ""
          : ""
        : "",
      email: contacts
        ? contacts.edges.length === 3
          ? contacts.edges[2].node.typeContact === "EMAIL"
            ? contacts.edges[2].node.contact
            : ""
          : contacts.edges.length === 2
          ? contacts.edges[1].node.typeContact === "EMAIL"
            ? contacts.edges[1].node.contact
            : ""
          : contacts.edges.length === 1
          ? contacts.edges[0].node.typeContact === "EMAIL"
            ? contacts.edges[0].node.contact
            : ""
          : ""
        : "",
      username: username ? username : "",
      password: "REEMPLAZAME",
      role: role ? role : ""
    }}
    onSubmit={values => {
      const employeeData = {
        name: values.name,
        firstName: values.firstName,
        lastName: values.lastName,
        idTown: values.idTown,
        idTownship: values.idTownship,
        idStreet: values.idStreet,
        exteriorNumber: values.exteriorNumber,
        contacts: [],
        username: values.username,
        password: values.password,
        role: values.role
      };

      if (values.contact_one) {
        employeeData.contacts.push({
          typeContact: values.type_contact_one,
          contact: values.contact_one
        });
      }

      if (values.contact_two) {
        employeeData.contacts.push({
          typeContact: values.type_contact_two,
          contact: values.contact_two
        });
      }

      if (values.email) {
        employeeData.contacts.push({
          typeContact: "EMAIL",
          contact: values.email
        });
      }

      if (id) employeeData.id = id;

      action({
        variables: {
          employeeData
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
      <form onSubmit={handleSubmit}>
        <DialogContent style={{ overflow: "visible" }}>
          <Grid container={true} direction="row" spacing={8}>
            <Grid item={true} xs={12}>
              <CommonInformationForm
                allTownsSuggestions={allTownsSuggestions}
                allTownshipsSuggestions={allTownshipsSuggestions}
                allStreetsSuggestions={allStreetsSuggestions}
                contacts={contacts}
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
            </Grid>
            <Grid container={true} item={true} spacing={8}>
              <Grid item={true} xs={4}>
                <FormControl fullWidth={true}>
                  <InputMask
                    alwaysShowMask={true}
                    disabled={disableAdmin}
                    formatChars={{ "?": "[a-zA-Z\\s]" }}
                    mask="???????????????"
                    maskChar=""
                    onChange={handleChange}
                    value={values.username}
                  >
                    {inputProps => (
                      <TextField
                        error={
                          errors.username && touched.username ? true : false
                        }
                        helperText={
                          errors.username && touched.username
                            ? `${errors.username}`
                            : ""
                        }
                        id="username"
                        {...inputProps}
                        label="Nombre de Usuario"
                        name="username"
                      />
                    )}
                  </InputMask>
                </FormControl>
              </Grid>
              <Grid item={true} xs={4}>
                <FormControl
                  error={errors.password && touched.password ? true : false}
                  fullWidth={true}
                >
                  <InputLabel htmlFor="error-label">Contraseña</InputLabel>
                  <PasswordField
                    disabled={disableAdmin}
                    id="password"
                    name="password"
                    onChange={handleChange}
                    value={values.password}
                  />
                  {errors.password && touched.password ? (
                    <FormHelperText>{errors.password}</FormHelperText>
                  ) : null}
                </FormControl>
              </Grid>
              <Grid item={true} xs={isAdmin ? 3 : 4}>
                <Role
                  disableRole={disableRole}
                  error={errors.role}
                  fullWidth={true}
                  isDisabled={disableAdmin}
                  role={role}
                  roleSuggestions={allRolesSuggestions}
                  setFieldValue={setFieldValue}
                  touched={touched.role}
                />
              </Grid>
              {isAdmin && (
                <Grid item={true}>
                  <Mutation
                    mutation={UPDATE_ROLES_LIST_DIALOG_STATE}
                    variables={{ isOpen: true }}
                  >
                    {UpdateRolesListDialogState => (
                      <Tooltip title="Administrar Roles">
                        <IconButton onClick={UpdateRolesListDialogState}>
                          <Security />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Mutation>
                  <AllRolesView />
                </Grid>
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            disabled={disableAdmin}
            type="submit"
            variant="contained"
          >
            Guardar
          </Button>
          <Button color="secondary" onClick={onClose} variant="contained">
            Cancelar
          </Button>
        </DialogActions>
      </form>
    )}
  </Formik>
);
