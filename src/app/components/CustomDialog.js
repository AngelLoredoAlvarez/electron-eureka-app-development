import React from "react";
import { Dialog, DialogTitle } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

export const CustomDialog = withStyles(
  () => ({
    root: { overflow: "visible" }
  }),
  { withTheme: true }
)(({ classes, children, isOpen, maxWidth, onClose, title }) => (
  <Dialog
    classes={{ paperScrollPaper: classes.root }}
    fullWidth={true}
    maxWidth={maxWidth}
    onClose={onClose}
    open={isOpen}
  >
    <DialogTitle>{title}</DialogTitle>
    {children}
  </Dialog>
));
