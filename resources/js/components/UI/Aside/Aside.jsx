import React, { useState } from 'react'
import classes from './Aside.module.scss'
import { useStateContext } from '../../../context/ContextProvider';
import { Link } from 'react-router-dom';
import axiosCLient from '../../../axios.client';

const Aside = () => {
  const { user, setUser, setToken } = useStateContext()
  const [showAside, setShowAside] = useState(false)

  const onLogout = (ev) => {
    ev.preventDefault()

    axiosCLient.post('/logout')
      .then(() => {
        setUser({})
        setToken(null)
      })
  }

  return (
    <aside className={classes.aside}>
      <div className={classes.aside_button} onClick={() => setShowAside(!showAside)}>
        {
          showAside ?
            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#fff" height="800px" width="800px" version="1.1" id="Layer_1" viewBox="0 0 330 330" xmlSpace="preserve">
              <path id="XMLID_222_" d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001  c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213  C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606  C255,161.018,253.42,157.202,250.606,154.389z" />
            </svg>
            :
            <svg xmlns="http://www.w3.org/2000/svg" width="800px" height="600px" viewBox="0 0 24 24" fill="#fff">
              <path d="M4 18L20 18" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
              <path d="M4 12L20 12" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
              <path d="M4 6L20 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
            </svg>
        }


      </div>
      <div className={classes.aside_content} style={{ width: showAside ? "20vw" : "0vw", opacity: showAside ? "1" : "0", padding: showAside ? "20px" : "0" }}>
        <div className={classes.you_info}>
          <Link to={"/profile"} className={classes.user_login}> <img src={"/storage/" + user.avatar} alt="" /> {user.name}</Link>
        </div>
        <ul>
          <li>
            <Link to={"/main"}>Главная</Link>
          </li>
          <li>
            <Link to={"/news"}>Новости</Link>
          </li>
          <li>
            <Link to={"/news"}>Организации</Link>

          </li>
          <li>
            <Link to={"/news"}>Сообщения</Link>

          </li>
          <li>
            <Link to={"/friends"}>Друзья</Link>
          </li>
          <li className={classes.exitLink}>
            <a onClick={onLogout}>Выход</a>
          </li>
        </ul>
      </div>
    </aside>
  )
}

export default Aside