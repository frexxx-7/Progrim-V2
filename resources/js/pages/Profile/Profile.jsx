import React from 'react'
import { useStateContext } from '../../context/ContextProvider';
import classes from './Profile.module.scss'
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Profile = () => {
  const { user } = useStateContext()
  const navigate = useNavigate()
  const {t} = useTranslation()

  return (
    <div className={classes.profile}>
      <div className={classes.profile_posts}>
        {user.addittionalInfo && <div dangerouslySetInnerHTML={{ __html: user.addittionalInfo }} />}
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
          <button onClick={()=>{navigate("/editProfile")}}>{t("profile.editButton")}</button>
        </div>
      </div>
    </div>
  )
}

export default Profile