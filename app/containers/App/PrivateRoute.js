import { Route } from 'react-router-dom';
import React from 'react';
import LoginDedicated from '../Pages/Standalone/LoginDedicated';

export default function PrivateRoute(props) {
  const { component: Component, render, ...rest } = props;
  const isAuthenticated = !!localStorage.getItem('token');
  return (
    <Route
      {...rest}
      render={
        props => {
          if (isAuthenticated) {
            return Component ? <Component {...props} /> : render(props);
          }
          return <LoginDedicated />;
        }
      }
    />
  );
}
