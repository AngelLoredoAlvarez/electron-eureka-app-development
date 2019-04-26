import React from "react";
import gql from "graphql-tag";
import { Mutation, Query } from "react-apollo";
import { CustomDialog } from "../../components/CustomDialog";
import { EmployeeForm } from "../../forms/EmployeeForm";
import { ALL_TOWNS } from "../../graphql/fragments/AllTowns";
import { ALL_TOWNSHIPS } from "../../graphql/fragments/AllTownships";
import { ALL_STREETS } from "../../graphql/fragments/AllStreets";
import { EMPLOYEE_APP_DATA } from "../../graphql/fragments/EmployeeAppData";
import { EMPLOYEE_FIELDS } from "../../graphql/fragments/EmployeeFields";
import { MODIFY_EMPLOYEE } from "../../graphql/mutations/ModifyEmployee";
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
        nodeId
      }
    }
    currentEmployee {
      ...EmployeeAppData
    }
  }
  ${ALL_TOWNS}
  ${ALL_TOWNSHIPS}
  ${ALL_STREETS}
  ${EMPLOYEE_FIELDS}
  ${EMPLOYEE_APP_DATA}
`;

export const ModifyEmployeeView = ({ id, isOpen, onClose }) => (
  <CustomDialog isOpen={isOpen} maxWidth="md" title="Modificar Empleado">
    <Query
      query={ALL_TOWNS_TOWNSHIPS_STREETS_EMPLOYEE_QUERY}
      variables={{ id }}
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
          <Mutation mutation={MODIFY_EMPLOYEE} onCompleted={onClose}>
            {(modifyEmployee, { error, loading }) => {
              if (loading) return <LoadingProgressSpinner />;

              return (
                <React.Fragment>
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
                </React.Fragment>
              );
            }}
          </Mutation>
        );
      }}
    </Query>
  </CustomDialog>
);
