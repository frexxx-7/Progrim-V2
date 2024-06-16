import React, { useEffect, useState } from 'react'
import { useStateContext } from '../../context/ContextProvider';
import classes from './Profile.module.scss'
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axiosCLient from '../../axios.client';
import Modal from '../../components/UI/Modal/Modal';
import ViewImage from '../News/OrganizationNews/ViewImage/ViewImage';

const Profile = () => {
  const { user } = useStateContext()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [userInfo, setUserInfo] = useState()
  const [visibleModal, setVisibleModal] = useState(false)

  const idUser = location.pathname.split("/")[location.pathname.split("/").length - 1]

  const loadInfoUser = () => {
    axiosCLient.get('/loadInfoUser/' + idUser)
      .then((response) => {
        setUserInfo(response.data.user);
      });
  }

  useEffect(() => {
    if (!isNaN(idUser)) {
      loadInfoUser()
    }
  }, [])

  return (
    <div className={classes.profile}>
      <div className={classes.profile_posts}>
        {!userInfo ?
          user.addittionalInfo && <div dangerouslySetInnerHTML={{ __html: user.addittionalInfo }} />
          :
          userInfo.addittionalInfo && <div dangerouslySetInnerHTML={{ __html: userInfo.addittionalInfo }} />
        }
      </div>
      <div className={classes.profile_info}>
        <div className={classes.profile_image}>
          <Modal visible={visibleModal} setVisible={setVisibleModal} children={<ViewImage image={`/storage/${!userInfo ? user.avatar : userInfo.avatar}`} />} />

          <img src={`/storage/${!userInfo ? user.avatar : userInfo.avatar}`} alt="" onClick={()=>setVisibleModal(true)}/>
        </div>
        <div className={classes.profile_name}>
          {
            !userInfo ?
              user.name
              :
              userInfo.name
          }
        </div>
        <div className={classes.profile_quote}>
          {
            !userInfo ?
              user.quote
              :
              userInfo.quote
          }
        </div>
        {
          !userInfo &&
          <div className={classes.profile_edit_button}>
            <button onClick={() => { navigate("/editProfile") }}>{t("profile.editButton")}</button>
          </div>
        }
      </div>
    </div>
  )
}

export default Profile