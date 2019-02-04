import React from "react";
import { EMPLOYEE_APP_DATA } from "../../graphql/fragments/EmployeeAppData";
import { EMPLOYEE_PRIVILEGES } from "../../graphql/fragments/EmployeePrivileges";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import {
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography
} from "@material-ui/core";
import { AccountCircle, Menu as MenuIcon } from "@material-ui/icons";
import { Mutation, Query } from "react-apollo";
import { DRAWER_MENU_STATE } from "../../graphql/queries/DrawerMenuState";
import { UPDATE_DRAWER_MENU_STATE } from "../../graphql/mutations/UpdateDrawerMenuState";
import { Link } from "react-router-dom";

export const AppBarMainView = withStyles(
  theme => ({
    appBar: {
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    appBarShift: {
      width: `calc(100% - 240px)`,
      marginLeft: 240,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    menuButton: {
      marginLeft: 12,
      marginRight: 20
    },
    hide: {
      display: "none"
    }
  }),
  { withTheme: true }
)(({ classes, employeeFullName }) => (
  <Query query={DRAWER_MENU_STATE}>
    {({ client, data: { drawerMenuState } }) => (
      <AppBar
        position="fixed"
        className={classNames(classes.appBar, {
          [classes.appBarShift]: drawerMenuState.drawerState
        })}
      >
        <Toolbar>
          <Mutation
            mutation={UPDATE_DRAWER_MENU_STATE}
            variables={{
              drawerState: !drawerMenuState.drawerState,
              menuState: drawerMenuState.menuState
            }}
          >
            {UpdateDrawerMenuState => (
              <IconButton
                className={classNames(
                  classes.menuButton,
                  drawerMenuState.drawerState && classes.hide
                )}
                color="inherit"
                onClick={UpdateDrawerMenuState}
                style={{ marginLeft: -12, marginRight: 20 }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Mutation>

          <Typography color="inherit" style={{ flexGrow: 1 }} variant="h6">
            Eureka
          </Typography>
          <Typography color="inherit" style={{ marginRight: 20 }} variant="h6">
            Usuario Activo: {employeeFullName}
          </Typography>

          <Mutation
            mutation={UPDATE_DRAWER_MENU_STATE}
            variables={{
              drawerState: drawerMenuState.drawerState,
              menuState: !drawerMenuState.menuState
            }}
          >
            {UpdateDrawerMenuState => (
              <div>
                <IconButton
                  id="employeeOptions"
                  color="inherit"
                  onClick={UpdateDrawerMenuState}
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  anchorEl={() => document.getElementById("employeeOptions")}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  onClose={UpdateDrawerMenuState}
                  open={drawerMenuState.menuState}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                >
                  <MenuItem
                    component={Link}
                    to="/"
                    onClick={() => {
                      client.resetStore();
                      sessionStorage.clear();
                    }}
                  >
                    Cerrar Sesión
                  </MenuItem>
                </Menu>
              </div>
            )}
          </Mutation>
        </Toolbar>
      </AppBar>
    )}
  </Query>
));

AppBarMainView.fragments = {
  EmployeeAppData: EMPLOYEE_APP_DATA,
  EmployeePrivileges: EMPLOYEE_PRIVILEGES
};
