import React, { useRef, useState } from 'react'
import classes from './CreateOrganizations.module.scss'
import { useStateContext } from '../../context/ContextProvider'
import { useNavigate } from 'react-router-dom'
import axiosCLient from '../../axios.client'

const CreateOrganizations = () => {
  const { user } = useStateContext()
  const nameRef = useRef()
  const addressRef = useRef();
  const numberPhoneRef = useRef();
  const [errors, setErrors] = useState({})
  const navigator = useNavigate()

  const addOrganization = () => {
    const payload = {
      name: nameRef.current.value,
      address: addressRef.current.value,
      numberPhone: numberPhoneRef.current.value,
      idUser: user.id,
      icon: null
    }

    axiosCLient.post(`/addOrganization`, payload)
      .then(({ data }) => {
        console.log(data);
        navigator("/organizations")
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
        <h1>Создание организации</h1>
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
          <button className={classes.saveButton} onClick={addOrganization}>Создать</button>
        </div>
      </div>
    </div>
  )
}

export default CreateOrganizations