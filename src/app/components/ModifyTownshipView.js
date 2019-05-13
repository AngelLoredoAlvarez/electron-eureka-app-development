import React from "react";
import { CustomDialog } from "./CustomDialog";
import { TownshipForm } from "../forms/TownshipForm";
import { Mutation, Query } from "react-apollo";
import { TOWNSHIP_BY_ID } from "../graphql/queries/TownshipById";
import { MODIFY_TOWNSHIP } from "../graphql/mutations/ModifyTownship";
import { LoadingProgressSpinner } from "./LoadingProgressSpinner";
import { NetworkError } from "./NetworkError";
import { GraphQLError } from "./GraphQLError";

export const ModifyTownshipView = ({
  idTownship,
  isOpen,
  onClose,
  setSelection
}) => (
  <CustomDialog isOpen={isOpen} maxWidth="sm" title="Modificar Asentamiento">
    <Query query={TOWNSHIP_BY_ID} variables={{ idTownship }}>
      {({ data: { townshipById }, loading }) => {
        if (loading) return <LoadingProgressSpinner />;

        return (
          <Mutation
            mutation={MODIFY_TOWNSHIP}
            onCompleted={data => {
              setSelection({
                label: data.modifyTownship.township.township,
                value: data.modifyTownship.township.id
              });

              onClose();
            }}
          >
            {(modifyTownship, { error, loading }) => {
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

                  <TownshipForm
                    action={modifyTownship}
                    {...townshipById}
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
