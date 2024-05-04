import React, { useRef, useState } from 'react';
import classes from './Registration.module.scss';
import { Link, useNavigate } from 'react-router-dom';

const Registration = () => {
  const navigate = useNavigate();
  const loginRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const repeatPasswordRef = useRef(null);
  const [error, setError] = useState('');

  fetch('/env')
    .then(response => response.json())
    .then(data => {
        // Теперь у вас есть доступ к .env Laravel в переменной data.env
        console.log(data.env);
    })
    .catch(error => {
        console.error('Ошибка при получении .env:', error);
    });

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  const onRegButtonClick = () => {
    setError('');
    const login = loginRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const repeatPassword = repeatPasswordRef.current.value;

    if (!login || !email || !password || !repeatPassword) {
      setError('Пожалуйста, заполните все поля');
      return;
    }

    if (!validateEmail(email)) {
      setError('Неправильный формат email');
      return;
    }

    if (password !== repeatPassword) {
      setError('Пароли не совпадают');
      return;
    }

    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: repeatPasswordRef.current.value
    }
    axiosCLient.post('/signup', payload)
      .then(({ data }) => {
        setUser(data.user)
        setToken(data.token)
        navigate('/sigin')
      })
      .catch(err => {
        const response = err.response
        if (response && response.status === 422) {
          setError(response.data.errors)
        }
      })
  };

  return (
    <div className="main">
      <div className={classes.main_container}>
        <div className={classes.main_first}>

          <div className={classes.reg_form}>
            <div className={classes.header}>
              <h3>РЕГИСТРАЦИЯ</h3>
            </div>


            <div className={classes.inputs}>
              <div className={classes.inputs_container}>
                <input ref={loginRef} type="text" name="login" placeholder='Логин' autoComplete='off' />
                <input ref={emailRef} type="email" name="email" placeholder='Почта' autoComplete='new-email' />
                <input ref={passwordRef} type="password" name="password" placeholder='Пароль' autoComplete="new-password" />
                <input ref={repeatPasswordRef} type="password" name="repeat_password" placeholder='Повторите пароль' autoComplete='off' />
              </div>
            </div>
            {error && <div className={classes.error}>{error}</div>}

            <div className={classes.buttons}>
              <button onClick={onRegButtonClick}>Регистрация</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Registration;
