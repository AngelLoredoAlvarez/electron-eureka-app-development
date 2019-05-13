import React from "react";
import { CustomDialog } from "./CustomDialog";
import { TownForm } from "../forms/TownForm";
import { Mutation, Query } from "react-apollo";
import { TOWN_BY_ID } from "../graphql/queries/TownById";
import { MODIFY_TOWN } from "../graphql/mutations/ModifyTown";
import { LoadingProgressSpinner } from "./LoadingProgressSpinner";
import { NetworkError } from "./NetworkError";
import { GraphQLError } from "./GraphQLError";

export const ModifyTownView = ({ idTown, isOpen, onClose, setSelection }) => (
  <CustomDialog isOpen={isOpen} maxWidth="sm" title="Modificar Municipio">
    <Query query={TOWN_BY_ID} variables={{ idTown }}>
      {({ data: { townById }, loading }) => {
        if (loading) return <LoadingProgressSpinner />;

        return (
          <Mutation
            mutation={MODIFY_TOWN}
            onCompleted={data => {
              setSelection({
                label: data.modifyTown.town.town,
                value: data.modifyTown.town.id
              });

              onClose();
            }}
          >
            {(modifyTown, { error, loading }) => {
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

                  <TownForm
                    action={modifyTown}
                    {...townById}
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
