import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import classes from './UserItem/UserItem.module.scss'
import classes2 from './Friends.module.scss'
import Loader from '../../components/UI/Loader/Loader'
import axiosCLient from '../../axios.client'
import { useStateContext } from '../../context/ContextProvider'

const FriendItem = ({ friend, setRerender }) => {
  const { user } = useStateContext()

  const deleteFriend = () => {
    const payload = {
      userId: user.id
    }
    axiosCLient.post(`/deleteFriend/${friend.id}`, payload)
      .then(({ data }) => {
        setRerender(Date.now())
      })
      .catch(err => {
        console.log(err.message);
      })
  }

  return (
    <div className={classes.user}>
      <NavLink to={`/profile/${friend.id}`}>
        <div className={classes.photo}>
          <img src={`/storage/${friend.avatar}`} alt="photo" />
        </div>
        <div className={classes.info}>
          <p className={classes.name}>{friend.name}</p>
        </div>
      </NavLink>
      <div className={classes2.buttons}>
        <NavLink to={`/messages/${friend.id}`} className={classes2.sendMessageA}>
          {
            window.innerWidth <= 620
              ? <i className="fa-regular fa-envelope"></i>
              : 'Сообщение'
          }

        </NavLink>

        <a className={classes2.delete} onClick={() => deleteFriend()}>
          {
            window.innerWidth <= 620
              ? <i className="fa-solid fa-trash"></i>
              : 'Удалить'
          }
        </a>

      </div>
    </div>
  )
}

export default React.memo(FriendItem)