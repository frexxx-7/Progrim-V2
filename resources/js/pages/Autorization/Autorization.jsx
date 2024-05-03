import React from 'react'
import classes from './Autorization.module.scss'
import { Link } from 'react-router-dom'

const Autorization = () => {
  
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
                <input type="text" name="" placeholder='Логин' />
                <input type="text" name="" placeholder='Пароль' />
              </div>
            </div>

            <div className={classes.buttons}>
              <button>Войти</button>
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