import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { createHttpLink } from "apollo-link-http";
import { withClientState } from "apollo-link-state";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";

import defaults from "./graphql/defaults";
import resolvers from "./graphql/resolvers";

const authLink = setContext((_, { headers }) => {
  const jwtToken = sessionStorage.getItem("jwtToken");

  return jwtToken
    ? {
        headers: {
          ...headers,
          authorization: `Bearer ${jwtToken}`
        }
      }
    : { headers };
});

const cache = new InMemoryCache({
  dataIdFromObject: object => object.nodeId
});

const httpLink = createHttpLink({
  credentials: "same-origin",
  uri: "http://localhost:8080/api/eureka"
});

const stateLink = withClientState({
  cache,
  defaults,
  resolvers
});

const client = new ApolloClient({
  cache: cache,
  connectToDevTools: process.env.NODE_ENV === "development",
  link: ApolloLink.from([authLink, stateLink, httpLink])
});

client.onResetStore(stateLink.writeDefaults);

export { client };
