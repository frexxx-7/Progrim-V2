import React from 'react'
import classes from './Header.module.scss'

const Header = () => {
  return (
    <div className={classes.header}>
      <div className={classes.header_icon}>
        <p>PR</p>
        <img src="./icon.png" alt="icon" />
        <p>GRIM</p>
      </div>
    </div>
  )
}

export default Header