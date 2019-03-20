import LoginFailedDialogState from "./LoginFailedDialogState";
import DrawerMenuState from "./DrawerMenuState";
import DebtsListDialogState from "./DebtsListDialogState";
import ClientsListDialogState from "./ClientsListDialogState";
import EmployeesListDialogState from "./EmployeesListDialogState";
import CreateClientDialogState from "./CreateClientDialogState";
import CreateClientContractDialogState from "./CreateClientContractDialogState";
import CreateEmployeeDialogState from "./CreateEmployeeDialogState";
import RolesListDialogState from "./RolesListDialogState";
import CreateRoleDialogState from "./CreateRoleDialogState";

export default {
  ...LoginFailedDialogState,
  ...DrawerMenuState,
  ...DebtsListDialogState,
  ...ClientsListDialogState,
  ...EmployeesListDialogState,
  ...CreateClientDialogState,
  ...CreateClientContractDialogState,
  ...CreateEmployeeDialogState,
  ...RolesListDialogState,
  ...CreateRoleDialogState
};
