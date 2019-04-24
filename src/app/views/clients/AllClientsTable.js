import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { ALL_CLIENTS } from "../../graphql/fragments/AllClients";
import { EMPLOYEE_PRIVILEGES } from "../../graphql/fragments/EmployeePrivileges";
import { LoadingProgressSpinner } from "../../components/LoadingProgressSpinner";
import { GraphQLError } from "../../components/GraphQLError";
import { NetworkError } from "../../components/NetworkError";
import MaterialDatatable from "material-datatable";
import { CustomToolbarClients } from "./CustomToolbarClients";
import { MoreClientOptions } from "./MoreClientOptions";

const ALL_CLIENTS_QUERY = gql`
  query {
    allClients(orderBy: CREATED_AT_DESC) {
      ...AllClients
    }
    currentEmployee {
      ...EmployeePrivileges
    }
  }
  ${ALL_CLIENTS}
  ${EMPLOYEE_PRIVILEGES}
`;

export const AllClientsTable = () => (
  <Query query={ALL_CLIENTS_QUERY}>
    {({ data: { allClients, currentEmployee }, error, loading }) => {
      if (loading) return <LoadingProgressSpinner />;

      return (
        <React.Fragment>
          {error ? (
            error.networkError ? (
              <NetworkError isOpen={true} networkError={error.networkError} />
            ) : error.graphQLErrors ? (
              <GraphQLError
                isOpen={true}
                graphQLErrors={error.graphQLErrors[0]}
              />
            ) : null
          ) : null}

          <MaterialDatatable
            columns={[
              {
                name: "Nombre",
                field: "fullName",
                options: {
                  customBodyRender: value => `${value.node.fullName}`
                }
              },
              {
                name: "Dirección",
                field: "fullAddress",
                options: {
                  customBodyRender: value => `${value.node.fullAddress}`
                }
              },
              {
                name: "Contacto 1",
                field: "contact",
                options: {
                  customBodyRender: value =>
                    value.node.contacts.edges[0]
                      ? `${value.node.contacts.edges[0].node.contact}`
                      : "N/C"
                }
              },
              {
                name: "Contacto 2",
                field: "contact",
                options: {
                  customBodyRender: value =>
                    value.node.contacts.edges[1]
                      ? `${value.node.contacts.edges[1].node.contact}`
                      : "N/C"
                }
              },
              {
                name: "Contacto 3",
                field: "contact",
                options: {
                  customBodyRender: value =>
                    value.node.contacts.edges[2]
                      ? `${value.node.contacts.edges[2].node.contact}`
                      : "N/C"
                }
              },
              {
                name: "Opciones",
                field: "id",
                options: {
                  customBodyRender: value => (
                    <MoreClientOptions
                      idClient={value.node.id}
                      privilegesModules={currentEmployee.privilegesModules}
                    />
                  )
                }
              }
            ]}
            data={allClients.edges}
            options={{
              customToolbar: () =>
                currentEmployee.privilegesModules
                  .find(({ module }) => module === "client")
                  .privileges.includes("INSERT") && <CustomToolbarClients />,
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
                  noMatch: "No se ha registrado a ningún cliente..."
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
        </React.Fragment>
      );
    }}
  </Query>
);
