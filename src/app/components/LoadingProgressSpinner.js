import React from "react";
import { CircularProgress, Grid } from "@material-ui/core";

export const LoadingProgressSpinner = () => (
  <Grid
    alignItems="center"
    container={true}
    direction="column"
    justify="center"
    spacing={0}
  >
    <CircularProgress color="primary" size={100} variant="indeterminate" />
  </Grid>
);
