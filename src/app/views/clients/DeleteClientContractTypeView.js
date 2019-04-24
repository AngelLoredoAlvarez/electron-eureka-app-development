import React, { useState } from "react";
import { IconButton, Tooltip } from "@material-ui/core";
import { Delete } from "@material-ui/icons";

export const DeleteClientContractTypeView = () => {
  return (
    <React.Fragment>
      <Tooltip title="Eliminar Tipo de Contrato">
        <IconButton>
          <Delete />
        </IconButton>
      </Tooltip>
    </React.Fragment>
  );
};
