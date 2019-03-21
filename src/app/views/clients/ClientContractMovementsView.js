import React from "react";
import { CustomDialog } from "../../components/CustomDialog";
import { Query } from "react-apollo";
import { ALL_CLIENT_CONTRACT_MOVEMENTS } from "../../graphql/queries/AllClientContractMovements";
import { LoadingProgressSpinner } from "../../components/LoadingProgressSpinner";
import MaterialDatatable from "material-datatable";

export const ClientContractMovementsView = ({
  idContract,
  isOpen,
  onClose
}) => (
  <CustomDialog
    isOpen={isOpen}
    onClose={onClose}
    title="Movimientos del Contrato"
  >
    <Query
      query={ALL_CLIENT_CONTRACT_MOVEMENTS}
      variables={{ idContract: idContract }}
    >
      {({ data: { allClientContractMovements }, loading }) => {
        if (loading) return <LoadingProgressSpinner />;

        return (
          <MaterialDatatable
            columns={[
              {
                name: "Fecha",
                field: "formatedMovementDate",
                options: {
                  customBodyRender: value =>
                    `${value.node.formatedMovementDate}`
                }
              },
              {
                name: "Movimiento",
                field: "movement",
                options: {
                  customBodyRender: value => `${value.node.movement}`
                }
              }
            ]}
            data={allClientContractMovements.edges}
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
                  noMatch:
                    "No se ha registrado ningún movimiento para este contrato..."
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
  </CustomDialog>
);
