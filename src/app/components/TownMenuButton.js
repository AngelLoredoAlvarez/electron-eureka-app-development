import React, { useState } from "react";
import { IconButton, Menu, MenuItem, Tooltip } from "@material-ui/core";
import { Add, Edit, MoreVert } from "@material-ui/icons";
import { CreateTownView } from "./CreateTownView";
import { ModifyTownView } from "./ModifyTownView";

export const TownMenuButton = ({ selectedTown, setSelection }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [createTownViewIsOpen, setCreateTownViewIsOpen] = useState(false);
  const [modifyTownViewIsOpen, setModifyTownViewIsOpen] = useState(false);

  const open = Boolean(anchorEl);

  const handleOpenMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Tooltip title="Opciones de Municipio">
        <IconButton onClick={handleOpenMenu}>
          <MoreVert />
        </IconButton>
      </Tooltip>
      <Menu anchorEl={anchorEl} open={open} onClose={handleCloseMenu}>
        <MenuItem onClick={handleCloseMenu}>
          <Tooltip title="Agregar Municipio">
            <IconButton
              onClick={() => setCreateTownViewIsOpen(prevState => !prevState)}
            >
              <Add />
            </IconButton>
          </Tooltip>
        </MenuItem>
        {selectedTown && (
          <MenuItem onClick={handleCloseMenu}>
            <Tooltip title="Modificar Municipio">
              <IconButton
                onClick={() => setModifyTownViewIsOpen(prevState => !prevState)}
              >
                <Edit />
              </IconButton>
            </Tooltip>
          </MenuItem>
        )}
      </Menu>
      {createTownViewIsOpen && (
        <CreateTownView
          isOpen={createTownViewIsOpen}
          onClose={() => setCreateTownViewIsOpen(prevState => !prevState)}
          setSelection={setSelection}
        />
      )}
      {modifyTownViewIsOpen && (
        <ModifyTownView
          idTown={selectedTown.value}
          isOpen={modifyTownViewIsOpen}
          onClose={() => setModifyTownViewIsOpen(prevState => !prevState)}
          setSelection={setSelection}
        />
      )}
    </React.Fragment>
  );
};
