import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import { client } from "./ApolloClientConfiguration";

import { LoginView } from "./views/login/LoginView";
import { MainView } from "./views/main/MainView";

export const App = () => (
  <ApolloProvider client={client}>
    <Router>
      <Switch>
        <Route component={LoginView} exact={true} path="/" />
        <Route component={MainView} exact={true} path="/main" />
      </Switch>
    </Router>
  </ApolloProvider>
);
