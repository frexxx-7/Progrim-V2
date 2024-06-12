import React, { useEffect, useState } from 'react'
import classes from './ShowOrganization.module.scss'
import axiosCLient from '../../axios.client'
import Loader from '../../components/UI/Loader/Loader'
import { useNavigate } from 'react-router-dom'
import { useStateContext } from '../../context/ContextProvider'

const ShowOrganization = () => {
  const {user} = useStateContext()
  const [organizationInfo, setOrganizationInfo] = useState()
  const [loadingInfo, setLoadingInfo] = useState(true)
  const organizationId = location.pathname.split("/")[location.pathname.split("/").length - 1]
  const navigator = useNavigate()

  const loadInfoOrganization = () => {
    axiosCLient.get('/loadInfoOrganization/' + organizationId)
      .then(({ data }) => {
        console.log(data);
        setOrganizationInfo(data.organization);
        setLoadingInfo(false)
      })
  }

  useEffect(() => {
    loadInfoOrganization()
  }, [])

  return (
    <>
      {
        loadingInfo ?
          <Loader />
          :
          <div className={classes.showOrganization}>
            {
              organizationInfo.idUser == user.id &&
              <div className={classes.editButton}>
                <button onClick={() => navigator("/editOrganization/" + organizationId)}>Редактировать</button>
              </div>
            }

            <div className={classes.showOrganizationContainer}>
              <div className={classes.organizationName}>
                <h1>{organizationInfo && organizationInfo.name}</h1>
              </div>
              <div className={classes.organizationContact}>
                <p>Адрес: {organizationInfo && organizationInfo.address}</p>
                <p>Номер телефона :{organizationInfo && organizationInfo.numberPhone}</p>
              </div>
            </div>
          </div>
      }
    </>
  )
}

export default ShowOrganization