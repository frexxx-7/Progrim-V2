import React, { useRef, useState } from 'react'
import classes from './Autorization.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useStateContext } from '../../context/ContextProvider'
import axiosCLient from '../../axios.client'

const Autorization = () => {
  const navigate = useNavigate()

  const emailRef = useRef()
  const passwordRef = useRef()

  const [error, setError] = useState()
  const { setUser, setToken } = useStateContext()

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  const autorizationCLick = () => {
    setError('');

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!email || !password) {
      setError('Пожалуйста, заполните все поля');
      return;
    }

    if (!validateEmail(email)) {
      setError('Неправильный формат email');
      return;
    }

    const payload = {
      email: email,
      password: password
    }

    axiosCLient.post('/signin', payload)
      .then(({ data }) => {
        setUser(data.user)
        setToken(data.token)
        navigate("/main")
      })
      .catch(err => {
        const response = err.response
        if (response && response.status === 422) {
          setError(response.data.message)
        }
      })
  }

  return (
    <div className="main">
      <div className={classes.main_container}>
        <div className={classes.main_first}>

          <div className={classes.auth_form}>
            <div className={classes.header}>
              <h3>АВТОРИЗАЦИЯ</h3>
            </div>

            <div className={classes.inputs}>
              <div className={classes.inputs_container}>
                <input ref={emailRef} type="email" name="email" placeholder='Почта' />
                <input ref={passwordRef} type="password" name="password" placeholder='Пароль' />
              </div>
            </div>
            {error && <div className={"error"}>{error}</div>}
            <div className={classes.buttons}>
              <button onClick={autorizationCLick}>Войти</button>
              <Link className={classes.toRegLink} to="/signup">Регистрация</Link>
            </div>
          </div>

        </div>
        <div className={classes.main_second}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><img src="./icon.png" alt="icon" /></div>
        </div>
      </div>
    </div>
  )
}

export default Autorization