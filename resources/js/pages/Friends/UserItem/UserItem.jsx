import React from 'react'
import { NavLink } from 'react-router-dom'
import classes from './UserItem.module.scss'
import { useStateContext } from '../../../context/ContextProvider'
import axiosCLient from '../../../axios.client'

const UserItem = ({ userInfo, page, setRerender }) => {
  const { user } = useStateContext()

  const deleteFriendRequest = () => {
    axiosCLient.get(`/deleteFriendRequest/${userInfo.friendsRequestId}`)
      .then(({ data }) => {
        setRerender(Date.now())
      })
  }

  const addFriendRequest = () => {
    const payload = {
      idSender: user.id,
      idRecipient: userInfo.id,
      state: "sent"
    }
    axiosCLient.post('/addFriendRequest', payload)
      .then(({ data }) => {
        setRerender(Date.now())
      })
  }

  const addedFriends = () => {
    try {

      const payload2 = {
        idOneUser: user.id,
        idTwoUser: userInfo.id
      }
      axiosCLient.post(`/addFriend`, payload2)
        .then(({ data }) => {
          setRerender(Date.now())
        })
      deleteFriendRequest()
    }
    catch (error) {
      console.error('An error occurred:', error);
    }
  }

  const addFriend = () => {
    switch (page) {
      case "outbox":
        deleteFriendRequest();
        break;
      case "inbox":
        addedFriends();
      default:
        page != "inbox" && addFriendRequest();
        break;
    }

  }

  return (
    <div className={classes.user}>
      <NavLink to={`/profile/${userInfo && userInfo.id}`}>
        <div className={classes.photo}>
          <img src={`/storage/${userInfo && userInfo.avatar}`} alt="photo" />
        </div>
        <div className={classes.info}>
          <p className={classes.name}>{userInfo && userInfo.name}</p>
        </div>
      </NavLink>
      <div className={classes.add}>
        <a className={classes.addButton} onClick={addFriend}>
          {
            window.innerWidth <= 620
              ?
              page == "outbox" ?
                <i class="fa-solid fa-xmark"></i>
                :
                <i className="fa-solid fa-user-plus"></i>

              :
              page == "outbox" ?
                "Отмена"
                :
                'Добавить'
          }
        </a>
      </div>

    </div>
  )
}

export default React.memo(UserItem)