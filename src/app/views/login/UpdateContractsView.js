import React, { useEffect } from "react";
import { Mutation } from "react-apollo";
import { AUTHENTICATE } from "../../graphql/mutations/Authenticate";
import { LoadingProgressSpinner } from "../../components/LoadingProgressSpinner";
import { GraphQLError } from "../../components/GraphQLError";
import { NetworkError } from "../../components/NetworkError";
import { Redirect } from "react-router-dom";
import { LoginForm } from "../../forms/LoginForm";
import { LoginFailedView } from "./LoginFailedView";

export const UpdateContractsView = ({ updateContractsStatus }) => {
  useEffect(() => {
    updateContractsStatus({});
  }, []);

  return (
    <Mutation
      mutation={AUTHENTICATE}
      update={(cache, { data }) => {
        if (data) {
          if (data.authenticate.jwtToken === null) {
            cache.writeData({
              data: {
                loginFailedDialogState: {
                  __typename: "LoginFailedDialogState",
                  isOpen: true
                }
              }
            });
          }
        }
      }}
    >
      {(authenticate, { data, error, loading }) => {
        if (data) {
          if (data.authenticate.jwtToken) {
            sessionStorage.setItem("jwtToken", data.authenticate.jwtToken);
            return <Redirect to="/main" />;
          }
        }

        if (loading) return <LoadingProgressSpinner />;

        return (
          <div>
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

            <LoginForm authenticate={authenticate} />
            <LoginFailedView />
          </div>
        );
      }}
    </Mutation>
  );
};
