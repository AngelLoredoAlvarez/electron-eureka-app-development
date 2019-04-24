import React, { useState } from "react";
import { IconButton, Tooltip } from "@material-ui/core";
import { Edit } from "@material-ui/icons";

export const ModifyClientContractTypeView = () => {
  return (
    <React.Fragment>
      <Tooltip title="Modificar Tipo de Contrato">
        <IconButton>
          <Edit />
        </IconButton>
      </Tooltip>
    </React.Fragment>
  );
};
