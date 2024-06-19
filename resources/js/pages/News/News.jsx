import React, { useEffect, useState, useRef } from 'react';
import classes from './News.module.scss';
import axios from 'axios';
import NewsItem from '../../components/NewsItem/NewsItem';
import { useTranslation } from 'react-i18next';
import GlobalNews from './GlobalNews/GlobalNews';
import OrganizationNews from './OrganizationNews/OrganizationNews';

const News = () => {
  const { t } = useTranslation()

  const switchPage = () => {
    if (window.location.pathname.split("/")[window.location.pathname.split("/").length - 1] == "global")
      return <GlobalNews />
    else
      if (Number.isInteger(+window.location.pathname.split("/")[window.location.pathname.split("/").length - 1]))
        return <OrganizationNews />
      else
        return <GlobalNews />
  }
  return (
    <>{switchPage()}</>
  );
};

export default News;
