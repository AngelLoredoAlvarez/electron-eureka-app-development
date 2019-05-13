import React from "react";
import { IconButton, Tooltip } from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import { CustomDialog } from "../../components/CustomDialog";
import { RoleForm } from "../../forms/RoleForm";
import gql from "graphql-tag";
import { Mutation, Query } from "react-apollo";
import { ROLE_BY_NAME } from "../../graphql/queries/RoleByName";
import { MODIFY_ROLE } from "../../graphql/mutations/ModifyRole";
import { ALL_ROLES } from "../../graphql/fragments/AllRoles";
import { LoadingProgressSpinner } from "../../components/LoadingProgressSpinner";
import { NetworkError } from "../../components/NetworkError";
import { GraphQLError } from "../../components/GraphQLError";

export class ModifyRoleView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modifyRoleViewDialogState: false
    };
  }

  handleModifyRoleViewDialogState = () => {
    this.setState(state => ({
      modifyRoleViewDialogState: !state.modifyRoleViewDialogState
    }));
  };

  render() {
    return (
      <React.Fragment>
        <Tooltip title="Modificar Rol">
          <IconButton onClick={this.handleModifyRoleViewDialogState}>
            <Edit />
          </IconButton>
        </Tooltip>
        {this.state.modifyRoleViewDialogState && (
          <CustomDialog
            isOpen={this.state.modifyRoleViewDialogState}
            maxWidth="sm"
            title="Modificar Rol"
          >
            <Query
              query={ROLE_BY_NAME}
              variables={{ roleName: this.props.role }}
            >
              {({ data: { roleByName }, loading }) => {
                if (loading) return <LoadingProgressSpinner />;

                return (
                  <Mutation
                    mutation={MODIFY_ROLE}
                    onCompleted={this.handleModifyRoleViewDialogState}
                    refetchQueries={[
                      {
                        query: gql`
                          query {
                            allRoles {
                              ...AllRoles
                            }
                          }
                          ${ALL_ROLES}
                        `
                      },
                      {
                        query: ROLE_BY_NAME,
                        variables: { roleName: this.props.role }
                      }
                    ]}
                  >
                    {(modifyRole, { error, loading }) => {
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

                          <RoleForm
                            action={modifyRole}
                            role={
                              roleByName.roleName
                                .replace("eureka_", "")
                                .charAt(0)
                                .toUpperCase() + this.props.role.slice(8)
                            }
                            addModifyClient={roleByName.privileges
                              .find(({ module }) => module === "client")
                              .privileges.includes("INSERT")}
                            deleteClient={roleByName.privileges
                              .find(({ module }) => module === "client")
                              .privileges.includes("DELETE")}
                            addModifyEmployee={roleByName.privileges
                              .find(({ module }) => module === "employee")
                              .privileges.includes("INSERT")}
                            deleteEmployee={roleByName.privileges
                              .find(({ module }) => module === "employee")
                              .privileges.includes("DELETE")}
                            onClose={this.handleModifyRoleViewDialogState}
                          />
                        </React.Fragment>
                      );
                    }}
                  </Mutation>
                );
              }}
            </Query>
          </CustomDialog>
        )}
      </React.Fragment>
    );
  }
}
