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
import { TypeContract } from "../views/clients/TypeContract";
import { AddressInformation } from "../components/AddressInformation";
import { ContactsInformation } from "../components/ContactsInformation";

const validationSchema = Yup.object({
  business: Yup.string("Ingresa el Nombre del Negocio").required(
    "Ingresa el Nombre del Negocio"
  ),
  idTypeContract: Yup.string("Selecciona un Tipo de Contrato").required(
    "Selecciona un Tipo de Contrato"
  ),
  idTown: Yup.string("Selecciona una Ciudad").required("Selecciona una Ciudad"),
  idTownship: Yup.string("Selecciona una Colonia").required(
    "Selecciona una Colonia"
  ),
  idStreet: Yup.string("Selecciona una Calle").required("Selecciona una Calle"),
  exteriorNumber: Yup.string("Ingresa").required("Ingresa")
});

export const ContractForm = ({
  action,
  allTownsSuggestions,
  allTownshipsSuggestions,
  allStreetsSuggestions,
  allClientContractTypesSuggestions,
  business,
  typeContract,
  idTown,
  idTownship,
  idStreet,
  exteriorNumber,
  contacts,
  idContract,
  idClient,
  onClose
}) => (
  <Formik
    initialValues={{
      business: business ? business : "",
      idTypeContract: typeContract ? typeContract.id : "",
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
      const contractData = {
        business: values.business,
        idTown: values.idTown,
        idTownship: values.idTownship,
        idStreet: values.idStreet,
        exteriorNumber: values.exteriorNumber,
        idTypeContract: values.idTypeContract,
        contacts: []
      };

      if (values.contact_one) {
        contractData.contacts.push({
          typeContact: values.type_contact_one,
          contact: values.contact_one
        });
      }

      if (values.contact_two) {
        contractData.contacts.push({
          typeContact: values.type_contact_two,
          contact: values.contact_two
        });
      }

      if (values.email) {
        contractData.contacts.push({
          typeContact: "EMAIL",
          contact: values.email
        });
      }

      if (idContract) contractData.id = idContract;

      if (idClient) contractData.idClient = idClient;

      action({
        variables: {
          contractData
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
            <Grid item={true} xs={6}>
              <FormControl fullWidth={true}>
                <InputMask
                  alwaysShowMask={true}
                  formatChars={{ "?": "[a-zA-ZáéíóúñÁÉÍÓÚÑ\\s0-9]" }}
                  mask="????????????????????????"
                  maskChar=""
                  onChange={handleChange}
                  value={values.business}
                >
                  {inputProps => (
                    <TextField
                      autoFocus={true}
                      error={errors.business && touched.business ? true : false}
                      helperText={
                        errors.business && touched.business
                          ? `${errors.business}`
                          : ""
                      }
                      id="business"
                      {...inputProps}
                      label="Nombre del Negocio"
                      name="business"
                    />
                  )}
                </InputMask>
              </FormControl>
            </Grid>
            <Grid item={true} xs={6}>
              <TypeContract
                allClientContractTypesSuggestions={
                  allClientContractTypesSuggestions
                }
                error={errors.typeContract}
                fullWidth={true}
                setFieldValue={setFieldValue}
                touched={touched.idTypeContract}
                idTypeContract={typeContract && typeContract.id}
              />
            </Grid>
            <AddressInformation
              allTownsSuggestions={allTownsSuggestions}
              allTownshipsSuggestions={allTownshipsSuggestions}
              allStreetsSuggestions={allStreetsSuggestions}
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
              errors={errors}
              handleChange={handleChange}
              setFieldValue={setFieldValue}
              touched={touched}
              values={values}
            />
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
      </form>
    )}
  </Formik>
);
