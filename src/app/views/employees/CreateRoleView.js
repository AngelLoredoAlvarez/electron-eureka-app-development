import React from "react";
import { CustomDialog } from "../../components/CustomDialog";
import { RoleForm } from "../../forms/RoleForm";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { CREATE_ROLE } from "../../graphql/mutations/CreateRole";
import { LoadingProgressSpinner } from "../../components/LoadingProgressSpinner";
import { GraphQLError } from "../../components/GraphQLError";
import { NetworkError } from "../../components/NetworkError";

export const CreateRoleView = ({ isOpen, maxWidth, onClose, title }) => (
  <CustomDialog isOpen={isOpen} maxWidth={maxWidth} title={title}>
    <Mutation
      mutation={CREATE_ROLE}
      onCompleted={onClose}
      update={(
        cache,
        {
          data: {
            createRole: { string }
          }
        }
      ) => {
        const ALL_ROLES_QUERY = gql`
          query {
            allRoles {
              edges {
                node
              }
            }
          }
        `;

        const { allRoles } = cache.readQuery({ query: ALL_ROLES_QUERY });

        allRoles.edges.unshift({
          node: string,
          __typename: "AllRoleEdge"
        });

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
    >
      {(createRole, { loading, error }) => {
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

            <RoleForm action={createRole} onClose={onClose} />
          </React.Fragment>
        );
      }}
    </Mutation>
  </CustomDialog>
);
