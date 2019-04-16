import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { LoadingProgressSpinner } from "../../components/LoadingProgressSpinner";
import { GraphQLError } from "../../components/GraphQLError";
import { NetworkError } from "../../components/NetworkError";
import { AppBarMainView } from "./AppBarMainView";
import { DrawerMainView } from "./DrawerMainView";
import { ALL_CONTRACTS_TO_PAY } from "../../graphql/fragments/AllContractsToPay";
import { AllContractsToPayTable } from "./AllContractsToPayTable";
import { AllDebtsView } from "../clients/AllDebtsView";
import { AllClientsView } from "../clients/AllClientsView";
import { AllEmployeesView } from "../employees/AllEmployeesView";

const CURRENT_EMPLOYEE_ALL_CONTRACTS_TO_PAY = gql`
  query {
    currentEmployee {
      ...EmployeeAppData
      ...EmployeePrivileges
    }
    allContractsToPay {
      ...AllContractsToPay
    }
  }
  ${AppBarMainView.fragments.EmployeeAppData}
  ${AppBarMainView.fragments.EmployeePrivileges}
  ${ALL_CONTRACTS_TO_PAY}
`;

export const MainView = () => (
  <Query query={CURRENT_EMPLOYEE_ALL_CONTRACTS_TO_PAY}>
    {({ data: { currentEmployee, allContractsToPay }, error, loading }) => {
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

          <AppBarMainView
            employeeFullName={currentEmployee.employee.fullName}
          />
          <DrawerMainView />

          <AllContractsToPayTable allContractsToPay={allContractsToPay} />

          <AllDebtsView />

          <AllClientsView />

          <AllEmployeesView />
        </React.Fragment>
      );
    }}
  </Query>
);
