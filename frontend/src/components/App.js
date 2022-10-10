import { useState, useEffect } from 'react';
import {
  Switch,
  Route,
  Redirect,
  useHistory
} from 'react-router-dom';

import { authApiClient } from '../utils/Api';
import { routes } from '../constants';
import { Layout } from './Layout';
import { Login } from './Login';
import { Register } from './Register';
import { Header } from './Header';
import { ProtectedRoute } from './ProtectedRoute'; // импортируем HOC
import { InfoTooltip } from './InfoTooltip';

function App() {
  const history = useHistory();

  const [isTokenValid, setIsTokenValid] = useState(false);
  const [tooltipInformation, setTooltipInformation] = useState({
    show: false,
    succeed: true
  });
  const [userInformation, setUserInformation] = useState({
    email: '',
    loggedIn: false
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    authApiClient
      .checkValidity(token)
      .then((res) => {
        setUserInformation({
          email: res.data.email,
          loggedIn: true
        });
        setIsTokenValid(true);
        history.push(routes.MAIN);
      })
      .catch((err) => {
        console.info(err);
        setIsTokenValid(false);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleHeaderEntry = () => {
    localStorage.removeItem('token');
    history.push(routes.SIGN_IN);
  };

  const handleTooltipClose = () => {
    setTooltipInformation({
      ...tooltipInformation,
      show: false
    });
  };

  const handleRegisterSubmit = (email, password) => {
    authApiClient
      .signUp(email, password)
      .then((res) => {
        setTooltipInformation({
          show: true,
          succeed: true
        });
        history.push(routes.SIGN_IN);
      })
      .catch((err) => {
        setTooltipInformation({
          show: true,
          succeed: false
        });
        console.error(err);
      });
  };

  const handleLoginSubmit = (email, password) => {
    authApiClient
      .signIn(email, password)
      .then((signIn) => {
        if (signIn.token) {
          localStorage.setItem('token', signIn.token);
          setUserInformation({
            email,
            loggedIn: true
          });
          setIsTokenValid(true);
          history.push(routes.MAIN);
        }
      })
      .catch((err) => {
        setTooltipInformation({
          show: true,
          succeed: false
        });
        console.error(err);
      });
  };

  return (
    <div className="page">
      <InfoTooltip
        isOpened={tooltipInformation.show}
        onClose={handleTooltipClose}
        isSuccess={tooltipInformation.succeed}
      />
      <Header
        email={userInformation.email}
        onSignOut={handleHeaderEntry}
        loggedIn={userInformation.loggedIn}
      />
      <Switch>
        <Route path={routes.SIGN_UP}>
          <Register onSubmit={handleRegisterSubmit} />
        </Route>
        <Route path={routes.SIGN_IN}>
          <Login onLogin={handleLoginSubmit} />
        </Route>
        {isTokenValid ? (
          <ProtectedRoute
            exact
            path="/"
            loggedIn={isTokenValid}
            component={Layout}
          />
        ) : (
          <Redirect to={routes.SIGN_IN} />
        )}
      </Switch>
    </div>
  );
}

export default App;
