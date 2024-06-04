import React, { useState } from 'react'
import classes from './Friends.module.scss'
import UsersList from './UserList/UserList'
import Loader from '../../components/UI/Loader/Loader'

const SearchFriends = ({visibleLoader, friends}) => {
  return (
    <>
      <div className={classes.friendListH2}>
        <h2>Поиск друзей</h2>
      </div>

      <div className={classes.frinedsListFriend}>
        {
          visibleLoader
            ? <Loader/>
            : <UsersList myFriends={friends && Object.entries(friends).map(([value]) => value)}/>
        }
      </div>
    </>
  )
}

export default React.memo(SearchFriends)