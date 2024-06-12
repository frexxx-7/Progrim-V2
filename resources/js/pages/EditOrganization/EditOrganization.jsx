import React, { useEffect, useRef, useState } from 'react'
import classes from './EditOrganization.module.scss'
import { useStateContext } from '../../context/ContextProvider'
import { useNavigate } from 'react-router-dom'
import axiosCLient from '../../axios.client'

const EditOrganization = () => {
  const organizationId = location.pathname.split("/")[location.pathname.split("/").length - 1]
  const { user } = useStateContext()
  const nameRef = useRef()
  const addressRef = useRef();
  const numberPhoneRef = useRef();
  const [errors, setErrors] = useState({})
  const navigator = useNavigate()

  const [organizationInfo, setOrganizationInfo] = useState()

  const loadInfoOrganization = () => {
    axiosCLient.get(`/loadInfoOrganization/`+organizationId)
    .then(({ data }) => {
      setOrganizationInfo(data.organization);
      nameRef.current.value = data.organization.name
      addressRef.current.value = data.organization.address
      numberPhoneRef.current.value = data.organization.numberPhone
    })
    .catch(err => {
      const response = err.response
      if (response && response.status === 422) {
        setErrors(response.data.errors)
      }
    })
  }

  useEffect(()=>{
    loadInfoOrganization()
  }, [])

  const editOrganization = () => {
    const payload = {
      name: nameRef.current.value,
      address: addressRef.current.value,
      numberPhone: numberPhoneRef.current.value,
      idUser: user.id,
      icon: null
    }

    axiosCLient.post(`/editOrganization/`+organizationId, payload)
      .then(({ data }) => {
        console.log(data);
        navigator("/organization/"+organizationId)
      })
      .catch(err => {
        const response = err.response
        if (response && response.status === 422) {
          setErrors(response.data.errors)
        }
      })
  }

  return (
    <div className={classes.createOrganizations}>
      <div className={classes.pageTitle}>
        <h1>Редактировать организации</h1>
      </div>
      <div className={classes.inputs}>
        <div className={classes.inputContainer}>
          <label htmlFor='name'>Название <span className={classes.star}>*</span></label>
          <input type="text" ref={nameRef} name='name' className={classes.contactsInput} />
        </div>
        <div className={classes.inputContainer}>
          <label htmlFor='address'>Адрес<span className={classes.star}>*</span></label>
          <input type="text" ref={addressRef} name='address' className={classes.contactsInput} />
        </div>
        <div className={classes.inputContainer}>
          <label htmlFor='numberPhone'>Номер телефона <span className={classes.star}></span></label>
          <input type="text" ref={numberPhoneRef} name='numberPhone' className={classes.contactsInput} />
        </div>
        {errors &&
          <div>
            {Object.keys(errors).map(key => (
              <p className={classes.error} style={{ color: "red", fontWeight: "bold" }} key={key}>{errors[key][0]}</p>
            ))}</div>
        }
        <div className={classes.saveButtonContainer}>
          <button className={classes.saveButton} onClick={editOrganization}>Сохранить</button>
        </div>
      </div>
    </div>
  )
}

export default EditOrganization