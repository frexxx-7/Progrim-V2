import React, { useEffect, useState } from 'react'
import UserItem from '../UserItem/UserItem'
import classes from './UserList.module.scss'
import { useSelector } from 'react-redux'
import Loader from '../../../components/UI/Loader/Loader'
import axiosCLient from '../../../axios.client'
import { useStateContext } from '../../../context/ContextProvider'

const UsersList = ({ myFriends, page }) => {
  const [usersList, setUsersList] = useState({})
  const [loadingUsers, setLoadingUsers] = useState(true)
  const [rerender, setRerender] = useState();

  const { user } = useStateContext()

  const searchQuery = useSelector(state => state.searchQuery.searchQuery)

  const loadUsers = () => {
    const payload = {
      userId: user.id
    }
    axiosCLient.post('/getAllForFriends', payload)
      .then(({ data }) => {
        setUsersList(data.users)
        setLoadingUsers(false)
      })
  }

  const loadInfoOutboxUser = () => {
    const payload = {
      userId: user.id
    }
    axiosCLient.post('/friendsRequestOutbox', payload)
      .then(({ data }) => {
        setUsersList(data.users)
        setLoadingUsers(false)
      })
  }

  const loadInfInboxUser = () => {
    const payload = {
      userId: user.id
    }
    axiosCLient.post('/friendsRequestInbox', payload)
      .then(({ data }) => {
        setUsersList(data.users)
        setLoadingUsers(false)
      })
  }

  const switchPages = () => {
    switch (page) {
      case "outbox":
        loadInfoOutboxUser();
        break;
      case "inbox":
        loadInfInboxUser();
        break;
      default:
        loadUsers();
        break;
    }
  }

  useEffect(() => {
    switchPages()
  }, [page])

  useEffect(() => {
    switchPages()
  }, [rerender])


  if (loadingUsers)
    return <Loader />

  return (
    <div className={classes.usersList}>
      <div className={classes.allUsers}>
        {usersList.map((userDataMap) => {
          if (myFriends && myFriends.find(e => e === userDataMap.id))
            return ''
          return searchQuery != '' ?
            userDataMap.name.toUpperCase().includes(searchQuery.toUpperCase()) ?
              userDataMap.id !== user.id && <UserItem
                key={`${userDataMap.id}`}
                userInfo={userDataMap}
                page={page}
                setRerender={setRerender}
              />
              :
              ""

            :
            userDataMap.id !== user.id && <UserItem
              key={`${userDataMap.id}`}
              userInfo={userDataMap}
              page={page}
              setRerender={setRerender}
            />
        })}
      </div>
    </div>
  )
}

export default React.memo(UsersList)