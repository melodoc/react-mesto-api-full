import { Link, Route, Switch } from 'react-router-dom';
import { routes } from '../constants';

import logo from '../images/icon/logo.svg';

const links = {
  signIn: {
    label: 'Войти',
    path: routes.SIGN_UP,
    link: routes.SIGN_IN
  },
  signUp: {
    label: 'Регистрация',
    path: routes.SIGN_IN,
    link: routes.SIGN_UP
  },
  main: {
    label: 'Выйти',
    path: routes.MAIN
  }
};

export function Header({ email, loggedIn, onSignOut }) {
  const buttonStyle = `"header__button" ${
    loggedIn ? 'header__button_state_inactive' : ''
  }`;

  return (
    <header className="header">
      <div className="header__link">
        <img className="header__logo" src={logo} alt="Сайт Mesto" />
      </div>
      <Switch>
        <Route exact path={links.main.path}>
          <div className="header__container">
            <div className="header__email">{email}</div>
            <div className={buttonStyle} onClick={onSignOut}>
              {links.main.label}
            </div>
          </div>
        </Route>
        <Route path={links.signIn.path}>
          <Link to={links.signIn.link} className="header__button">
            {links.signIn.label}
          </Link>
        </Route>
        <Route path={links.signUp.path}>
          <Link to={links.signUp.link} className="header__button">
            {links.signUp.label}
          </Link>
        </Route>
      </Switch>
    </header>
  );
}
