import React from 'react'
import classes from './Header.module.scss'
import Aside from '../Aside/Aside'

const Header = () => {
  return (
    <div className={classes.header}>
      <div className={classes.header_icon}>
        <p>PR</p>
        <img src="./icon.png" alt="icon" />
        <p>GRIM</p>
      </div>
      <Aside />
    </div>
  )
}

export default Header