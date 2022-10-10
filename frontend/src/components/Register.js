import { useState } from 'react';
import { Link } from 'react-router-dom';

import { routes, inputType } from '../constants';
import { Input } from '../shared-components/Input';

export function Register({ onSubmit }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <>
      <div className="entry">
        <h2 className="entry__title">Регистрация</h2>
        <form
          className="entry__form"
          name="entry__form"
          onSubmit={handleSubmit}
        >
          <Input
            name="Email"
            handleChange={handleChangeEmail}
            value={email}
            type={inputType.EMAIL}
          />
          <Input
            name="Пароль"
            value={password}
            handleChange={handleChangePassword}
            type={inputType.PASSWORD}
          />
          <button
            value="Зарегистрироваться"
            className="entry__button"
            type="submit"
            title="Зарегистрироваться"
          >
            Зарегистрироваться
          </button>
          <span className="entry__link">
            Уже зарегистрированы?&nbsp;
            <Link
              to={routes.SIGN_IN}
              className="entry__link_type_redirect"
            >
              Войти
            </Link>
          </span>
        </form>
      </div>
    </>
  );
}
