import React, { useState } from 'react'
import classes from './Aside.module.scss'
import { useStateContext } from '../../../context/ContextProvider';
import { Link } from 'react-router-dom';

const Aside = () => {
  const { user } = useStateContext()
  const [showAside, setShowAside] = useState(false)

  return (
    <aside className={classes.aside}>
      <div className={classes.aside_button} onClick={() => setShowAside(!showAside)}>
        {
          showAside ?
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#fff" height="800px" width="800px" version="1.1" id="Layer_1" viewBox="0 0 330 330" xml:space="preserve">
              <path id="XMLID_222_" d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001  c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213  C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606  C255,161.018,253.42,157.202,250.606,154.389z" />
            </svg>
            :
            <svg xmlns="http://www.w3.org/2000/svg" width="800px" height="600px" viewBox="0 0 24 24" fill="#fff">
              <path d="M4 18L20 18" stroke="#fff" stroke-width="2" stroke-linecap="round" />
              <path d="M4 12L20 12" stroke="#fff" stroke-width="2" stroke-linecap="round" />
              <path d="M4 6L20 6" stroke="#fff" stroke-width="2" stroke-linecap="round" />
            </svg>
        }


      </div>
      <div className={classes.aside_content} style={{ width: showAside ? "20vw" : "0vw" }}>
        <div className={classes.you_info}>
          <p className={classes.user_login}>{user.name}</p>
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
            <Link to={"/news"}>Друзья</Link>
          </li>
        </ul>
      </div>
    </aside>
  )
}

export default Aside