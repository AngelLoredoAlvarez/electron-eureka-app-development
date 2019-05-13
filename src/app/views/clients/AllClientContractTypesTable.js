import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { ALL_CLIENT_CONTRACT_TYPES } from "../../graphql/fragments/AllClientContractTypes";
import { EMPLOYEE_PRIVILEGES } from "../../graphql/fragments/EmployeePrivileges";
import { LoadingProgressSpinner } from "../../components/LoadingProgressSpinner";
import { NetworkError } from "../../components/NetworkError";
import { GraphQLError } from "../../components/GraphQLError";
import MaterialDatatable from "material-datatable";
import { CustomToolbarClientContractTypes } from "./CustomToolbarClientContractTypes";
import { Grid } from "@material-ui/core";
import { ModifyClientContractTypeView } from "./ModifyClientContractTypeView";
import { DeleteClientContractTypeView } from "./DeleteClientContractTypeView";

const ALL_CLIENT_CONTRACT_TYPES_QUERY = gql`
  query {
    allClientContractTypes(orderBy: ID_DESC) {
      ...AllClientContractTypes
    }
    currentEmployee {
      ...EmployeePrivileges
    }
  }
  ${ALL_CLIENT_CONTRACT_TYPES}
  ${EMPLOYEE_PRIVILEGES}
`;

export const AllClientContractTypesTable = () => (
  <Query query={ALL_CLIENT_CONTRACT_TYPES_QUERY}>
    {({
      data: { allClientContractTypes, currentEmployee },
      error,
      loading
    }) => {
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
                field: "typeName",
                options: {
                  customBodyRender: value => `${value.node.typeName}`
                }
              },
              {
                name: "Precio Por Mes",
                field: "monthPrice",
                options: {
                  customBodyRender: value => `$${value.node.monthPrice}`
                }
              },
              {
                name: "Opciones",
                field: "id",
                options: {
                  customBodyRender: value => (
                    <Grid container={true} direction="row" spacing={8}>
                      <Grid item={true} xs={6}>
                        <ModifyClientContractTypeView id={value.node.id} />
                      </Grid>
                      <Grid item={true} xs={6}>
                        <DeleteClientContractTypeView
                          id={value.node.id}
                          typeName={value.node.typeName}
                        />
                      </Grid>
                    </Grid>
                  ),
                  width: 100,
                  display:
                    currentEmployee.privilegesModules
                      .find(({ module }) => module === "client_contract_type")
                      .privileges.includes("UPDATE") ||
                    currentEmployee.privilegesModules
                      .find(({ module }) => module === "client_contract_type")
                      .privileges.includes("DELETE")
                      ? "true"
                      : "false"
                }
              }
            ]}
            data={allClientContractTypes.edges}
            options={{
              customToolbar: () =>
                currentEmployee.privilegesModules
                  .find(({ module }) => module === "client_contract_type")
                  .privileges.includes("INSERT") && (
                  <CustomToolbarClientContractTypes />
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
                  noMatch: "No se ha registrado a ningún tipo de contrato..."
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
