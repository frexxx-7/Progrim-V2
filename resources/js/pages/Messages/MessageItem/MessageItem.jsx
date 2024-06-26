import React from 'react'
import classes from './MessageItem.module.scss'
import { useStateContext } from '../../../context/ContextProvider'

const MessageItem = ({value}) => {
  const { user } = useStateContext()
  
  const getDate = (date) => {
    const timePost = new Date(date).toLocaleTimeString().slice(0, -3)
    const datePost = new Date(date).toLocaleDateString()
    return `${datePost} ${timePost}`
  }
  const handleDownload = (fileId) => {
    window.location.href = `/storage/message_files/${fileId}`;
  };
  return (
    <div className={value.sender.id === user.id ? classes.messageItemMyMessage : classes.messageUserMessage}>
      <div className={value.sender.id === user.id ? classes.myImage : classes.image}>
        <img src={`/storage/${value.sender.id === user.id ? user.avatar : value.sender.avatar}`} alt="" />
      </div>
      <div className={value.sender.id === user.id ? classes.messageItemMyContainer : classes.messageUserContainer}>
        <div className={value.sender.id === user.id ? classes.myMessageItem : classes.messageItem}>
          <div className={value.sender.id === user.id ? classes.myBody : classes.body}>
            <p>{value.text}</p>
          </div>
          <div className={value.sender.id === user.id ? classes.myInfo : classes.info}>
            <p className={value.sender.id === user.id ? classes.myDate : classes.date}>
              {getDate(value.created_at)}
            </p>
          </div>
        </div>
        {value.files && value.files.length > 0 && (
        <div className={classes.fileAttachments}>
          {value.files.map((file) => (
            <div key={file.id} className={classes.fileAttachment}>
              <a href={`/storage/${file.pathFile}`} download>
                Download 
              </a>
            </div>
          ))}
        </div>
      )}
      </div>
      
    </div>
  )
}

export default React.memo(MessageItem)