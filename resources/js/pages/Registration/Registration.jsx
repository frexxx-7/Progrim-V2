import React from 'react'
import classes from './Registration.module.scss'
import { Link, useNavigate } from 'react-router-dom'

const Registration = () => {
  const navigate = useNavigate()

  const onRegButtonClick = () => {
    navigate('/sigin')
  }

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
                <input type="text" name="login" placeholder='Логин' autoComplete='off' />
                <input type="email" name="email" placeholder='Почта' autoComplete='new-email' />
                <input type="password" name="password" placeholder='Пароль' autoComplete="new-password" />
                <input type="password" name="repeat_password" placeholder='Повторите пароль' autoComplete='off' />
              </div>
            </div>

            <div className={classes.buttons}>
              <button onClick={onRegButtonClick}>Регистрация</button>
            </div>
          </div>

        </div>
        {/*<div className={classes.main_second}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><img src="./icon.png" alt="icon" /></div>
        </div>*/}
      </div>
    </div>
  )
}

export default Registration