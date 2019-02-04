import gql from "graphql-tag";

export const DRAWER_MENU_STATE = gql`
  query {
    drawerMenuState @client {
      drawerState
      menuState
    }
  }
`;
