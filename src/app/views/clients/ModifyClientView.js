import React from "react";
import { CustomDialog } from "../../components/CustomDialog";
import { ClientForm } from "../../forms/ClientForm";
import gql from "graphql-tag";
import { Mutation, Query } from "react-apollo";
import { ALL_TOWNS } from "../../graphql/fragments/AllTowns";
import { ALL_TOWNSHIPS } from "../../graphql/fragments/AllTownships";
import { ALL_STREETS } from "../../graphql/fragments/AllStreets";
import { CLIENT_FIELDS } from "../../graphql/fragments/ClientFields";
import { MODIFY_CLIENT } from "../../graphql/mutations/ModifyClient";
import { LoadingProgressSpinner } from "../../components/LoadingProgressSpinner";
import { NetworkError } from "../../components/NetworkError";
import { GraphQLError } from "../../components/GraphQLError";

const ALL_TOWNS_TOWNSHIPS_STREETS_CLIENT_QUERY = gql`
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
    clientById(id: $id) {
      ...ClientFields
    }
  }
  ${ALL_TOWNS}
  ${ALL_TOWNSHIPS}
  ${ALL_STREETS}
  ${CLIENT_FIELDS}
`;

export const ModifyClientView = ({
  handleModifyClientViewDialogState,
  id,
  isOpen
}) => (
  <CustomDialog isOpen={isOpen} maxWidth="md" title="Modificar Cliente">
    <Query query={ALL_TOWNS_TOWNSHIPS_STREETS_CLIENT_QUERY} variables={{ id }}>
      {({
        data: { allTowns, allTownships, allStreets, clientById },
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

        return (
          <Mutation
            mutation={MODIFY_CLIENT}
            onCompleted={handleModifyClientViewDialogState}
          >
            {(modifyClient, { error, loading }) => {
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

                  <ClientForm
                    action={modifyClient}
                    allTownsSuggestions={allTownsSuggestions}
                    allTownshipsSuggestions={allTownshipsSuggestions}
                    allStreetsSuggestions={allStreetsSuggestions}
                    {...clientById}
                    id={id}
                    onClose={handleModifyClientViewDialogState}
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
