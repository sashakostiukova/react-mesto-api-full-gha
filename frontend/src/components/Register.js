import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Register({ onRegister, showRegisterError }) {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  // eslint-disable-next-line no-unused-vars
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setMessage('');
  };

  function handleSubmit(e) {
    e.preventDefault();

    onRegister({ email, password })
      .then(resetForm)
      .then(() => navigate('/sign-in'))
      .catch((err) => {
        setMessage(err.message || 'Что-то пошло не так');
        showRegisterError();
    });
  }

  return (
    <div className="registration-login">

      <h2 className="registration-login__title">Регистрация</h2>
      <form name="register-form" className="registration-login__form" onSubmit={handleSubmit}>
        

        <input 
          id="email-input" name="email" className="registration-login__input registration-login__input_type_email" 
          type="email" placeholder="Email" value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input 
            id="password-input" name="password" className="registration-login__input registration-login__input_type_password" 
            type="password" placeholder="Пароль" value={password}
            onChange={e => setPassword(e.target.value)}
        />

        <button type="submit" className="registration-login__button">Зарегистрироваться</button>
        <p className="registration-login__text">Уже зарегистрированы?
          <Link className="registration-login__link registration-login__text opacity-transition" to="/sign-in">
            Войти
          </Link>
        </p>

      </form>
    </div>
  )
}
