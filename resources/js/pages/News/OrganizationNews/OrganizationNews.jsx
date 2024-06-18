import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import classes from '../News.module.scss';
import axiosCLient from '../../../axios.client';
import { useStateContext } from '../../../context/ContextProvider';
import OrganizationNewsItem from './OrganizationNewsItem/OrganizationNewsItem';
import { useNavigate } from 'react-router-dom';

const OrganizationNews = () => {
  const { t } = useTranslation()
  const { user } = useStateContext()
  const [pageTitle, setPageTitle] = useState(t("news.titleOrg"))
  const [organizationInfo, setOrganizationInfo] = useState()
  const organizationId = location.pathname.split("/")[location.pathname.split("/").length - 1]
  const [news, setNews] = useState([]);
  const navigator = useNavigate()

  const loadInfoOrganization = () => {
    axiosCLient.get('/loadInfoOrganization/' + organizationId)
      .then(({ data }) => {
        setOrganizationInfo(data.organization);
      })
  }

  const loadOrganizationNews = () => {
    axiosCLient.get('/organization/' + organizationId + '/news')
      .then(({ data }) => {
        console.log(data);
        setNews(data.news);
      })
  }

  useEffect(() => {
    loadInfoOrganization()
    loadOrganizationNews()
  }, [])

  return (
    <div className={classes.mainContent}>
      <div className={classes.pageTitle}>
        <h1>{pageTitle}</h1>
      </div>
      {
        organizationInfo && organizationInfo.idUser == user.id &&
        <div className={classes.adminPanel}>
          <div className={classes.filterPanelButton}>
            <button onClick={() => navigator("/organization/addNews/" + organizationId)}>{t("friends.addButton")}</button>
          </div>

        </div>
      }
      <div className={classes.newsContent}>
        {
          news.length == 0 &&
          <div className={classes.noNews}>{t("news.noNews")}</div>
        }
        {news && news.map((item, key) =>
          user.id == organizationInfo.idUser ?
            <OrganizationNewsItem data={item} key={key} />
            :
            item.is_published == 1 &&
            <OrganizationNewsItem data={item} key={key} />

        )}
      </div>
    </div>
  )
}

export default OrganizationNews