import React, { useEffect, useState } from 'react'
import classes from './Organizations.module.scss'
import OrganizationItem from './OrganizationItem/OrganizationItem'
import { useNavigate } from 'react-router-dom'
import axiosCLient from '../../axios.client'
import Loader from '../../components/UI/Loader/Loader'

const Organizations = () => {
  const [organizations, setOrganizations] = useState([])
  const [loadOrganizations, setLoadingOrganizations] = useState(true)

  const navigator = useNavigate();

  const loadInfoOrganizations = () => {
    axiosCLient.get('/organizations')
      .then(({ data }) => {
        setOrganizations(data.organizations);
        setLoadingOrganizations(false)
      })
  }

  useEffect(() => {
    loadInfoOrganizations()
  }, [])

  return (
    <>
      {
        loadOrganizations ?
          <Loader />
          :
          <div className={classes.organizations}>
            <div className={classes.pageTitle}>
              <h1>Организации</h1>
            </div>
            <div className={classes.createOrganization}>
              <button onClick={() => navigator("/createOrganization")}>Создать</button>
            </div>
            <div className={classes.listOrganizations}>
              {organizations.map((org, i) => {
                return <OrganizationItem org={org} key={i} />
              })}
            </div>
          </div>
      }
    </>

  )
}

export default Organizations