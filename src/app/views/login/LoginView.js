import React from "react";
import { Grid } from "@material-ui/core";
import { Mutation } from "react-apollo";
import { UPDATE_CONTRACTS_STATUS } from "../../graphql/mutations/UpdateContractsStatus";
import { UpdateContractsView } from "./UpdateContractsView";

export const LoginView = () => (
  <Grid
    alignItems="center"
    container={true}
    direction="column"
    justify="center"
    spacing={0}
    style={{ minHeight: "97vh" }}
  >
    <Mutation mutation={UPDATE_CONTRACTS_STATUS}>
      {updateContractsStatus => (
        <UpdateContractsView updateContractsStatus={updateContractsStatus} />
      )}
    </Mutation>
  </Grid>
);
