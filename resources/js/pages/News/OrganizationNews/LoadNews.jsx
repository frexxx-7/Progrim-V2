import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import OneNews from './OneNews/OneNews'
import axiosCLient from '../../../axios.client'
import classes from '../News.module.scss'

const LoadNews = () => {
  const currentUrl = useLocation()
  const [infoNews, setInfoNews] = useState()
  const idNews = currentUrl.pathname.split('/')[currentUrl.pathname.split('/').length - 1];

  const navigate = useNavigate()

  const loadNewsInfo = () => {
    axiosCLient.get(`/organization/news/${idNews}`)
      .then(({ data }) => {
        setInfoNews(data.news);
      })
      .catch(({ response }) => {
        if (response.status == 404) {
          navigate('/news')
        }
      })
  }
  useEffect(() => {
    loadNewsInfo()
  }, [])

  return (
    <div className={classes.newsOrganizationContainer}>
      <OneNews newsInfo={infoNews} />
    </div>
  )
}

export default LoadNews