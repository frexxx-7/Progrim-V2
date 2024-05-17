import React from 'react'
import classes from './Main.module.scss'
import Aside from '../../components/UI/Aside/Aside'

const Main = ({children}) => {
  return (
    <div className='main'>
      <Aside />
      <div className={classes.mainContent}>{children}</div>
    </div>
  )
}

export default Main