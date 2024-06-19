import React, { useEffect, useRef, useState } from 'react'
import classes from './Aside.module.scss'
import { useStateContext } from '../../../context/ContextProvider';
import { Link, useLocation } from 'react-router-dom';
import axiosCLient from '../../../axios.client';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const Aside = () => {
  const { user, setUser, setToken } = useStateContext();
  const [showAside, setShowAside] = useState(false);
  const asideRef = useRef(null);
  const location = useLocation()
  const mainColor_ = useSelector(state => state.changeColors.mainColor)
  const fontcolor_ = useSelector(state => state.changeColors.fontColor)

  const [paticipantInfo, setParticipantInfo] = useState()

  const { t } = useTranslation()

  const onLogout = (ev) => {
    ev.preventDefault();

    axiosCLient.post('/logout')
      .then(() => {
        setUser({});
        setToken(null);
      });
  };

  const handleClickOutside = (event) => {
    if (asideRef.current && !asideRef.current.contains(event.target)) {
      setShowAside(false);
    }
  };

  useEffect(() => {
    if (showAside) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showAside]);

  useEffect(() => {
    setShowAside(false)
  }, [location])

  useEffect(() => {
    user.id &&
      checkUserInOrganization()
  }, [user])

  const checkUserInOrganization = () => {
    const payload = {
      idUser: user.id
    }
    axiosCLient.post('/checkUserInOrg', payload)
      .then((response) => {
        setParticipantInfo(response.data.participant[0])
      });
  }
  return (
    <aside ref={asideRef} className={classes.aside}>
      <div className={classes.aside_button} onClick={() => setShowAside(!showAside)}>
        {
          showAside ?
            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill={fontcolor_} height="800px" width="800px" version="1.1" id="Layer_1" viewBox="0 0 330 330" xmlSpace="preserve">
              <path id="XMLID_222_" d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001  c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213  C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606  C255,161.018,253.42,157.202,250.606,154.389z" />
            </svg>
            :
            <svg xmlns="http://www.w3.org/2000/svg" width="800px" height="600px" viewBox="0 0 24 24" fill={fontcolor_}>
              <path d="M4 18L20 18" stroke={fontcolor_} strokeWidth="2" strokeLinecap="round" />
              <path d="M4 12L20 12" stroke={fontcolor_} strokeWidth="2" strokeLinecap="round" />
              <path d="M4 6L20 6" stroke={fontcolor_} strokeWidth="2" strokeLinecap="round" />
            </svg>
        }
      </div>
      <div className={[classes["aside_content"], showAside ? classes["asideW"] : "" ].join(" ")} style={{ opacity: showAside ? "1" : "0", padding: showAside ? "20px" : "0" }}>
      <div className={classes.you_info}>
        <Link to={"/profile"} className={classes.user_login}>
          <img src={"/storage/" + user.avatar} alt="" /> {user.name}
        </Link>
      </div>
      <ul>
        <li>
          <Link to={"/main"}>{t("aside.main")}</Link>
        </li>
        <li>
          <Link to={"/news/global"}>{t("aside.news")}</Link>
        </li>
        {paticipantInfo &&
          <li>
            <Link to={"/news/organization/" + paticipantInfo.idOrganization}>{t("aside.newsOrg")}</Link>
          </li>
        }
        <li>
          <Link to={"/organizations"}>{t("aside.organizations")}</Link>
        </li>
        {paticipantInfo &&

          <li>
            <Link to={"/organization/" + paticipantInfo.idOrganization}>{t("aside.myOrg")}</Link>
          </li>
        }
        {paticipantInfo &&

          <li>
            <Link to={"/organization/interactiveMap/" + paticipantInfo.idOrganization}>{t("aside.interactiveMap")}</Link>
          </li>
        }
        <li>
          <Link to={"/messages"}>{t("aside.messages")}</Link>
        </li>
        <li>
          <Link to={"/friends"}>{t("aside.friends")}</Link>
        </li>
        <li className={classes.settingLink}>
          <Link to={"/settings"}>{t("aside.settings")}</Link>
        </li>
        <li className={classes.exitLink}>
          <a onClick={onLogout}>{t("aside.exit")}</a>
        </li>
      </ul>
    </div>
    </aside >
  );
};

export default Aside;