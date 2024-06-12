import React from 'react'
import classes from './OrganizationItem.module.scss'
import { useNavigate } from 'react-router-dom'

const OrganizationItem = ({ org }) => {
  const navigate = useNavigate()
  
  return (
    <div className={classes.OrganizationItem} onClick={() => navigate("/organization/"+org.id)}>
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