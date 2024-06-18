import React, { useEffect, useState } from 'react'
import classes from './OneNews.module.scss'
import classes2 from '../../News.module.scss'
import axiosCLient from '../../../../axios.client'
import Loader from '../../../../components/UI/Loader/Loader'
import { useNavigate } from 'react-router-dom'
import { useStateContext } from '../../../../context/ContextProvider'
import { useTranslation } from 'react-i18next'

const OneNews = ({ newsInfo }) => {
  const organizationId = location.pathname.split('/')[location.pathname.split('/').length - 2]
  const { t } = useTranslation()
  const { user } = useStateContext()
  const [organizationInfo, setOrganizationInfo] = useState()
  const navigator = useNavigate()

  const loadInfoOrganization = () => {
    axiosCLient.get('/loadInfoOrganization/' + organizationId)
      .then(({ data }) => {
        setOrganizationInfo(data.organization);
      })
  }

  useEffect(() => {
    loadInfoOrganization()
  }, [])

  return (
    <>
      {
        organizationInfo && organizationInfo.idUser == user.id &&
        <div className={classes2.adminPanel}>
          <div className={classes2.filterPanelButton}>
            <button onClick={() => navigator("/organization/editNews/" + newsInfo.id)}>{t("profile.editButton")}</button>
          </div>

        </div>
      }
      <div className={classes.infoNews}>

        {
          newsInfo ?
            <div className={classes.News}>
              <div className={classes.newsContent}>
                {
                  newsInfo.image &&
                  <div className={classes.image}>
                    <img src={"/storage/" + newsInfo.image} alt="image" />
                  </div>
                }
                <div className={classes.title}>
                  {newsInfo.title}
                </div>
              </div>
              <div className={classes.content}>
                {newsInfo.content}
              </div>
            </div>
            :
            <Loader />
        }
      </div >
    </>
  )
}

export default OneNews