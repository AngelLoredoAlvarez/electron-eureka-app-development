import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Button, DialogContent, DialogActions, Grid } from "@material-ui/core";
import { CommonInformationForm } from "../components/CommonInformationForm";

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
  exteriorNumber: Yup.string("Requerido").required("Requerido"),
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
    })
});

export const ClientForm = ({
  action,
  allTownsSuggestions,
  allTownshipsSuggestions,
  allStreetsSuggestions,
  name,
  firstName,
  lastName,
  idTown,
  idTownship,
  idStreet,
  exteriorNumber,
  contacts,
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
        : ""
    }}
    onSubmit={values => {
      const clientData = {
        name: values.name,
        firstName: values.firstName,
        lastName: values.lastName,
        idTown: values.idTown,
        idTownship: values.idTownship,
        idStreet: values.idStreet,
        exteriorNumber: values.exteriorNumber,
        contacts: []
      };

      if (values.contact_one) {
        clientData.contacts.push({
          typeContact: values.type_contact_one,
          contact: values.contact_one
        });
      }

      if (values.contact_two) {
        clientData.contacts.push({
          typeContact: values.type_contact_two,
          contact: values.contact_two
        });
      }

      if (values.email) {
        clientData.contacts.push({
          typeContact: "EMAIL",
          contact: values.email
        });
      }

      if (id) clientData.id = id;

      action({
        variables: {
          clientData
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
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button color="primary" type="submit" variant="contained">
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
