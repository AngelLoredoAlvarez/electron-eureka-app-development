import gql from "graphql-tag";

export const UPDATE_DRAWER_MENU_STATE = gql`
  mutation($drawerState: Boolean!, $menuState: Boolean!) {
    UpdateDrawerMenuState(drawerState: $drawerState, menuState: $menuState)
      @client
  }
`;
