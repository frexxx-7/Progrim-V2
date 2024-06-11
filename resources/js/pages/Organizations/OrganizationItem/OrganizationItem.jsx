import React from 'react'
import classes from './OrganizationItem.module.scss'

const OrganizationItem = ({ org }) => {
  console.log(org);
  return (
    <div className={classes.OrganizationItem}>
      <div className={classes.organizationPhoto}>
        {org.icon ? <img src={org.icon} alt="" /> : ""}
      </div>
      <div className={classes.organizaiontInfo}>
        <p className={classes.organizationsName}>{org && org.name}</p>
        <p>Адрес: {org && org.address}</p>
        <p>Телефон: {org && org.numberPhone}</p>
      </div>
    </div>
  )
}

export default OrganizationItem