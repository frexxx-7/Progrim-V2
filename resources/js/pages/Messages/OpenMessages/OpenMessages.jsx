import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import MessageItem from '../MessageItem/MessageItem'
import classes from './OpenMessages.module.scss'
import Loader from '../../../components/UI/Loader/Loader'
import { useStateContext } from '../../../context/ContextProvider'
import axiosCLient from '../../../axios.client'

const OpenMessages = () => {
  const idUrl = window.location.pathname.substring(10)

  const navigate = useNavigate()
  const { user } = useStateContext()

  const [messages, setMessages] = useState()
  const [loadingMessages, setLoadingMessages] = useState(true)
  const [textMessage, setTextMessage] = useState('')
  const [otherUser, setOtherUser] = useState()

  const loadInfoUser = () => {
    axiosCLient.get(`/loadInfoUser/${idUrl}`)
      .then(({ data }) => {
        setOtherUser(data.user) 
      })
  }

  const loadMessages = () => {
    const payload = {
      userId: user.id,
      userTwoId: idUrl
    }
    axiosCLient.post('/getAllMessagesInChat', payload)
      .then(({ data }) => {
        console.log(data);
        setMessages(data)
        setLoadingMessages(false)
      })
  }

  const createDatabaseMessage = () => {
    const input = document.getElementById('inputMessage')
    if (textMessage !== '') {

      const payload = {
        idUserSender: user.id,
        idUserRecipient: otherUser.id,
        text: textMessage,
      }
      axiosCLient.post('/addMessages', payload)
        .then(({ data }) => {
          loadMessages()
        })

      setTextMessage('')
      input.classList.remove(classes.errorInput)
    } else {
      input.classList.add(classes.errorInput)
    }
  }

  const scroll = () => {
    const main = document.getElementById('main')

    setTimeout(() => {
      main && main.scrollTo(0, main.scrollHeight)
    }, 0);
  }

  const openChants = () => {
    const chats = document.getElementById('chats')
    chats.style.display = 'block'
  }

  useEffect(() => {
    if (user && user.id)
      loadMessages()
    if (window, innerWidth <= 620) {
      const chats = document.getElementById('chats')
      chats.style.display = 'none'
      const openMessage = document.getElementById('openMessage')
      openMessage && setTimeout(() => {
        openMessage.style.display = 'block'
      }, 0);
    }
  }, [user])

  useEffect(() => {
    scroll()
    loadInfoUser()
  }, [messages])

  console.log(messages);
  return (
    <>
      {
        loadingMessages ?
          <Loader />
          :
          <div className={classes.OpenMessages} id="openMessage">
            <div className={classes.head}>
              <div className={classes.userName}>
                {window.innerWidth <= 620 ? <NavLink to={`/messages`} onClick={openChants} className={classes.openChants}>{'<'}</NavLink> : ''}
                <NavLink to={`/profile/${otherUser && otherUser.id}`}> <p>{otherUser && otherUser.name}</p> </NavLink>
              </div>
              <div className={classes.userInfo}>
                <div className={classes.userAvatar}>
                  <NavLink to={`/profile/${otherUser && otherUser.id}`}>
                    <img src={`/storage/${otherUser && otherUser.avatar}`} alt="avatar" /> </NavLink>
                </div>
              </div>
            </div>

            <div className={classes.main} id='main'>
              {messages && Object.entries(messages).map(([key, value]) => (
                <MessageItem key={key} value={value} />
              ))}
            </div>

            <div className={classes.footer}>
              <div className={classes.inputDiv}>
                <input
                  type="text"
                  value={textMessage}
                  onChange={(e) => setTextMessage(e.target.value)}
                  onKeyUp={(e) => e.key === 'Enter' ? createDatabaseMessage() : ''}
                  placeholder='Write a message...'
                  id='inputMessage'
                />
              </div>

              <div className={classes.sendButtonDiv}>
                <button className={classes.sendButton} onClick={createDatabaseMessage} onSubmit={(e) => e.preventDefault()}>Send</button>
              </div>
            </div>
          </div>
      }
    </>
  )
}

export default React.memo(OpenMessages)