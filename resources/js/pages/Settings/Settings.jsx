import React, { useEffect, useState } from 'react'
import classes from './Settings.module.scss'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import { useStateContext } from '../../context/ContextProvider';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage } from '../../redux/changeLanguage';

const Settings = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const { user } = useStateContext()

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
        <Tab className={classes.tab}>Тема</Tab>
        <Tab className={classes.tab}>Язык</Tab>
      </TabList>
      <TabPanel className={classes.tabPanel}>Тема</TabPanel>
      <TabPanel className={classes.tabPanel}>
        <button onClick={() => switchLanguage('en')}>English</button>
        <button onClick={() => switchLanguage('ru')}>Русский</button>
      </TabPanel>
    </Tabs>
  )
}

export default Settings