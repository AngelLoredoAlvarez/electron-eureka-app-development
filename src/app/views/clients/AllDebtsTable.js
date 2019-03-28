import React from "react";
import { Query } from "react-apollo";
import { ALL_CLIENTS_DEBTS } from "../../graphql/queries/AllClientsDebts";
import { LoadingProgressSpinner } from "../../components/LoadingProgressSpinner";
import { GraphQLError } from "../../components/GraphQLError";
import { NetworkError } from "../../components/NetworkError";
import MaterialDatatable from "material-datatable";
import { CollectContractDebt } from "./CollectContractDebt";

export const AllDebtsTable = () => (
  <Query query={ALL_CLIENTS_DEBTS}>
    {({ data: { allClientsDebts }, error, loading }) => {
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
                field: "idContract",
                options: {
                  customBodyRender: value => (
                    <CollectContractDebt
                      client={value.node.contract.client.fullName}
                      idClient={value.node.contract.client.id}
                      dateOfDebt={value.node.date}
                      idContract={value.node.idContract}
                    />
                  )
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
                  noMatch: "No se ha registrado ningun adeudo..."
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
