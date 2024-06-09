import React, { useState } from 'react'
import classes from './Organizations.module.scss'
import OrganizationItem from './OrganizationItem/OrganizationItem'
import { useNavigate } from 'react-router-dom'

const Organizations = () => {
  const [organizations, setOrganizations] = useState([])

  const navigator = useNavigate();

  return (
    <div className={classes.organizations}>
      <div className={classes.pageTitle}>
        <h1>Организации</h1>
      </div>
      <div className={classes.createOrganization}>
        <button onClick={()=>navigator("/createOrganization")}>Создать</button>
      </div>
      <div className={classes.listOrganizations}>
        {organizations.map((org, i) => {
          <OrganizationItem org={org} key={i}/>
        })}
      </div>
    </div>
  )
}

export default Organizations