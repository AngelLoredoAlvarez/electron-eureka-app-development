import React from "react";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText
} from "@material-ui/core";
import gql from "graphql-tag";
import { Mutation, Query } from "react-apollo";
import { EMPLOYEE_FIELDS } from "../../graphql/fragments/EmployeeFields";
import { DELETE_EMPLOYEE } from "../../graphql/mutations/DeleteEmployee";
import { ALL_EMPLOYEES } from "../../graphql/fragments/AllEmployees";
import { CustomDialog } from "../../components/CustomDialog";
import { LoadingProgressSpinner } from "../../components/LoadingProgressSpinner";

const EMPLOYEE_BY_ID_QUERY = gql`
  query($id: Int!) {
    employeeById(id: $id) {
      employee {
        ...EmployeeFields
      }
    }
  }
  ${EMPLOYEE_FIELDS}
`;

export const DeleteEmployeeView = ({ id, isOpen, onClose }) => (
  <CustomDialog isOpen={isOpen} title="¿Eliminar Empleado?">
    <Query query={EMPLOYEE_BY_ID_QUERY} variables={{ id }}>
      {({ data, loading }) => {
        if (loading) return <LoadingProgressSpinner />;

        return (
          <Mutation
            mutation={DELETE_EMPLOYEE}
            onCompleted={onClose}
            update={(cache, { data: { deleteEmployee } }) => {
              const ALL_EMPLOYEES_QUERY = gql`
                query {
                  allEmployees(orderBy: CREATED_AT_DESC) {
                    ...AllEmployees
                  }
                }
                ${ALL_EMPLOYEES}
              `;

              let { allEmployees } = cache.readQuery({
                query: ALL_EMPLOYEES_QUERY
              });

              allEmployees.edges = allEmployees.edges.filter(
                ({ node }) => node.nodeId !== deleteEmployee.employee.nodeId
              );

              cache.writeQuery({
                query: ALL_EMPLOYEES_QUERY,
                data: {
                  allEmployees: {
                    ...allEmployees,
                    allEmployees
                  }
                }
              });

              return null;
            }}
            variables={{ employeeInput: { id } }}
          >
            {(deleteEmployee, { loading }) => {
              if (loading) return <LoadingProgressSpinner />;

              return (
                <DialogContent>
                  <DialogContentText>
                    ¿Está seguro de eliminar al Empleado{" "}
                    {data.employeeById.employee.name}{" "}
                    {data.employeeById.employee.firstName}{" "}
                    {data.employeeById.employee.lastName}? (Se eliminara toda
                    información personal asociada a este empleado)
                  </DialogContentText>
                  <DialogActions>
                    <Button
                      color="primary"
                      onClick={deleteEmployee}
                      variant="contained"
                    >
                      Sí
                    </Button>
                    <Button
                      color="secondary"
                      onClick={onClose}
                      variant="contained"
                    >
                      No
                    </Button>
                  </DialogActions>
                </DialogContent>
              );
            }}
          </Mutation>
        );
      }}
    </Query>
  </CustomDialog>
);
