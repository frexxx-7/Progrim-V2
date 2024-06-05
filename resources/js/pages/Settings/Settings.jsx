import React, { useEffect, useState } from 'react'
import classes from './Settings.module.scss'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import { useStateContext } from '../../context/ContextProvider';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage } from '../../redux/changeLanguage';
import { useTranslation } from 'react-i18next';

const Settings = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const { user } = useStateContext()
  const { t } = useTranslation()

  const dispatch = useDispatch();

  const _changeLanguage = (lang) => {
    dispatch(setLanguage(lang))
  }
  const lang_ = useSelector(state => state.lang.lang)

  const switchLanguage = async (lang) => {

    try {
      localStorage.setItem("lang", lang)
      _changeLanguage(lang)
      console.log("redux " + lang_);

    } catch (error) {
      console.error('Error switching language', error);
    }
    console.log(localStorage.getItem("lang"))
  };


  return (
    <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)} className={classes.tabs}>
      <TabList className={classes.tablist}>
        <Tab className={classes.tab}>{t("settings.aside.theme")}</Tab>
        <Tab className={classes.tab}>{t("settings.aside.language")}</Tab>
      </TabList>
      <TabPanel className={classes.tabPanel}>
        <div className={classes.title}>
          <p>{t("settings.aside.theme")}</p>
        </div>
      </TabPanel>
      <TabPanel className={classes.tabPanel}>
        <div className={classes.title}>
          <p>{t("settings.language.selectLang")}</p>
        </div>
        <div className={classes.languages}>
          <button onClick={() => switchLanguage('en')}>English</button>

          <button onClick={() => switchLanguage('ru')}>Русский</button>
        </div>
      </TabPanel>
    </Tabs>
  )
}

export default Settings