import React from 'react';
import { Grid, Segment } from 'semantic-ui-react';

import Auth from './auth/Auth';
import { LogIn } from './components/LogIn';
import { LoggedIn } from './components/LoggedIn';


export interface AppProps {
  auth: Auth,
  history: any,
};

export interface AppState {}

const App = ({ auth }: AppProps) => (
  <Segment vertical>
    <Grid container stackable verticalAlign="middle">
      <Grid.Row>
        <Grid.Column width={16}>
          {
            auth.isAuthenticated()
              ? <LoggedIn auth={auth} />
              : <LogIn auth={auth} />
          }
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Segment>
);


export default App;
