import React, { useState } from 'react'
import classes from './Messages.module.scss'
import { useTranslation } from 'react-i18next'

const ChatsImage = () => {
  const [aiMessager, setAIMessager] = useState(false)
  const { t } = useTranslation()

  const [iaMessages, setIaMessages] = useState([
    {
      message: t("messages.aiMessage"),
      sender: "ChatGPT"
    }
  ])
  return (
    <>
      {
        !aiMessager ?
          <div className={classes.correspondence}>
            <div className={classes.chatsImage}>
              <i className="fa-solid fa-comment-dots" onClick={() => setAIMessager(true)}></i>
            </div>
          </div>
          :
          <div className={classes.aiChatContainer}>
            <div className={classes.aiChat}>
              <div className={classes.aiChatHeader}>
                <div className={classes.aiChatHeaderAvatar}>
                  <img src="./chatgptIcon.jpg" alt="" />
                </div>
                <div className={classes.aiChatHeaderName}>
                  <p>ChatGPT</p>
                </div>
              </div>

              <div className={classes.aiChatMessagerContainer}>
                <div className={classes.aiChatMessages}>

                </div>

                <div className={classes.aiChatMessageInputContainer}>
                  <input type="text" placeholder={t("messages.sendMessage")}/>
                  <button> > </button>
                </div>
              </div>
            </div>
          </div>
      }
    </>
  )
}

export default ChatsImage