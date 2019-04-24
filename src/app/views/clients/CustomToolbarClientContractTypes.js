import React, { useState } from "react";
import { IconButton, Tooltip } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { CreateClientContractTypeView } from "./CreateClientContractTypeView";

export const CustomToolbarClientContractTypes = () => {
  const [isOpen, setCreateClientTypeContractIsOpen] = useState(false);

  return (
    <React.Fragment>
      <Tooltip title="Nuevo tipo de Contracto">
        <IconButton
          onClick={() =>
            setCreateClientTypeContractIsOpen(prevState => !prevState)
          }
        >
          <Add />
        </IconButton>
      </Tooltip>
      {isOpen && (
        <CreateClientContractTypeView
          isOpen={isOpen}
          onClose={() =>
            setCreateClientTypeContractIsOpen(prevState => !prevState)
          }
        />
      )}
    </React.Fragment>
  );
};
