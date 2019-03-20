import React from "react";
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import {
  AccountBox,
  AssignmentInd,
  ChevronLeft,
  MoneyOff
} from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";
import { Mutation, Query } from "react-apollo";
import { DRAWER_MENU_STATE } from "../../graphql/queries/DrawerMenuState";
import { UPDATE_DRAWER_MENU_STATE } from "../../graphql/mutations/UpdateDrawerMenuState";
import { UPDATE_DEBTS_LIST_DIALOG_STATE } from "../../graphql/mutations/UpdateDebtsListDialogState";
import { UPDATE_CLIENTS_LIST_DIALOG_STATE } from "../../graphql/mutations/UpdateClientsListDialogState";
import { UPDATE_EMPLOYEES_LIST_DIALOG_STATE } from "../../graphql/mutations/UpdateEmployeesListDialogState";

export const DrawerMainView = withStyles(
  theme => ({
    drawer: {
      width: 240,
      flexShrink: 0
    },
    drawerPaper: {
      width: 240
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: "0 8px",
      ...theme.mixins.toolbar,
      justifyContent: "flex-end"
    }
  }),
  { withTheme: true }
)(({ classes }) => (
  <Query query={DRAWER_MENU_STATE}>
    {({ data: { drawerMenuState } }) => (
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={drawerMenuState.drawerState}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <Mutation
            mutation={UPDATE_DRAWER_MENU_STATE}
            variables={{
              drawerState: !drawerMenuState.drawerState,
              menuState: drawerMenuState.menuState
            }}
          >
            {UpdateDrawerMenuState => (
              <IconButton onClick={UpdateDrawerMenuState}>
                <ChevronLeft />
              </IconButton>
            )}
          </Mutation>
        </div>
        <Divider />
        <List>
          <Mutation
            mutation={UPDATE_DEBTS_LIST_DIALOG_STATE}
            variables={{ isOpen: true }}
          >
            {UpdateDebtsListDialogState => (
              <ListItem button={true} onClick={UpdateDebtsListDialogState}>
                <ListItemIcon>
                  <MoneyOff />
                </ListItemIcon>
                <ListItemText primary="Adeudos" />
              </ListItem>
            )}
          </Mutation>
          <Mutation
            mutation={UPDATE_CLIENTS_LIST_DIALOG_STATE}
            variables={{ isOpen: true }}
          >
            {UpdateClientsListDialogState => (
              <ListItem button={true} onClick={UpdateClientsListDialogState}>
                <ListItemIcon>
                  <AccountBox />
                </ListItemIcon>
                <ListItemText primary="Clientes" />
              </ListItem>
            )}
          </Mutation>
          <Mutation
            mutation={UPDATE_EMPLOYEES_LIST_DIALOG_STATE}
            variables={{ isOpen: true }}
          >
            {UpdateEmployeesListDialogState => (
              <ListItem button={true} onClick={UpdateEmployeesListDialogState}>
                <ListItemIcon>
                  <AssignmentInd />
                </ListItemIcon>
                <ListItemText primary="Empleados" />
              </ListItem>
            )}
          </Mutation>
        </List>
      </Drawer>
    )}
  </Query>
));
