import React, { useRef, useState } from 'react'
import classes from './Messages.module.scss'
import { useTranslation } from 'react-i18next'
import AIMessage from './AIMessage/AIMessage'

const ChatsImage = () => {
  const [aiMessager, setAIMessager] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const { t } = useTranslation()

  const inputRef = useRef();

  const [aiMessages, setAiMessages] = useState([
    {
      message: t("messages.aiMessage"),
      sender: "ChatGPT"
    }
  ])

  const API_KEY = "6ee0753c4c7e45059480750e469f852e"

  const handleSend = async () => {
    const newMessage = {
      message: inputRef.current.value,
      sender: "user",
      direction: "outgoing"
    }

    const newMessages = [...aiMessages, newMessage]
    setAiMessages(newMessages)

    setIsTyping(true)

    await processMessageToChatGPT(newMessages)

    inputRef.current.value = ""
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSend()
    }
  }

  async function processMessageToChatGPT(chatMessages){
    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message}
    });

    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [ 
        ...apiMessages 
      ]
    }

    await fetch("https://api.aimlapi.com/chat/completions", 
      {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + API_KEY,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(apiRequestBody)
      }).then((data) => {
        return data.json();
      }).then((data) => {
        console.log(data);
        setAiMessages([...chatMessages, {
          message: data.choices[0].message.content,
          sender: "ChatGPT"
        }]);
        setIsTyping(false);
      });
  }


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
                  {
                    aiMessages.map((message, i) => <AIMessage key={i} message={message} />)
                  }

                </div>  
                {
                  isTyping && <div className={classes.typingContainer}><p>{t("messages.typing")}</p></div>
                }
                <div className={classes.aiChatMessageInputContainer}>
                  <input onKeyPress={handleKeyPress} ref={inputRef} type="text" placeholder={t("messages.sendMessage")} />
                  <button onClick={handleSend}> > </button>
                </div>
              </div>
            </div>
          </div>
      }
    </>
  )
}

export default ChatsImage