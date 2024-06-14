import React, { useEffect, useState } from 'react'
import classes from './RequestsOrganizations.module.scss'
import axiosCLient from '../../axios.client'
import RequestsOrganizationsItem from './RequestsOrganizationsItem/RequestsOrganizationsItem'

const RequestsOrganizations = ({ organizationId }) => {
  const [organizationRequest, setOrganizationRequests] = useState([])
  const [rerender, setRerender] = useState(Date.now)

  const loadInfoRequests = () => {
    const payload = {
      idOrganization: organizationId,
    }
    axiosCLient.post('/loadInfoRequests', payload)
      .then(({ data }) => {
        setOrganizationRequests(data.requests)
      })
  }

  useEffect(() => {
    loadInfoRequests()
  }, [])

  useEffect(() => {
    loadInfoRequests()
  }, [rerender])

  return (
    <div className={classes.organizationRequest}>
      <div className={classes.organizationRequestTitle}>
        <h2>Список заявок</h2>
      </div>
      {
        organizationRequest.length == 0 ?
          <div className={classes.noRequests}>Нет входящих заявок</div>
          :
          organizationRequest.map((item, key) => {
            return <RequestsOrganizationsItem key={key} userInfo={item.user} idOrganization={organizationId} setRerender={setRerender}/>
          })
      }
    </div>
  )
}

export default RequestsOrganizations