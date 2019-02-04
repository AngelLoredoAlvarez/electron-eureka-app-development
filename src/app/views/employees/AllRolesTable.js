import React from "react";
import MaterialDatatable from "material-datatable";
import { Grid } from "@material-ui/core";
import { ModifyRoleView } from "./ModifyRoleView";
import { DeleteRoleView } from "./DeleteRoleView";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { LoadingProgressSpinner } from "../../components/LoadingProgressSpinner";
import { CustomToolbarRoles } from "./CustomToolbarRoles";

const ALL_ROLES = gql`
  query {
    allRoles {
      edges {
        node
      }
    }
  }
`;

export const AllRolesTable = () => (
  <Query query={ALL_ROLES}>
    {({ data: { allRoles }, loading }) => {
      if (loading) return <LoadingProgressSpinner />;

      allRoles.edges = allRoles.edges.filter(
        ({ node }) => node !== "eureka_administrador"
      );

      return (
        <MaterialDatatable
          columns={[
            {
              name: "Rol",
              field: "node",
              options: {
                customBodyRender: ({ node }) =>
                  node
                    .replace("eureka_", "")
                    .charAt(0)
                    .toUpperCase() + node.slice(8)
              }
            },
            {
              name: "Opciones",
              field: "node",
              options: {
                customBodyRender: ({ node }) => (
                  <Grid container={true} direction="row" spacing={8}>
                    <Grid item={true} xs={6}>
                      <ModifyRoleView role={node} />
                    </Grid>
                    <Grid item={true} xs={6}>
                      <DeleteRoleView role={node} />
                    </Grid>
                  </Grid>
                ),
                width: 100
              }
            }
          ]}
          data={allRoles.edges}
          options={{
            customToolbar: () => <CustomToolbarRoles />,
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
                noMatch: "No se ha registrado a ningún rol..."
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
