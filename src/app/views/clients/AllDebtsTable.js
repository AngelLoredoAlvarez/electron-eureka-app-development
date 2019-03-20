import React from "react";
import { Query } from "react-apollo";
import { ALL_CLIENTS_DEBTS } from "../../graphql/queries/AllClientsDebts";
import { LoadingProgressSpinner } from "../../components/LoadingProgressSpinner";
import MaterialDatatable from "material-datatable";

export const AllDebtsTable = () => (
  <Query query={ALL_CLIENTS_DEBTS}>
    {({ data: { allClientsDebts }, loading }) => {
      if (loading) return <LoadingProgressSpinner />;

      return (
        <MaterialDatatable
          columns={[
            {
              name: "Nombre del Negocio",
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
              name: "Fecha de Pago",
              field: "status",
              options: {
                customBodyRender: value => value.node.formatedMovementDate
              }
            }
          ]}
          data={allClientsDebts.edges}
          options={{
            download: false,
            filter: false,
            print: false,
            rowHover: true,
            rowsPerPage: 5,
            rowsPerPageOptions: [5, 10, 15],
            selectableRows: false,
            sort: false,
            textLabels: {
              body: {
                noMatch: "No existen deudas :D"
              },
              pagination: {
                next: "Página Siguiente",
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
      );
    }}
  </Query>
);
