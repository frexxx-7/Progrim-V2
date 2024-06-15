import React from 'react'
import classes from '../ParticipantsOrganization.module.scss'
import { useStateContext } from '../../../context/ContextProvider'
import axiosCLient from '../../../axios.client'
import { NavLink } from 'react-router-dom'

const ParticipantsOrganizationItem = ({ userInfo, idOrganization, setRerender }) => {
  const { user } = useStateContext()

  const deleteParticipant = () => {
    try {
      const payload = {
        idUser: userInfo.id,
        idOrganization: idOrganization
      }
      axiosCLient.post(`/deleteParticipant/`, payload)
        .then(({ data }) => {
          setRerender(Date.now())
        })
    }
    catch (error) {
      console.error('An error occurred:', error);
    }
  }
  
  return (
    <div className={classes.organizationRequest}>
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
          <a className={classes.addButton} onClick={deleteParticipant}>
            <i className="fa-solid fa-xmark"></i>
          </a>
        </div>

      </div>
    </div>
  )
}

export default ParticipantsOrganizationItem