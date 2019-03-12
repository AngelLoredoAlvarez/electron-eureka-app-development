import React from "react";
import MaterialDatatable from "material-datatable";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { ALL_EMPLOYEES } from "../../graphql/fragments/AllEmployees";
import { EMPLOYEE_APP_DATA } from "../../graphql/fragments/EmployeeAppData";
import { EMPLOYEE_PRIVILEGES } from "../../graphql/fragments/EmployeePrivileges";
import { LoadingProgressSpinner } from "../../components/LoadingProgressSpinner";
import { CustomToolbarEmployees } from "./CustomToolbarEmployees";
import { MoreEmployeeOptions } from "./MoreEmployeeOptions";

export const ALL_EMPLOYEES_QUERY = gql`
  query {
    allEmployees(orderBy: CREATED_AT_DESC) {
      ...AllEmployees
    }
    currentEmployee {
      ...EmployeeAppData
      ...EmployeePrivileges
      employeeUser {
        role
      }
    }
  }
  ${ALL_EMPLOYEES}
  ${EMPLOYEE_APP_DATA}
  ${EMPLOYEE_PRIVILEGES}
`;

export const AllEmployeesTable = () => (
  <Query query={ALL_EMPLOYEES_QUERY}>
    {({ data: { allEmployees, currentEmployee }, loading }) => {
      if (loading) return <LoadingProgressSpinner />;

      return (
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
                  <MoreEmployeeOptions
                    id={value.node.id}
                    idCurrentEmployee={currentEmployee.employee.id}
                    roleCurrentEmployee={currentEmployee.employeeUser.role}
                    privilegesModules={currentEmployee.privilegesModules}
                  />
                ),
                display:
                  currentEmployee.privilegesModules
                    .find(({ module }) => module === "employee")
                    .privileges.includes("UPDATE") ||
                  currentEmployee.privilegesModules
                    .find(({ module }) => module === "employee")
                    .privileges.includes("DELETE")
                    ? "true"
                    : "false"
              }
            }
          ]}
          data={allEmployees.edges}
          options={{
            customToolbar: () =>
              currentEmployee.privilegesModules
                .find(({ module }) => module === "employee")
                .privileges.includes("INSERT") && <CustomToolbarEmployees />,
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
                noMatch: "No se ha registrado a ningún empleado..."
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
