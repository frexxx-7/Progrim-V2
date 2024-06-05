import React, { useEffect, useState } from 'react'
import classes from './Messages.module.scss'

import Loader from '../../components/UI/Loader/Loader'
import MessagesItem from './MessagesItem/MessagesItem'
import OpenMessages from './OpenMessages/OpenMessages'
import ChatsImage from './ChatImage'
import { useStateContext } from '../../context/ContextProvider'
import axiosCLient from '../../axios.client'

const Messages = () => {
  const { user } = useStateContext()
  const [selestPage, setSelectPage] = useState(0)
  const [messages, setMessages] = useState({})
  const [loadingMessages, setLoadingMessages] = useState(true)

  const loadMessages = () => {
    const payload = {
      userId: user.id
    }
    axiosCLient.post('/messages', payload)
      .then(({ data }) => {
        setMessages(data);
        setLoadingMessages(false)
      })
  }

  useEffect(() => {
    user.id &&
      loadMessages()
  }, [user])

  const switchPage = () => {
    switch (selestPage) {
      case 0:
        return <ChatsImage />
      case 1:
        return <OpenMessages />
      default:
        return <ChatsImage />
    }
  }

  useEffect(() => {
    if (Number.isInteger(+window.location.pathname.split("/").at(-1))) {
      setSelectPage(1)
    }
  }, [])

  useEffect(() => {
    switchPage()
  }, [selestPage])

  return (
    <div className={classes.mainContent}>
      <div className={classes.message}>
        <div className={classes.chats} id="chats">
          <div className={classes.header}>
            <h2>Чаты</h2>
          </div>
          <div className={classes.chatsList}>
            {loadingMessages ? <Loader /> :
              !messages
                ?
                <div className={classes.noChatsDiv}><h2 className={classes.noChats}>No chats</h2></div>
                :
                messages && Object.entries(messages).map(([key, value]) => (
                  <MessagesItem key={key} value={value} />
                ))
            }
          </div>
        </div>
        {switchPage()}
      </div>
    </div>
  )
}

export default React.memo(Messages)