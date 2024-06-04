import React, {useState } from 'react'
import classes from './Friends.module.scss'
import Loader from '../../components/UI/Loader/Loader'
import FriendsItem from './FriendsItem'


const FriendsList = ({visibleLoader, friends}) => {
  console.log(friends);
  if (visibleLoader)
    return <Loader />

  return (
    <>
      <div className={classes.friendListH2}>
        <h2>Список друзей</h2>
      </div>
      <div className={classes.friendListDiv}>
        <div className={classes.allFriends}>
          <div className={classes.frinedsListFriend}>
            {Object.keys(friends).length === 0
              ?
              <div className={classes.noFriendsDiv}>
                <h2 className={classes.noFriends}>
                  Нет друзей
                </h2>
              </div>
              :
              Object.entries(friends).map(([key, value]) => (
                <FriendsItem key={key} friend={value}/>
              ))
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default React.memo(FriendsList)