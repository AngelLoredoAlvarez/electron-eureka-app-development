import React from "react";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  IconButton,
  Tooltip
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { CustomDialog } from "../../components/CustomDialog";
import gql from "graphql-tag";
import { ALL_ROLES } from "../../graphql/fragments/AllRoles";
import { Mutation } from "react-apollo";
import { DELETE_ROLE } from "../../graphql/mutations/DeleteRole";
import { LoadingProgressSpinner } from "../../components/LoadingProgressSpinner";
import { NetworkError } from "../../components/NetworkError";
import { GraphQLError } from "../../components/GraphQLError";

export class DeleteRoleView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      deleteRoleViewDialogState: false
    };
  }

  handleDeleteRoleViewDialogState = () => {
    this.setState(state => ({
      deleteRoleViewDialogState: !state.deleteRoleViewDialogState
    }));
  };

  render() {
    return (
      <React.Fragment>
        <Tooltip title="Eliminar Rol">
          <IconButton onClick={this.handleDeleteRoleViewDialogState}>
            <Delete />
          </IconButton>
        </Tooltip>
        {this.state.deleteRoleViewDialogState && (
          <CustomDialog
            isOpen={this.state.deleteRoleViewDialogState}
            maxWidth="sm"
            title="Eliminar Rol"
          >
            <DialogContent>
              <Mutation
                mutation={DELETE_ROLE}
                update={(cache, { data: { deleteRole } }) => {
                  const ALL_ROLES_QUERY = gql`
                    query {
                      allRoles {
                        ...AllRoles
                      }
                    }
                    ${ALL_ROLES}
                  `;

                  let { allRoles } = cache.readQuery({
                    query: ALL_ROLES_QUERY
                  });

                  allRoles.edges = allRoles.edges.filter(
                    ({ node }) => node !== deleteRole.string
                  );

                  cache.writeQuery({
                    query: ALL_ROLES_QUERY,
                    data: {
                      allRoles: {
                        ...allRoles,
                        allRoles
                      }
                    }
                  });

                  return null;
                }}
                variables={{ roleInput: { roleName: this.props.role } }}
              >
                {(deleteRole, { error, loading }) => {
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

                      <DialogContentText>
                        ¿Estas seguro de eliminar el rol{" "}
                        {this.props.role
                          .replace("eureka_", "")
                          .charAt(0)
                          .toUpperCase() + this.props.role.slice(8)}
                        ?
                      </DialogContentText>
                      <DialogActions>
                        <Button
                          color="primary"
                          onClick={deleteRole}
                          variant="contained"
                        >
                          Sí
                        </Button>
                        <Button
                          color="secondary"
                          onClick={this.handleDeleteRoleViewDialogState}
                          variant="contained"
                        >
                          No
                        </Button>
                      </DialogActions>
                    </React.Fragment>
                  );
                }}
              </Mutation>
            </DialogContent>
          </CustomDialog>
        )}
      </React.Fragment>
    );
  }
}
