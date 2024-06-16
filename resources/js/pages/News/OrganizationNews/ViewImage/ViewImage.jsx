import React from 'react'
import classes from './ViewImage.module.scss'

const ViewImage = ({image}) => {
  return (
    <div className={classes.imageContainer}>
        <img src={image} alt="" />
    </div>
  )
}

export default ViewImage