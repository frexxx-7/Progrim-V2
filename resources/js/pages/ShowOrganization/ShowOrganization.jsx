import React, { useEffect, useState } from 'react'
import classes from './ShowOrganization.module.scss'
import axiosCLient from '../../axios.client'
import Loader from '../../components/UI/Loader/Loader'
import { useNavigate } from 'react-router-dom'
import { useStateContext } from '../../context/ContextProvider'
import Modal from '../../components/UI/Modal/Modal'
import ParticipantsOrganization from '../ParticipantsOrganization/ParticipantsOrganization'
import RequestsOrganizations from '../RequestsOrganizations/RequestsOrganizations'

const ShowOrganization = () => {
  const { user } = useStateContext()
  const [organizationInfo, setOrganizationInfo] = useState()
  const [loadingInfo, setLoadingInfo] = useState(true)
  const organizationId = location.pathname.split("/")[location.pathname.split("/").length - 1]
  const [isApply, setIsApply] = useState(false)
  const navigator = useNavigate()
  const [visibleParticipant, setVisibleParticipant] = useState(false)
  const [visibleRequests, setVisibleRequests] = useState(false)
  const [rerender, setRerender] = useState(Date.now)

  const loadInfoOrganization = () => {
    axiosCLient.get('/loadInfoOrganization/' + organizationId)
      .then(({ data }) => {
        setOrganizationInfo(data.organization);
      })
  }

  const checkOrganizationRequest = () => {
    const payload = {
      idUser: user.id,
      idOrganization: organizationId,
    }
    axiosCLient.post('/checkOrganizationRequest/', payload)
      .then(({ data }) => {
        setLoadingInfo(false)
        if (data.organizationRequest)
          setIsApply(data.organizationRequest.state)
      })
  }

  useEffect(() => {
    loadInfoOrganization()
  }, [])

  useEffect(() => {
    user && organizationInfo &&
      checkOrganizationRequest()
  }, [user, organizationInfo])

  const applyRequest = () => {

    const payload = {
      idUser: user.id,
      idOrganization: organizationInfo.id,
      state: "sent"
    }
    axiosCLient.post('/addOrganizationRequest', payload)
      .then(({ data }) => {
        setIsApply(true)
      })
  }

  return (
    <>
      {
        loadingInfo ?
          <Loader />
          :
          <div className={classes.showOrganization}>
            <Modal children={<ParticipantsOrganization organizationId={organizationId} key={rerender} />} visible={visibleParticipant} setVisible={setVisibleParticipant} />
            <Modal children={<RequestsOrganizations organizationId={organizationId} setRerendersss={setRerender} />} visible={visibleRequests} setVisible={setVisibleRequests} />
            {
              organizationInfo && organizationInfo.idUser == user.id &&
              <div className={classes.organizationAdmin}>
                <div className={classes.organizationAdminButtons}>
                  <button onClick={() => navigator("/editOrganization/" + organizationId)}>Редактировать</button>
                  <button onClick={() => setVisibleParticipant(true)}>Список участников</button>
                  <button onClick={() => setVisibleRequests(true)}>Заявки</button>
                </div>
              </div>
            }

            {
              organizationInfo && organizationInfo.idUser != user.id && !isApply &&
              <div className={classes.editButton}>
                <button onClick={() => applyRequest()}>Подать заявку</button>
              </div>
            }

            {
              isApply == "sent" &&
              <p className={classes.isApplyText}>Вы отправили заявку</p>
            }
            {
              isApply == "confirmed" &&
              <p className={classes.isApplyText}>Вы участник организации</p>
            }

            <div className={classes.showOrganizationContainer}>
              <div className={classes.organizationInfo}>
                <div className={classes.organizationName}>
                  <h1>{organizationInfo && organizationInfo.name}</h1>
                </div>
                <div className={classes.organizationContact}>
                  <p>Адрес: {organizationInfo && organizationInfo.address}</p>
                  <p>Номер телефона :{organizationInfo && organizationInfo.numberPhone}</p>
                </div>
              </div>

              <div className={classes.organizationLinks}>
                <div className={classes.organizationLinkItem} onClick={()=>navigator("/news/organization/"+organizationId)}>
                  <div className={classes.organizationLinkItemBackground}>
                    <img src="/newsIcon.png" alt="" />
                  </div>
                  <p>Новости</p>
                </div>

                <div className={classes.organizationLinkItem} onClick={()=>navigator("/organization/interactiveMap/"+organizationId)}>
                  <div className={classes.organizationLinkItemBackground}>
                    <img src="/mapIcon.png" alt="" />
                  </div>
                  <p>Интерактивная <br /> карта</p>
                </div>

                {/*<div className={classes.organizationLinkItem}>
                  <div className={classes.organizationLinkItemBackground}>
                    <img src="/planingIcon.png" alt="" />
                  </div>
                  <p>Планинг <br /> трекер</p>
                </div>*/}
              </div>
            </div>
          </div>
      }
    </>
  )
}

export default ShowOrganization