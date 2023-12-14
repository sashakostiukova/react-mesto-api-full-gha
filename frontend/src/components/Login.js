import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login({ onLogin }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setMessage('');
  };

  function handleSubmit(e) {
    e.preventDefault();

    onLogin({ email, password })
      .then(resetForm)
      .then(() => navigate('/'))
      .catch((err) => setMessage(err.message || 'Что-то пошло не так'));
  }

  return (
    <div className="registration-login">

      <h2 className="registration-login__title">Вход</h2>
      <form name="login-form" className="registration-login__form" onSubmit={handleSubmit}>
        

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

        <button type="submit" className="registration-login__button">Войти</button>
      </form>

    </div>
  )
}