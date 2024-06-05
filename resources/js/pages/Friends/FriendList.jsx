import React, { useState } from 'react'
import classes from './Friends.module.scss'
import Loader from '../../components/UI/Loader/Loader'
import FriendsItem from './FriendsItem'
import { useTranslation } from 'react-i18next'


const FriendsList = ({ visibleLoader, friends, setRerender }) => {
  const { t } = useTranslation()

  if (visibleLoader)
    return <Loader />


  return (
    <>
      <div className={classes.friendListH2}>
        <h2>{t("friends.myFriendsTitle")}</h2>
      </div>
      <div className={classes.friendListDiv}>
        <div className={classes.allFriends}>
          <div className={classes.frinedsListFriend}>
            {Object.keys(friends).length === 0
              ?
              <div className={classes.noFriendsDiv}>
                <h2 className={classes.noFriends}>
                  {t("friends.noFriends")}
                </h2>
              </div>
              :
              Object.entries(friends).map(([key, value]) => (
                <FriendsItem key={key} friend={value} setRerender={setRerender} />
              ))
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default React.memo(FriendsList)