import React, { useEffect, useState } from 'react'
import axiosCLient from '../../axios.client'
import { useStateContext } from '../../context/ContextProvider'
import classes from './Friends.module.scss'
import UsersList from './UserList/UserList'
import Loader from '../../components/UI/Loader/Loader'

const OutBoxFriends = () => {
  const { user } = useStateContext()
  const [visibleLoader, setVisibleLoader] = useState(true)
  const [outboxFriends, setOutboxFriends] = useState()

  const loadInfoOutboxUser = () => {
    const payload = {
      userId: user.id
    }
    axiosCLient.post('/friendsRequestOutbox', payload)
      .then(({ data }) => {
        setVisibleLoader(false)
        setOutboxFriends(data.users)
      })
  }
  useEffect(() => {
    user.id &&
      loadInfoOutboxUser()
  }, [user])

  return (
    <>
      <div className={classes.friendListH2}>
        <h2>Исходящие заявки</h2>
      </div>

      <div className={classes.frinedsListFriend}>
        {
          visibleLoader
            ? <Loader />
            : <UsersList myFriends={outboxFriends && Object.entries(outboxFriends).map(([value]) => value)} page={"outbox"}/>
        }
      </div>
    </>
  )
}

export default OutBoxFriends