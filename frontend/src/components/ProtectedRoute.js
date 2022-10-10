import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { routes } from '../constants';

export const ProtectedRoute = ({
  component: Component,
  ...props
}) => {
  return (
    <Route>
      {() =>
        props.loggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={routes.SIGN_IN} />
        )
      }
    </Route>
  );
};
