import React from "react";
import { CustomDialog } from "../../components/CustomDialog";
import { DialogContent, FormLabel, Grid } from "@material-ui/core";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { CLIENT_CONTRACT_FIELDS } from "../../graphql/fragments/ClientContractFields";
import { LoadingProgressSpinner } from "../../components/LoadingProgressSpinner";

const CLIENT_CONTRACT_BY_ID_QUERY = gql`
  query($id: Int!) {
    clientContractById(id: $id) {
      ...ClientContractFields
    }
  }
  ${CLIENT_CONTRACT_FIELDS}
`;

export const ClientContractDetailsView = ({
  idContract,
  isOpen,
  maxWidth,
  onClose,
  title
}) => (
  <CustomDialog
    isOpen={isOpen}
    maxWidth={maxWidth}
    onClose={onClose}
    title={title}
  >
    <Query query={CLIENT_CONTRACT_BY_ID_QUERY} variables={{ id: idContract }}>
      {({ data: { clientContractById }, loading }) => {
        if (loading) return <LoadingProgressSpinner />;

        return (
          <DialogContent>
            <Grid container={true} spacing={24}>
              <Grid container={true} item={true} xs={12}>
                <Grid item={true}>
                  <FormLabel component="legend">Dirección:</FormLabel>
                </Grid>
                <Grid item={true}>
                  <FormLabel component="legend">
                    {clientContractById.fullAddress}
                  </FormLabel>
                </Grid>
              </Grid>
              <Grid container={true} item={true} xs={12}>
                <Grid item={true}>
                  <FormLabel component="legend">Contacto 1:</FormLabel>
                </Grid>
                <Grid item={true}>
                  <FormLabel component="legend">
                    {clientContractById.contacts.edges[0]
                      ? " " + clientContractById.contacts.edges[0].node.contact
                      : " N/C"}
                  </FormLabel>
                </Grid>
              </Grid>
              <Grid container={true} item={true} xs={12}>
                <Grid item={true}>
                  <FormLabel component="legend">Contacto 2:</FormLabel>
                </Grid>
                <Grid item={true}>
                  <FormLabel component="legend">
                    {clientContractById.contacts.edges[1]
                      ? " " + clientContractById.contacts.edges[1].node.contact
                      : " N/C"}
                  </FormLabel>
                </Grid>
              </Grid>
              <Grid container={true} item={true} xs={12}>
                <Grid item={true}>
                  <FormLabel component="legend">Contacto 3:</FormLabel>
                </Grid>
                <Grid item={true}>
                  <FormLabel component="legend">
                    {clientContractById.contacts.edges[2]
                      ? " " + clientContractById.contacts.edges[2].node.contact
                      : " N/C"}
                  </FormLabel>
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>
        );
      }}
    </Query>
  </CustomDialog>
);
