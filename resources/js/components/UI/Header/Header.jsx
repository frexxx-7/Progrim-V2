import React from 'react'
import classes from './Header.module.scss'
import Aside from '../Aside/Aside'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux';

const Header = () => {
  const location = useLocation()
  const fontcolor_ = useSelector(state => state.changeColors.fontColor)
  
  return (
    <div className={classes.header}>
      <div className={classes.header_icon} style={{color:fontcolor_}}>
        <p>PR</p>
        <img src="/icon.png" alt="icon" />
        <p>GRIM</p>
      </div>
      {
        location.pathname != '/signin' && location.pathname != '/signup' &&
        <Aside />
      }
    </div>
  )
}

export default Header