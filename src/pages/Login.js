import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { GiHotMeal } from 'react-icons/gi';
import '../styles/Login.css';

function Login() {
  const [disabled, setDisabled] = useState(true);
  const history = useHistory();
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });
  const redirectRecipes = () => {
    history.push('/meals');
  };
  const validation = () => {
    const SIX = 7;
    const regex = /[\w.ã]+@\w+\.\w{2,8}(\.\w{0,2})?/g;
    const validEmail = regex.test(login.email);
    if (login.password.length >= SIX && validEmail) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const setLocalStorange = () => {
    const { email } = login;
    localStorage.setItem('user', JSON.stringify({ email }));
  };

  useEffect(() => {
    validation();
  }, [login.password]);

  const handleChange = ({ target }) => {
    const { value, name } = target;
    if (name === 'email') {
      setLogin(() => ({
        ...login,
        email: value,
      }));
    } if (name === 'password') {
      setLogin(() => ({
        ...login,
        password: value,
      }));
    }
    validation();
  };

  return (
    <div className="login">
      <div className="f-area">
        <GiHotMeal fontSize="100px" color="#fe4800c5" />
        <h1> RECIPE APP </h1>
      </div>
      <input
        data-testid="email-input"
        placeholder="Email"
        value={ login.email }
        onChange={ handleChange }
        name="email"
        type="email"
      />
      <input
        data-testid="password-input"
        placeholder="Senha"
        name="password"
        value={ login.password }
        type="password"
        onChange={ handleChange }
      />
      <div className="buttons-a">
        <button
          data-testid="login-submit-btn"
          type="button"
          disabled={ disabled }
          onClick={ () => {
            setLocalStorange();
            redirectRecipes();
          } }
        >
          Enter

        </button>
        <button
          // data-testid="login-submit-btn"
          type="button"
          // disabled={ disabled }
          // onClick={ () => {
          //   setLocalStorange();
          //   redirectRecipes();
          // } }
        >
          Create Account

        </button>
      </div>
    </div>
  );
}

export default Login;
