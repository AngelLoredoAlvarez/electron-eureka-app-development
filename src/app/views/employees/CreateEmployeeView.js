import React from "react";
import { CustomDialog } from "../../components/CustomDialog";
import gql from "graphql-tag";
import { Mutation, Query } from "react-apollo";
import { ALL_TOWNS } from "../../graphql/fragments/AllTowns";
import { ALL_TOWNSHIPS } from "../../graphql/fragments/AllTownships";
import { ALL_STREETS } from "../../graphql/fragments/AllStreets";
import { CREATE_EMPLOYEE } from "../../graphql/mutations/CreateEmployee";
import { ALL_EMPLOYEES } from "../../graphql/fragments/AllEmployees";
import { EmployeeForm } from "../../forms/EmployeeForm";
import { LoadingProgressSpinner } from "../../components/LoadingProgressSpinner";
import { NetworkError } from "../../components/NetworkError";
import { GraphQLError } from "../../components/GraphQLError";

const ALL_TOWNS_TOWNSHIPS_STREETS_QUERY = gql`
  query {
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
`;

export const CreateEmployeeView = ({ isOpen, maxWidth, onClose, title }) => (
  <CustomDialog isOpen={isOpen} maxWidth={maxWidth} title={title}>
    <Query query={ALL_TOWNS_TOWNSHIPS_STREETS_QUERY}>
      {({
        data: { allTowns, allTownships, allStreets, allRoles, currentEmployee },
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

        const allRolesSuggestions = allRoles.edges
          .filter(({ node }) => node !== "eureka_administrador")
          .map(({ node }) => ({
            label:
              node
                .replace("eureka_", "")
                .charAt(0)
                .toUpperCase() + node.slice(8),
            value: node
          }));

        let isAdmin = false;
        if (currentEmployee.employeeUser.role === "eureka_administrador") {
          isAdmin = true;
        }

        return (
          <Mutation
            mutation={CREATE_EMPLOYEE}
            onCompleted={onClose}
            update={(
              cache,
              {
                data: {
                  createEmployee: { employee }
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

              allEmployees.edges.unshift({
                node: {
                  ...employee
                },
                __typename: "EmployeesEdge"
              });

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
          >
            {(createEmployee, { error, loading }) => {
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
                    action={createEmployee}
                    allTownsSuggestions={allTownsSuggestions}
                    allTownshipsSuggestions={allTownshipsSuggestions}
                    allStreetsSuggestions={allStreetsSuggestions}
                    allRolesSuggestions={allRolesSuggestions}
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
