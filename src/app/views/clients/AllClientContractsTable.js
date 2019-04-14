import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { ALL_CLIENT_CONTRACTS } from "../../graphql/fragments/AllClientContracts";
import { EMPLOYEE_PRIVILEGES } from "../../graphql/fragments/EmployeePrivileges";
import { LoadingProgressSpinner } from "../../components/LoadingProgressSpinner";
import MaterialDatatable from "material-datatable";
import { CustomToolbarClientContracts } from "./CustomToolbarClientContracts";
import { MoreClientContractOptions } from "./MoreClientContractOptions";

const ALL_CLIENT_CONTRACTS_QUERY = gql`
  query($idClient: Int!) {
    allClientContracts(idClient: $idClient) {
      ...AllClientContracts
    }
    currentEmployee {
      ...EmployeePrivileges
    }
  }
  ${ALL_CLIENT_CONTRACTS}
  ${EMPLOYEE_PRIVILEGES}
`;

export const AllClientsContractsTable = ({ idClient }) => (
  <Query query={ALL_CLIENT_CONTRACTS_QUERY} variables={{ idClient }}>
    {({ data: { allClientContracts, currentEmployee }, loading }) => {
      if (loading) return <LoadingProgressSpinner />;

      return (
        <MaterialDatatable
          columns={[
            {
              name: "No.",
              field: "id",
              options: {
                customBodyRender: value => `${value.node.id}`
              }
            },
            {
              name: "Nombre del Negocio",
              field: "business",
              options: {
                customBodyRender: value => `${value.node.business}`
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
              field: "typeName",
              options: {
                customBodyRender: value => value.node.typeContract.typeName
              }
            },
            {
              name: "Estado",
              field: "status",
              options: {
                customBodyRender: value => value.node.status
              }
            },
            {
              name: "Opciones",
              field: "id",
              options: {
                customBodyRender: value => (
                  <MoreClientContractOptions
                    idClient={idClient}
                    idContract={value.node.id}
                    status={value.node.status}
                    typeContract={value.node.typeContract}
                  />
                )
              }
            }
          ]}
          data={allClientContracts.edges}
          options={{
            customToolbar: () =>
              currentEmployee.privilegesModules
                .find(({ module }) => module === "client_contract")
                .privileges.includes("INSERT") && (
                <CustomToolbarClientContracts idClient={idClient} />
              ),
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
                noMatch:
                  "No se ha registrado ningún contrato para este cliente..."
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
