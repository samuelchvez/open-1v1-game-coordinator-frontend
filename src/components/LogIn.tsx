import * as React from 'react';
import Auth from '../auth/Auth';
import { Button } from 'semantic-ui-react';


interface LogInProps {
  auth: Auth
};

export const LogIn = ({ auth }: LogInProps) => (
  <>
    <h1>Please log in</h1>
    <p>Before getting your game credentials, you should log in</p>

    <Button
      onClick={auth.login}
      color="teal"
    >
      Log in
    </Button>
  </>
);
