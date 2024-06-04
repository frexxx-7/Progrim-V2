import React from 'react'
import classes from './Messages.module.scss'

const ChatsImage = () => {

  return (
    <div className={classes.correspondence}>
      <div className={classes.chatsImage}>
        <i className="fa-solid fa-comment-dots"></i>
      </div>
    </div>
  )
}

export default ChatsImage