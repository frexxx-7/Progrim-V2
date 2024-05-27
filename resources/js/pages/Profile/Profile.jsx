import React from 'react'
import { useStateContext } from '../../context/ContextProvider';
import classes from './Profile.module.scss'

const Profile = () => {
  const { user } = useStateContext()
  console.log(user);
  return (
    <div className={classes.profile}>
      <div className={classes.profile_posts}>

      </div>
      <div className={classes.profile_info}>
        <div className={classes.profile_image}>
          <img src={"storage/" + user.avatar} alt="" />
        </div>
        <div className={classes.profile_name}>
          {user.name}
        </div>
        <div className={classes.profile_quote}>
          {user.quote}
        </div>
        <div className={classes.profile_edit_button}>
          <button>Редактировать</button>
        </div>
      </div>
    </div>
  )
}

export default Profile