import React, { useState } from "react";
import { IconButton, Menu, MenuItem, Tooltip } from "@material-ui/core";
import { Add, Edit, MoreVert } from "@material-ui/icons";
import { CreateStreetView } from "./CreateStreetView";
import { ModifyStreetView } from "./ModifyStreetView";

export const StreetMenuButton = ({
  selectedTownship,
  selectedStreet,
  setSelection
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [createStreetViewIsOpen, setCreateStreetViewIsOpen] = useState(false);
  const [modifyStreetViewIsOpen, setModifyStreetViewIsOpen] = useState(false);

  const open = Boolean(anchorEl);

  const handleOpenMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Tooltip title="Opciones de Calle">
        <div>
          <IconButton
            disabled={selectedTownship === null}
            onClick={handleOpenMenu}
          >
            <MoreVert />
          </IconButton>
        </div>
      </Tooltip>
      <Menu anchorEl={anchorEl} open={open} onClose={handleCloseMenu}>
        <MenuItem onClick={handleCloseMenu}>
          <Tooltip title="Agregar Calle">
            <IconButton
              onClick={() => setCreateStreetViewIsOpen(prevState => !prevState)}
            >
              <Add />
            </IconButton>
          </Tooltip>
        </MenuItem>
        {selectedStreet && (
          <MenuItem onClick={handleCloseMenu}>
            <Tooltip title="Modificar Asentamiento">
              <IconButton
                onClick={() =>
                  setModifyStreetViewIsOpen(prevState => !prevState)
                }
              >
                <Edit />
              </IconButton>
            </Tooltip>
          </MenuItem>
        )}
      </Menu>
      {createStreetViewIsOpen && (
        <CreateStreetView
          idTownship={selectedTownship.value}
          isOpen={createStreetViewIsOpen}
          onClose={() => setCreateStreetViewIsOpen(prevState => !prevState)}
          setSelection={setSelection}
        />
      )}
      {modifyStreetViewIsOpen && (
        <ModifyStreetView
          idStreet={selectedStreet.value}
          isOpen={modifyStreetViewIsOpen}
          onClose={() => setModifyStreetViewIsOpen(prevState => !prevState)}
          setSelection={setSelection}
        />
      )}
    </React.Fragment>
  );
};
