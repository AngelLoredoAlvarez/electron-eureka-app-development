import React, { useState } from "react";
import { IconButton, Tooltip } from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import { CustomDialog } from "../../components/CustomDialog";
import gql from "graphql-tag";
import { Mutation, Query } from "react-apollo";
import { MODIFY_CLIENT_CONTRACT_TYPE } from "../../graphql/mutations/ModifyClientContractType";
import { CLIENT_CONTRACT_TYPE_FIELDS } from "../../graphql/fragments/ClientContractTypeFields";
import { LoadingProgressSpinner } from "../../components/LoadingProgressSpinner";
import { ClientContractTypeForm } from "../../forms/ClientContractTypeForm";
import { NetworkError } from "../../components/NetworkError";
import { GraphQLError } from "../../components/GraphQLError";

const CLIENT_CONTRACT_TYPE_BY_ID_QUERY = gql`
  query($id: Int!) {
    clientContractTypeById(id: $id) {
      ...ClientContractTypeFields
    }
  }
  ${CLIENT_CONTRACT_TYPE_FIELDS}
`;

export const ModifyClientContractTypeView = ({ id }) => {
  const [isOpen, setModifyClientContractTypeIsOpen] = useState(false);

  return (
    <React.Fragment>
      <Tooltip title="Modificar Tipo de Contrato">
        <IconButton
          onClick={() =>
            setModifyClientContractTypeIsOpen(prevState => !prevState)
          }
        >
          <Edit />
        </IconButton>
      </Tooltip>
      {isOpen && (
        <CustomDialog
          isOpen={isOpen}
          maxWidth="sm"
          title="Modificar Tipo de Contracto"
        >
          <Query query={CLIENT_CONTRACT_TYPE_BY_ID_QUERY} variables={{ id }}>
            {({ data: { clientContractTypeById }, loading }) => {
              if (loading) return <LoadingProgressSpinner />;

              return (
                <Mutation
                  mutation={MODIFY_CLIENT_CONTRACT_TYPE}
                  onCompleted={() =>
                    setModifyClientContractTypeIsOpen(prevState => !prevState)
                  }
                >
                  {(modifyClientContractType, { error, loading }) => {
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

                        <ClientContractTypeForm
                          action={modifyClientContractType}
                          {...clientContractTypeById}
                          id={id}
                          onClose={() =>
                            setModifyClientContractTypeIsOpen(
                              prevState => !prevState
                            )
                          }
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
};
