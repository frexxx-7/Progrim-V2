import React from 'react'
import classes from "./Loader.module.scss"

const Loader = () => {
  return (
    <div className={classes.loaderContainer}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" width="226" height="226" style={{ shapeRendering: "auto", display: "block", background: "transparent" }} xmlnsXlink="http://www.w3.org/1999/xlink"><g><circle strokeLinecap="round" fill="none" strokeDasharray="37.69911184307752 37.69911184307752" stroke="#000000" strokeWidth="5" r="24" cy="50" cx="50">
        <animateTransform values="0 50 50;360 50 50" keyTimes="0;1" repeatCount="indefinite" dur="1.5384615384615383s" type="rotate" attributeName="transform"></animateTransform>
      </circle>
        <circle strokeLinecap="round" fill="none" strokeDashoffset="28.274333882308138" strokeDasharray="28.274333882308138 28.274333882308138" stroke="#777777" strokeWidth="5" r="18" cy="50" cx="50">
          <animateTransform values="0 50 50;-360 50 50" keyTimes="0;1" repeatCount="indefinite" dur="1.5384615384615383s" type="rotate" attributeName="transform"></animateTransform>
        </circle><g></g></g></svg>
    </div>
  )
}

export default Loader