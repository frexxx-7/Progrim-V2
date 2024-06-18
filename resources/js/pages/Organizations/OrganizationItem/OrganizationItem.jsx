import React from 'react'
import classes from './OrganizationItem.module.scss'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const OrganizationItem = ({ org }) => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  
  return (
    <div className={classes.OrganizationItem} onClick={() => navigate("/organization/"+org.id)}>
      <div className={classes.organizationPhoto}>
        {org.icon ? <img src={org.icon} alt="" /> : ""}
      </div>
      <div className={classes.organizaiontInfo}>
        <p className={classes.organizationsName}>{org && org.name}</p>
        <p>{t("organizations.address")}: {org && org.address}</p>
        <p>{t("organizations.phone")}: {org && org.numberPhone}</p>
      </div>
    </div>
  )
}

export default OrganizationItem