import { DRAWER_MENU_STATE } from "../queries/DrawerMenuState";

export default (_, { drawerState, menuState }, { cache }) => {
  const { drawerMenuState } = cache.readQuery({
    query: DRAWER_MENU_STATE
  });

  const data = {
    drawerMenuState: {
      ...drawerMenuState,
      drawerState,
      menuState
    }
  };

  cache.writeQuery({
    query: DRAWER_MENU_STATE,
    data: data
  });

  return null;
};
