import React from "react";
import gql from "graphql-tag";
import { Mutation, Query } from "react-apollo";
import { CustomDialog } from "../../components/CustomDialog";
import { EmployeeForm } from "../../forms/EmployeeForm";
import { ALL_TOWNS } from "../../graphql/fragments/AllTowns";
import { ALL_TOWNSHIPS } from "../../graphql/fragments/AllTownships";
import { ALL_STREETS } from "../../graphql/fragments/AllStreets";
import { EMPLOYEE_FIELDS } from "../../graphql/fragments/EmployeeFields";
import { MODIFY_EMPLOYEE } from "../../graphql/mutations/ModifyEmployee";
import { ALL_EMPLOYEES } from "../../graphql/fragments/AllEmployees";
import { LoadingProgressSpinner } from "../../components/LoadingProgressSpinner";
import { NetworkError } from "../../components/NetworkError";
import { GraphQLError } from "../../components/GraphQLError";

const ALL_TOWNS_TOWNSHIPS_STREETS_EMPLOYEE_QUERY = gql`
  query($id: Int!) {
    allTowns {
      ...AllTowns
    }
    allTownships {
      ...AllTownships
    }
    allStreets {
      ...AllStreets
    }
    allRoles {
      edges {
        node
      }
    }
    employeeById(id: $id) {
      employee {
        ...EmployeeFields
      }
      employeeUser {
        username
        role
      }
    }
    currentEmployee {
      employee {
        id
      }
      employeeUser {
        role
      }
    }
  }
  ${ALL_TOWNS}
  ${ALL_TOWNSHIPS}
  ${ALL_STREETS}
  ${EMPLOYEE_FIELDS}
`;

export const ModifyEmployeeView = ({ id, isOpen, onClose }) => (
  <CustomDialog isOpen={isOpen} maxWidth="md" title="Modificar Empleado">
    <Query
      query={ALL_TOWNS_TOWNSHIPS_STREETS_EMPLOYEE_QUERY}
      variables={{ id: id }}
    >
      {({
        data: {
          allTowns,
          allTownships,
          allStreets,
          allRoles,
          employeeById,
          currentEmployee
        },
        loading
      }) => {
        if (loading) return <LoadingProgressSpinner />;

        const allTownsSuggestions = allTowns.edges.map(({ node }) => ({
          label: node.town,
          value: node.id
        }));

        const allTownshipsSuggestions = allTownships.edges.map(({ node }) => ({
          label: node.township,
          link: node.idTown,
          value: node.id
        }));

        const allStreetsSuggestions = allStreets.edges.map(({ node }) => ({
          label: node.street,
          link: node.idTownship,
          value: node.id
        }));

        let allRolesSuggestions,
          disableAdmin = false,
          disableRole = false,
          isAdmin = false;

        if (currentEmployee.employeeUser.role === "eureka_administrador") {
          isAdmin = true;

          if (employeeById.employee.id === currentEmployee.employee.id) {
            disableRole = true;

            allRolesSuggestions = allRoles.edges.map(({ node }) => ({
              label:
                node
                  .replace("eureka_", "")
                  .charAt(0)
                  .toUpperCase() + node.slice(8),
              value: node
            }));
          } else {
            allRolesSuggestions = allRoles.edges
              .filter(({ node }) => node !== "eureka_administrador")
              .map(({ node }) => ({
                label:
                  node
                    .replace("eureka_", "")
                    .charAt(0)
                    .toUpperCase() + node.slice(8),
                value: node
              }));
          }
        } else {
          if (employeeById.employee.id === currentEmployee.employee.id) {
            disableRole = true;

            allRolesSuggestions = allRoles.edges.map(({ node }) => ({
              label:
                node
                  .replace("eureka_", "")
                  .charAt(0)
                  .toUpperCase() + node.slice(8),
              value: node
            }));
          } else if (
            employeeById.employeeUser.role === "eureka_administrador"
          ) {
            disableAdmin = true;
            disableRole = true;

            allRolesSuggestions = allRoles.edges.map(({ node }) => ({
              label:
                node
                  .replace("eureka_", "")
                  .charAt(0)
                  .toUpperCase() + node.slice(8),
              value: node
            }));
          } else {
            allRolesSuggestions = allRoles.edges
              .filter(({ node }) => node !== "eureka_administrador")
              .map(({ node }) => ({
                label:
                  node
                    .replace("eureka_", "")
                    .charAt(0)
                    .toUpperCase() + node.slice(8),
                value: node
              }));
          }
        }

        return (
          <Mutation
            mutation={MODIFY_EMPLOYEE}
            onCompleted={onClose}
            update={(
              cache,
              {
                data: {
                  modifyEmployee: {
                    selectedEmployee: { employee, employeeUser }
                  }
                }
              }
            ) => {
              const ALL_EMPLOYEES_QUERY = gql`
                query {
                  allEmployees(orderBy: CREATED_AT_DESC) {
                    ...AllEmployees
                  }
                }
                ${ALL_EMPLOYEES}
              `;

              const { allEmployees } = cache.readQuery({
                query: ALL_EMPLOYEES_QUERY
              });

              allEmployees.edges.map(({ node }) =>
                node.id === employee.id ? { node: { ...employee } } : node
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

              const EMPLOYEE_BY_ID_QUERY = gql`
                query($id: UUID!) {
                  employeeById(id: $id) {
                    employee {
                      ...EmployeeFields
                    }
                    employeeUser {
                      username
                      role
                    }
                  }
                }
                ${EMPLOYEE_FIELDS}
              `;

              cache.writeQuery({
                query: EMPLOYEE_BY_ID_QUERY,
                variables: { id: id },
                data: {
                  employeeById: {
                    employee: {
                      ...employee,
                      employee
                    },
                    employeeUser: {
                      ...employeeUser,
                      employeeUser
                    },
                    __typename: "SelectedEmployee"
                  }
                }
              });

              return null;
            }}
          >
            {(modifyEmployee, { error, loading }) => {
              if (loading) return <LoadingProgressSpinner />;

              return (
                <div>
                  {error ? (
                    error.networkError ? (
                      <NetworkError
                        isOpen={true}
                        networkError={error.networkError}
                      />
                    ) : error.graphQLErrors ? (
                      <GraphQLError
                        isOpen={true}
                        graphQLErrors={error.graphQLErrors[0]}
                      />
                    ) : null
                  ) : null}

                  <EmployeeForm
                    action={modifyEmployee}
                    allTownsSuggestions={allTownsSuggestions}
                    allTownshipsSuggestions={allTownshipsSuggestions}
                    allStreetsSuggestions={allStreetsSuggestions}
                    allRolesSuggestions={allRolesSuggestions}
                    disableAdmin={disableAdmin}
                    disableRole={disableRole}
                    {...employeeById.employee}
                    {...employeeById.employeeUser}
                    id={id}
                    isAdmin={isAdmin}
                    onClose={onClose}
                  />
                </div>
              );
            }}
          </Mutation>
        );
      }}
    </Query>
  </CustomDialog>
);
