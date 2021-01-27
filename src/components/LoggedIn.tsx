import React, { useState } from 'react';
import Auth from '../auth/Auth';
import { Form, Button } from 'semantic-ui-react';
import jwt from 'jsonwebtoken';

import useInterval from './utils/useInterval';


const CREDENTIALS_VISIBILITY_LIFESPAN = 5;

interface LoggedInProps {
  auth: Auth
};

interface AuthDecodedToken {
  sub: string,
};

export const LoggedIn = ({ auth }: LoggedInProps) => {
  const [ dataVisible, setDataVisible ] = useState(false);
  const [ visibilityTimer, setVisibilityTimer ] = useState(CREDENTIALS_VISIBILITY_LIFESPAN);
  const [ runTimer, setRunTimer ] = useState(false);

  useInterval(
    () => {
      if (visibilityTimer > 0) {
        setVisibilityTimer(visibilityTimer - 1)
      } else {
        setRunTimer(false);
        setDataVisible(false);
      }
    },
    runTimer ? 1000 : null
  );

  const token = auth.getIdToken();
  const { sub } = jwt.decode(token) as AuthDecodedToken;

  return (
    <>
      <h1>Welcome</h1>
      <p>In order to use the capstone python app, pass these parameters as command line arguments:</p>

      <Form>
        <Form.Group widths='equal'>
          <Form.Input
            type={dataVisible ? 'text' : 'password'}
            label="--token="
            defaultValue={token}
            fluid
          />

          <Form.Input
            type={dataVisible ? 'text' : 'password'}
            label="--userid="
            defaultValue={sub}
            fluid
          />
        </Form.Group>
      </Form>

      <Button
        icon="eye"
        content={"See credentials"}
        onClick={
          () => {
            setDataVisible(true);
            setVisibilityTimer(CREDENTIALS_VISIBILITY_LIFESPAN);
            setRunTimer(true);
          }
        }
        disabled={dataVisible}
        loading={dataVisible}
      />
    </>
  );
}
