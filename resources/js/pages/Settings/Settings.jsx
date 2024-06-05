import React, { useEffect, useState } from 'react'
import classes from './Settings.module.scss'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import { useStateContext } from '../../context/ContextProvider';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage } from '../../redux/changeLanguage';
import { useTranslation } from 'react-i18next';
import { setAdditionalColor, setFontColor, setMainColor } from '../../redux/changeColors';
import { HexColorPicker } from "react-colorful";

const Settings = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const { user } = useStateContext()
  const { t } = useTranslation()
  const [mainColor, setMainColor] = useState(useSelector(state => state.changeColors.mainColor));
  const [fontColor, setFontColor] = useState(useSelector(state => state.changeColors.fontColor));
  const [additionalColor, setAdditionalColor] = useState(useSelector(state => state.changeColors.additionalColor));
  const dispatch = useDispatch();

  const _changeLanguage = (lang) => {
    dispatch(setLanguage(lang))
  }

  const _changeColors = (mainColor, fontColor, additionalColor) => {
    dispatch(setMainColor(mainColor))
    dispatch(setFontColor(fontColor))
    dispatch(setAdditionalColor(additionalColor))
  }

  const switchLanguage = async (lang) => {
    try {
      localStorage.setItem("lang", lang)
      _changeLanguage(lang)

    } catch (error) {
      console.error('Error switching language', error);
    }
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

        <div className={classes.editColors_container}>
          <div className={classes.editColors}>
            <div className={classes.editColorItem}>
              <p className={classes.editColorTitle}>Главный цвет:</p>
              <div className={classes.editColorContainer}>
                <HexColorPicker color={mainColor} onChange={setMainColor} />
              </div>
            </div>
            <div className={classes.editColorItem}>
              <p className={classes.editColorTitle}>Цвет шрифт:</p>
              <div className={classes.editColorContainer}>
                <HexColorPicker color={fontColor} onChange={setFontColor} />
              </div>
            </div>
            <div className={classes.editColorItem}>
              <p className={classes.editColorTitle}>Дополнитель цвет:</p>
              <div className={classes.editColorContainer}>
                <HexColorPicker color={additionalColor} onChange={setAdditionalColor} />
              </div>
            </div>
          </div>
          <div className={classes.exampleContainer}>
            <div className={classes.example} style={{ background: `linear-gradient(-45deg, ${mainColor}, ${additionalColor})`, backgroundColor: { mainColor } }}>
              <div className={classes.exampleBackground} >
              </div>
              <div className={classes.exampleBackgroundContainer}>
                <p style={{ color: fontColor }}>Примерный текст</p>
                <p style={{ color: fontColor }}>1 2 3 4 5 6 7 8 9 0</p>
                <button>Кнопка</button>
                <input type="text" value={"Текстовое поле"} />
              </div>
            </div>
          </div>
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