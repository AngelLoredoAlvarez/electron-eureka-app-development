import React from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import { Query } from "react-apollo";
import { DRAWER_MENU_STATE } from "../../graphql/queries/DrawerMenuState";
import MaterialDatatable from "material-datatable";
import { ChargeMonth } from "./ChargeMonth";

export const AllContractsToPayTable = withStyles(
  theme => ({
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: "0 8px",
      ...theme.mixins.toolbar,
      justifyContent: "flex-end"
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing.unit * 3,
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      marginLeft: 0
    },
    contentShift: {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      }),
      marginLeft: 240
    }
  }),
  { withTheme: true }
)(({ classes, allContractsToPay }) => (
  <Query query={DRAWER_MENU_STATE}>
    {({ data: { drawerMenuState } }) => (
      <main
        className={classNames(classes.content, {
          [classes.contentShift]: drawerMenuState.drawerState
        })}
      >
        <div className={classes.drawerHeader} />
        <MaterialDatatable
          title="Contratos por Pagar"
          data={allContractsToPay.edges}
          columns={[
            {
              name: "Negocio",
              field: "business",
              options: {
                customBodyRender: value => `${value.node.contract.business}`
              }
            },
            {
              name: "Cliente",
              field: "fullName",
              options: {
                customBodyRender: value =>
                  `${value.node.contract.client.fullName}`
              }
            },
            {
              name: "Contacto 1",
              field: "contact",
              options: {
                customBodyRender: value =>
                  value.node.contract.contacts.edges[0]
                    ? `${value.node.contract.contacts.edges[0].node.contact}`
                    : "N/C"
              }
            },
            {
              name: "Contacto 2",
              field: "contact",
              options: {
                customBodyRender: value =>
                  value.node.contract.contacts.edges[1]
                    ? `${value.node.contract.contacts.edges[1].node.contact}`
                    : "N/C"
              }
            },
            {
              name: "Contacto 3",
              field: "contact",
              options: {
                customBodyRender: value =>
                  value.node.contract.contacts.edges[2]
                    ? `${value.node.contract.contacts.edges[2].node.contact}`
                    : "N/C"
              }
            },
            {
              field: "id",
              options: {
                customBodyRender: value => (
                  <ChargeMonth
                    client={value.node.contract.client.fullName}
                    idClient={value.node.contract.client.id}
                    idContract={value.node.contract.id}
                  />
                )
              }
            }
          ]}
          options={{
            download: false,
            filter: false,
            print: false,
            rowHover: true,
            rowsPerPage: 8,
            rowsPerPageOptions: [8, 16, 24],
            selectableRows: false,
            sort: false,
            textLabels: {
              body: {
                noMatch: "No hay contratos por pagar el día de hoy..."
              },
              pagination: {
                next: "Siguiente Página",
                previous: "Página Anterior",
                rowsPerPage: "Filas por Página:",
                displayRows: "de"
              },
              toolbar: {
                search: "Búscar"
              }
            },
            viewColumns: false
          }}
        />
      </main>
    )}
  </Query>
));
