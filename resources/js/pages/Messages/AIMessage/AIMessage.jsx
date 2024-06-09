import React from 'react'
import classes from '../Messages.module.scss'

const AIMessage = ({ message }) => {
  return (
    <>
      {
        message.sender !== "user"
          ?
          <div className={classes.aiSenderMessage_container}>
            <div className={classes.aiSenderMessage}>
              <p>{message.message}</p>
            </div>
          </div>
          :
          <div className={classes.userSenderMessage_container}>
            <div className={classes.userSenderMessage}>
              <p>{message.message}</p>
            </div>
          </div>
      }
    </>
  )
}

export default AIMessage