import gql from "graphql-tag";

export const AUTHENTICATE = gql`
  mutation($credentials: AuthenticateInput!) {
    authenticate(input: $credentials) {
      jwtToken
    }
  }
`;
