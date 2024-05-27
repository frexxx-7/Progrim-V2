import React from 'react'
import classes from './Main.module.scss'

const Main = ({children}) => {
  return (
    <div className='main'>
      <div className={classes.mainContent}>{children}</div>
    </div>
  )
}

export default Main