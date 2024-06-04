import React from 'react'
import { useStateContext } from '../../context/ContextProvider';
import classes from './Profile.module.scss'
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user } = useStateContext()
  const navigate = useNavigate()
  
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
          <button onClick={()=>{navigate("/editProfile")}}>Редактировать</button>
        </div>
      </div>
    </div>
  )
}

export default Profile