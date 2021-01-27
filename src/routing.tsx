import React from 'react';
import { Router, Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import App from './App';
import Auth from './auth/Auth';
import Callback from './components/Callback'


const history = createHistory();
const auth = new Auth(history);

const handleAuthentication = ({ location }: any) => (
  /access_token|id_token|error/.test(location.hash)
    ? auth.handleAuthentication()
    : undefined
);

export const makeAuthRouting = () => (
  <Router history={history}>
    <Route
      path="/callback"
      render={
        props => {
          handleAuthentication(props);
          return <Callback />;
        }
      }
    />
    <Route render={props => <App auth={auth} {...props} />} />
  </Router>
);
