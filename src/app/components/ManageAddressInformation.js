import React, { useState } from "react";
import { Grid, List, ListItem, ListItemText } from "@material-ui/core";
import { CustomDialog } from "./CustomDialog";

export const ManageAddressInformation = ({
  allTowns,
  allTownships,
  allStreets,
  isOpen,
  maxWidth,
  onClose,
  title
}) => {
  const [filteredTownships, setFilteredTownships] = useState([]);

  const filterTownships = idTown => {
    const filteredTownships = allTownships.filter(
      township => township.link === idTown
    );

    /*const filteredStreets = allStreets.filter(
      street => street.link === filteredTownships[0].value
    );*/

    setFilteredTownships(filteredTownships);
  };

  return (
    <CustomDialog
      isOpen={isOpen}
      maxWidth={maxWidth}
      onClose={onClose}
      title={title}
    >
      <Grid container={true} direction="row" spacing={8}>
        <Grid item={true} xs={4}>
          <List>
            {allTowns.map(({ label, value }) => (
              <ListItem
                button={true}
                key={value}
                onClick={() => filterTownships(value)}
              >
                <ListItemText>{label}</ListItemText>
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item={true} xs={4}>
          <List>
            {filteredTownships.map(({ label, value }) => (
              <ListItem button={true} key={value}>
                <ListItemText>{label}</ListItemText>
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </CustomDialog>
  );
};
