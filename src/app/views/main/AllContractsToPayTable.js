import React from "react";
import gql from "graphql-tag";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import { Query } from "react-apollo";
import MaterialDatatable from "material-datatable";
import { DRAWER_MENU_STATE } from "../../graphql/queries/DrawerMenuState";
import { PayAndRenovateContractOrPayAndEndContract } from "./PayAndRenovateContractOrPayAndEndContract";

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
                customBodyRender: value => `${value.node.business}`
              }
            },
            {
              name: "Cliente",
              field: "fullName",
              options: {
                customBodyRender: value => `${value.node.client.fullName}`
              }
            },
            {
              name: "Fecha de Inicio",
              field: "formatedStartDate",
              options: {
                customBodyRender: value => `${value.node.formatedStartDate}`
              }
            },
            {
              name: "Fecha de Fin",
              field: "formatedEndDate",
              options: {
                customBodyRender: value => `${value.node.formatedEndDate}`
              }
            },
            {
              name: "Tipo de Contrato",
              field: "typeContract",
              options: {
                customBodyRender: value => `${value.node.typeContract}`
              }
            },
            {
              field: "id",
              options: {
                customBodyRender: value => (
                  <PayAndRenovateContractOrPayAndEndContract
                    business={value.node.business}
                    idClient={value.node.client.id}
                    idContract={value.node.id}
                    typeContract={value.node.typeContract}
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
