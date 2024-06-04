import React, { useEffect, useState } from 'react'
import classes from './Friends.module.scss'
import Loader from '../../components/UI/Loader/Loader'
import UsersList from './UserList/UserList'
import { useStateContext } from '../../context/ContextProvider'
import axiosCLient from '../../axios.client'

const InboxFriends = () => {
  const { user } = useStateContext()
  const [visibleLoader, setVisibleLoader] = useState()
  const [inboxFriends, setInboxFriends] = useState()

  const loadInfoInboxUser = () => {
    const payload = {
      userId: user.id
    }
    axiosCLient.post('/friendsRequestInbox', payload)
      .then(({ data }) => {
        setVisibleLoader(false)
        setInboxFriends(data.users)
      })
  }

  useEffect(() => {
    user.id &&
      loadInfoInboxUser()
  }, [user])

  return (
    <>
      <div className={classes.friendListH2}>
        <h2>Входящие заявки</h2>
      </div>

      <div className={classes.frinedsListFriend}>
        {
           visibleLoader
           ? <Loader />
           : <UsersList myFriends={inboxFriends && Object.entries(inboxFriends).map(([value]) => value)} page={"inbox"}/>
        }
      </div>
    </>
  )
}

export default InboxFriends