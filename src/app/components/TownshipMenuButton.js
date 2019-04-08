import React, { useState } from "react";
import { IconButton, Menu, MenuItem, Tooltip } from "@material-ui/core";
import { Add, Edit, MoreVert } from "@material-ui/icons";
import { CreateTownshipView } from "./CreateTownshipView";
import { ModifyTownshipView } from "./ModifyTownshipView";

export const TownshipMenuButton = ({
  selectedTown,
  selectedTownship,
  setSelection
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [createTownshipViewIsOpen, setCreateTownshipViewIsOpen] = useState(
    false
  );
  const [modifyTownshipViewIsOpen, setModifyTownshipViewIsOpen] = useState(
    false
  );

  const open = Boolean(anchorEl);

  const handleOpenMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Tooltip title="Opciones de Asentamiento">
        <div>
          <IconButton disabled={selectedTown === null} onClick={handleOpenMenu}>
            <MoreVert />
          </IconButton>
        </div>
      </Tooltip>
      <Menu anchorEl={anchorEl} open={open} onClose={handleCloseMenu}>
        <MenuItem onClick={handleCloseMenu}>
          <Tooltip title="Agregar Asentamiento">
            <IconButton
              onClick={() =>
                setCreateTownshipViewIsOpen(prevState => !prevState)
              }
            >
              <Add />
            </IconButton>
          </Tooltip>
        </MenuItem>
        {selectedTownship && (
          <MenuItem onClick={handleCloseMenu}>
            <Tooltip title="Modificar Asentamiento">
              <IconButton
                onClick={() =>
                  setModifyTownshipViewIsOpen(prevState => !prevState)
                }
              >
                <Edit />
              </IconButton>
            </Tooltip>
          </MenuItem>
        )}
      </Menu>
      {createTownshipViewIsOpen && (
        <CreateTownshipView
          idTown={selectedTown.value}
          isOpen={createTownshipViewIsOpen}
          onClose={() => setCreateTownshipViewIsOpen(prevState => !prevState)}
          setSelection={setSelection}
        />
      )}
      {modifyTownshipViewIsOpen && (
        <ModifyTownshipView
          idTownship={selectedTownship.value}
          isOpen={modifyTownshipViewIsOpen}
          onClose={() => setModifyTownshipViewIsOpen(prevState => !prevState)}
          setSelection={setSelection}
        />
      )}
    </React.Fragment>
  );
};
