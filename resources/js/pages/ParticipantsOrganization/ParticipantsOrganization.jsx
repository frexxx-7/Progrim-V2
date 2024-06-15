import React, { useEffect, useState } from 'react'
import axiosCLient from '../../axios.client'
import classes from './ParticipantsOrganization.module.scss'
import ParticipantsOrganizationItem from './ParticipantsOrganizationItem/ParticipantsOrganizationItem'

const ParticipantsOrganization = ({ organizationId }) => {
  const [participantOrganization, setParticipantOrganization] = useState([])
  const [rerender, setRerender] = useState(Date.now)

  const loadInfoParticipants = () => {
    const payload = {
      idOrganization: organizationId,
    }
    axiosCLient.post('/loadInfoParticipant', payload)
      .then(({ data }) => {
        setParticipantOrganization(data.participant)
      })
  }

  useEffect(() => {
    loadInfoParticipants()
  }, [])

  useEffect(() => {
    loadInfoParticipants()
  }, [rerender])
  return (
    <div className={classes.organizationRequest}>
      <div className={classes.organizationRequestTitle}>
        <h2>Список участников</h2>
      </div>
      {
        participantOrganization.length == 0 ?
          <div className={classes.noRequests}>Нету участников</div>
          :
          participantOrganization.map((item, key) => {
            return <ParticipantsOrganizationItem key={key} userInfo={item.user} idOrganization={organizationId} setRerender={setRerender} />
          })
      }
    </div>
  )
}

export default ParticipantsOrganization