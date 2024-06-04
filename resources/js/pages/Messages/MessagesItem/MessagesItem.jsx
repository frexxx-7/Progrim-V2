import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import classes from './MessagesItem.module.scss'
import Loader from '../../../components/UI/Loader/Loader'
import { useStateContext } from '../../../context/ContextProvider'

const MessagesItem = ({ value }) => {
  const { user } = useStateContext()

  const getDate = (date) => {
    const timePost = new Date(date).toLocaleTimeString().slice(0, -3)
    const datePost = new Date(date).toLocaleDateString()
    return `${datePost} ${timePost}`
  }

  return (
    <NavLink to={`/messages/${value.chatUser.id}`} className={classes.messageItem}>
      <div className={classes.userInfo}>

        <div className={classes.user}>
          <img src={`/storage/${value && value.chatUser.avatar}`} alt="user" />
        </div>

        <div className={classes.message}>
          <div className={classes.nameDate}>
            <div className={classes.dataName}>
              <h6>{value && value.chatUser.name}</h6>
            </div>

            <div className={classes.dataDate}>
              <p>{getDate(value && value.message.created_at)}</p>
            </div>
          </div>

          <div className={classes.lastMessage}>
            <div className={classes.userMessage}>
              {user && value.chatUser.id === user.id ? 'You:' : ''}
            </div>
            <div className={classes.messageUser}>
              {value.message.text}
            </div>
          </div>
        </div>

      </div>
    </NavLink>
  )
}

export default React.memo(MessagesItem)