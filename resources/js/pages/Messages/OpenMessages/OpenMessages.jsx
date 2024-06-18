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
  const [file, setFile] = useState(null)

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
          if (file) {
            uploadFileToMessage(data.message.id)
          } else {
            loadMessages()
          }
        })

      setTextMessage('')
      setFile(null)
      input.classList.remove(classes.errorInput)
    } else {
      input.classList.add(classes.errorInput)
    }
  }

  const uploadFileToMessage = (idMessage) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('idMessage', idMessage)

    axiosCLient.post('/uploadMessageFile', formData)
      .then(({ data }) => {
        loadMessages()
      })
  }

  const scroll = () => {
    const main = document.getElementById('main')

    setTimeout(() => {
      main && main.scrollTo(0, main.scrollHeight)
    }, 0)
  }

  const openChants = () => {
    const chats = document.getElementById('chats')
    chats.style.display = 'block'
  }

  useEffect(() => {
    if (user && user.id)
      loadMessages()
    if (window.innerWidth <= 620) {
      const chats = document.getElementById('chats')
      chats.style.display = 'none'
      const openMessage = document.getElementById('openMessage')
      openMessage && setTimeout(() => {
        openMessage.style.display = 'block'
      }, 0)
    }
  }, [user])

  useEffect(() => {
    scroll()
    loadInfoUser()
  }, [messages])

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

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
                  placeholder='Сообщение...'
                  id='inputMessage'
                />
              </div>

              <div className={classes.addFile}>
              <label htmlFor="fileInput" className={classes.fileInputLabel}>
                <input type="file" id="fileInput" className={classes.fileInput} onChange={handleFileChange} />
                <span className={classes.fileButton}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.0"
                    width="24px"
                    height="24px"
                    viewBox="0 0 1280.000000 1188.000000"
                    preserveAspectRatio="xMidYMid meet"
                    className={classes.fileIcon}
                  >
                    <g transform="translate(0.000000,1188.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
                      <path d="M7835 11870 c-555 -59 -1064 -296 -1524 -710 -160 -144 -371 -399 -492 -595 -61 -98 -2515 -4298 -2621 -4485 -466 -822 -641 -1663 -477 -2295 67 -259 222 -503 409 -644 367 -277 835 -291 1345 -42 249 122 483 292 724 526 249 242 463 509 654 815 141 227 1322 2258 1340 2305 25 65 33 196 17 266 -49 211 -237 359 -455 359 -179 0 -320 -86 -421 -256 -22 -38 -301 -514 -619 -1059 -318 -544 -602 -1030 -633 -1080 -283 -463 -627 -821 -973 -1014 -93 -52 -216 -92 -299 -98 -71 -5 -77 -4 -107 21 -41 34 -68 95 -89 197 -25 122 -15 389 20 559 65 316 185 633 354 935 131 234 2581 4424 2640 4515 296 458 770 777 1250 841 134 18 345 6 467 -25 125 -33 279 -107 383 -186 503 -379 624 -1191 283 -1895 -61 -127 -3739 -6430 -3822 -6550 -464 -673 -1395 -921 -2144 -570 -114 53 -767 425 -900 513 -206 136 -439 401 -554 631 -238 475 -240 1035 -6 1502 34 66 813 1402 2808 4814 341 583 636 1094 656 1135 31 65 36 86 39 167 5 107 -6 160 -52 248 -77 148 -240 245 -411 245 -129 -1 -230 -44 -325 -140 -57 -57 -103 -131 -391 -625 -180 -308 -942 -1613 -1694 -2900 -752 -1287 -1390 -2380 -1418 -2430 -150 -265 -258 -596 -303 -925 -24 -170 -24 -490 0 -660 56 -412 198 -791 420 -1124 111 -165 187 -258 330 -401 220 -220 326 -294 815 -575 620 -356 719 -402 1035 -485 258 -68 358 -79 676 -79 308 0 403 10 650 70 356 88 754 285 1036 514 192 157 394 378 531 585 60 90 3729 6364 3816 6525 146 271 261 622 314 960 22 145 25 576 5 715 -65 432 -208 788 -440 1095 -72 95 -236 265 -327 340 -275 225 -609 374 -975 435 -112 19 -430 27 -545 15z" />
                    </g>
                  </svg>
                </span>
              </label>
            </div>

              <div className={classes.sendButtonDiv}>
                <button className={classes.sendButton} onClick={createDatabaseMessage} onSubmit={(e) => e.preventDefault()}>{">"}</button>
              </div>
            </div>
          </div>
      }
    </>
  )
}

export default React.memo(OpenMessages)
