import React from "react";
import { IconButton, Tooltip } from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import { CustomDialog } from "../../components/CustomDialog";
import { RoleForm } from "../../forms/RoleForm";
import { Mutation, Query } from "react-apollo";
import { ROLE_BY_NAME } from "../../graphql/queries/RoleByName";
import { MODIFY_ROLE } from "../../graphql/mutations/ModifyRole";
import { LoadingProgressSpinner } from "../../components/LoadingProgressSpinner";

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
                    update={(
                      cache,
                      {
                        data: {
                          modifyRole: { privilegesModules }
                        }
                      }
                    ) => {
                      let { roleByName } = cache.readQuery({
                        query: ROLE_BY_NAME,
                        variables: { roleName: this.props.role }
                      });

                      roleByName.edges = privilegesModules.map(
                        ({ module, privileges }) => ({
                          node: {
                            module,
                            privileges,
                            __typename: "PrivilegesModule"
                          },
                          __typename: "PrivilegesModulesEdge"
                        })
                      );

                      cache.writeQuery({
                        query: ROLE_BY_NAME,
                        variables: { roleName: this.props.role },
                        data: {
                          roleByName: {
                            ...roleByName,
                            roleByName
                          }
                        }
                      });

                      return null;
                    }}
                  >
                    {(modifyRole, { loading }) => {
                      if (loading) return <LoadingProgressSpinner />;

                      return (
                        <RoleForm
                          action={modifyRole}
                          role={
                            this.props.role
                              .replace("eureka_", "")
                              .charAt(0)
                              .toUpperCase() + this.props.role.slice(8)
                          }
                          addModifyClient={roleByName.edges
                            .find(({ node }) => node.module === "client")
                            .node.privileges.includes("INSERT")}
                          deleteClient={roleByName.edges
                            .find(({ node }) => node.module === "client")
                            .node.privileges.includes("DELETE")}
                          addModifyEmployee={roleByName.edges
                            .find(({ node }) => node.module === "employee")
                            .node.privileges.includes("INSERT")}
                          deleteEmployee={roleByName.edges
                            .find(({ node }) => node.module === "client")
                            .node.privileges.includes("DELETE")}
                          onClose={this.handleModifyRoleViewDialogState}
                        />
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
