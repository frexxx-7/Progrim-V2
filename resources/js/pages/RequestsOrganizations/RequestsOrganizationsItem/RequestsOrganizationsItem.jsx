import React, { useState } from 'react'
import classes from '../RequestsOrganizations.module.scss'
import { useStateContext } from '../../../context/ContextProvider'
import { NavLink } from 'react-router-dom'
import axiosCLient from '../../../axios.client'

const RequestsOrganizationsItem = ({ userInfo, idOrganization, setRerender }) => {
  const { user } = useStateContext()

  const applyRequest = () => {
    try {
      const payload = {
        idUser: userInfo.id,
        idOrganization: idOrganization
      }
      axiosCLient.post(`/applyRequestOrganization`, payload)
        .then(({ data }) => {
          setRerender(Date.now())
        })
    }
    catch (error) {
      console.error('An error occurred:', error);
    }
  }

  return (
    <div className={classes.user}>
      <NavLink to={`/profile/${userInfo && userInfo.id}`}>
        <div className={classes.photo}>
          <img src={`/storage/${userInfo && userInfo.avatar}`} alt="photo" />
        </div>
        <div className={classes.info}>
          <p className={classes.name}>{userInfo && userInfo.name}</p>
        </div>
      </NavLink>
      <div className={classes.add}>
        <a className={classes.addButton} onClick={applyRequest}>
          <i className="fa-solid fa-user-plus"></i>
        </a>
      </div>

    </div>
  )
}

export default RequestsOrganizationsItem