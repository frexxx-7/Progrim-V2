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
  const [mainColor_, setMainColor_] = useState(useSelector(state => state.changeColors.mainColor));
  const [fontColor_, setFontColor_] = useState(useSelector(state => state.changeColors.fontColor));
  const [additionalColor_, setAdditionalColor_] = useState(useSelector(state => state.changeColors.additionalColor));
  const dispatch = useDispatch();

  const _changeLanguage = (lang) => {
    dispatch(setLanguage(lang))
  }

  const _changeColors = (mainColor, fontColor, additionalColor) => {
    dispatch(setMainColor(mainColor))
    dispatch(setFontColor(fontColor))
    dispatch(setAdditionalColor(additionalColor))
    localStorage.setItem("main_color", mainColor_)
    localStorage.setItem("font_color", fontColor_)
    localStorage.setItem("additional_color", additionalColor_)
    document.body.style.setProperty('--main_color', mainColor_)
    document.body.style.setProperty('--font_color', fontColor_)
    document.body.style.setProperty('--additional_color', additionalColor_)
  }

  const switchLanguage = async (lang) => {
    try {
      localStorage.setItem("lang", lang)
      _changeLanguage(lang)

    } catch (error) {
      console.error('Error switching language', error);
    }
  };

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .${classes.exampleBackground}::after {
        background-color: ${mainColor_};      
      }
    `;

    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [mainColor_]);

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .${classes.exampleButton}:hover {
        background-color: ${mainColor_}!important; 
      }
    `;
    console.log(style);

    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, [mainColor_])

  useEffect(() => {
    const style = document.createElement('style');

    style.innerHTML = `
    .${classes.exampleButton} {
      color: ${fontColor_}!important; 
    }
      .${classes.exampleInput}::-webkit-input-placeholder {
        color: ${fontColor_}!important; 
      }
      .${classes.exampleInput}::-moz-placeholder {
        color: ${fontColor_}!important; 
      }
    `;
    console.log(style);

    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, [fontColor_])

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
                <HexColorPicker color={mainColor_} onChange={setMainColor_} />
              </div>
            </div>
            <div className={classes.editColorItem}>
              <p className={classes.editColorTitle}>Цвет шрифт:</p>
              <div className={classes.editColorContainer}>
                <HexColorPicker color={fontColor_} onChange={setFontColor_} />
              </div>
            </div>
            <div className={classes.editColorItem}>
              <p className={classes.editColorTitle}>Дополнитель цвет:</p>
              <div className={classes.editColorContainer}>
                <HexColorPicker color={additionalColor_} onChange={setAdditionalColor_} />
              </div>
            </div>
          </div>
          <div className={classes.exampleContainer}>
            <div className={classes.example} style={{ background: `linear-gradient(-45deg, ${mainColor_}, ${additionalColor_})`, backgroundColor: { mainColor: mainColor_ } }}>
              <div className={classes.exampleBackground}>
              </div>
              <div className={classes.exampleBackgroundContainer}>
                <p style={{ color: fontColor_, fontWeight:500 }}>Примерный текст</p>
                <p style={{ color: fontColor_, fontWeight:500 }}>1 2 3 4 5 6 7 8 9 0</p>
                <button className={classes.exampleButton}>Кнопка</button>
                <input className={classes.exampleInput} type="text" style={{ color: fontColor_, borderColor: fontColor_ }} placeholder={"Текстовое поле"} />
              </div>
            </div>
          </div>
        </div>
        <div className={classes.saveButton}>
          <button onClick={()=>_changeColors(mainColor_, fontColor_,additionalColor_)}>Сохранить</button>
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