import React, { useState } from "react";
import { IconButton, Tooltip } from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import { CustomDialog } from "../../components/CustomDialog";
import gql from "graphql-tag";
import { Mutation, Query } from "react-apollo";
import { CLIENT_CONTRACT_TYPE_FIELDS } from "../../graphql/fragments/ClientContractTypeFields";
import { LoadingProgressSpinner } from "../../components/LoadingProgressSpinner";
import { ClientContractTypeForm } from "../../forms/ClientContractTypeForm";

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
                <ClientContractTypeForm
                  {...clientContractTypeById}
                  id={id}
                  onClose={() =>
                    setModifyClientContractTypeIsOpen(prevState => !prevState)
                  }
                />
              );
            }}
          </Query>
        </CustomDialog>
      )}
    </React.Fragment>
  );
};
