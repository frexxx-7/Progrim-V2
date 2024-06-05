import React, { useEffect, useState } from 'react'
import axiosCLient from '../../axios.client'
import { useRef } from 'react'
import { useStateContext } from '../../context/ContextProvider'
import classes from './EditProfile.module.scss'
import Modal from '../../components/UI/Modal/Modal'
import EditPhoto from './EditPhoto/EditPhoto'
import { useTranslation } from 'react-i18next'

const EditProfile = () => {
  const { user, setUser } = useStateContext()
  const { t } = useTranslation()
  const [resetPasswordChecked, setResetPasswordChecked] = useState(false)
  const [errors, setErrors] = useState({})
  const [image, setImage] = useState()

  const [modalPhoto, setModalPhoto] = useState(false)

  const nameRef = useRef()
  const emailRef = useRef()
  const quoteRef = useRef()

  const oldPasswordRef = useRef()
  const newPasswordRef = useRef()
  const repeatNewPasswordRef = useRef()

  const resetPasswordCheckBoxRef = useRef()
  useEffect(() => {
    user.avatar && setImage("storage/" + user.avatar)
  }, [user])
  useEffect(() => {
    if (Object.keys(user).length != 0) {
      nameRef.current.value = user.name ? user.name : ""
      emailRef.current.value = user.email ? user.email : ""
      quoteRef.current.value = user.quote ? user.quote : ""
    }
  }, [user])
  console.log("storage/" + image != user.avatar);
  const editProfile = () => {
    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      quote: quoteRef.current.value,
      avatar: image != "storage/" + user.avatar ? image : undefined
    }
    axiosCLient.post(`/editProfile/${user.id}`, payload)
      .then(({ data }) => {
        if (data) {
          setErrors({ ...errors, meessage: ["Данные изменены"] })
          user.name = nameRef.current.value;
          user.email = emailRef.current.value;
          user.quote = quoteRef.current.value;
          user.avatar = data.user.avatar;
        }
      })
      .catch(err => {
        const response = err.response
        if (response && response.status === 422) {
          setErrors({ ...errors, errors: response.data.errors })
        }
      })
  }
  const saveInfo = () => {
    if (resetPasswordCheckBoxRef.current.checked) {
      const payload = {
        old_password: oldPasswordRef.current.value,
        new_password: newPasswordRef.current.value,
        new_password_confirmation: repeatNewPasswordRef.current.value
      }
      axiosCLient.post('/updatePassword', payload)
        .then(({ data }) => {
          setErrors({ meessage: [data.message] })
        })
        .catch(err => {
          const response = err.response
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        })
      if (user.name != nameRef.current.value && user.email != emailRef.current.value)
        editProfile()
    } else
      editProfile()
  }
  return (
    <div className={classes.mainContent}>
      <div className={classes.titile}>
        <h1>{t("editProfile.title")}</h1>
      </div>
      <div className={classes.profile_image} >
        <img src={image} alt="" onClick={() => setModalPhoto(true)} />
      </div>
      <Modal visible={modalPhoto} setVisible={setModalPhoto}>
        <EditPhoto photo={"storage/" + user.avatar} setImage={setImage} setVisible={setModalPhoto} />
      </Modal>
      <div className={classes.inputs}>
        <div className={classes.inputContainer}>
          <label htmlFor='name'>{t("editProfile.login")} <span className={classes.star}>*</span></label>
          <input type="text" ref={nameRef} name='name' className={classes.contactsInput} />
        </div>
        <div className={classes.inputContainer}>
          <label htmlFor='email'>{t("editProfile.email")} <span className={classes.star}>*</span></label>
          <input type="text" ref={emailRef} name='email' className={classes.contactsInput} />
        </div>
        <div className={classes.inputContainer}>
          <label htmlFor='quote'>{t("editProfile.quote")} <span className={classes.star}></span></label>
          <input type="text" ref={quoteRef} name='quote' className={classes.contactsInput} />
        </div>
        <div className={classes.checkBoxContainer}>
          <input type="checkbox" className={classes.contactsCheckBox} ref={resetPasswordCheckBoxRef} onClick={(e) => setResetPasswordChecked(e.target.checked)} />
          <p>{t("editProfile.changePassword")}</p>
        </div>
      </div>
      {
        resetPasswordChecked
          ?
          <div className={classes.resetPasswordContainer}>
            <div className={classes.inputContainer}>
              <label htmlFor='oldpassword'>{t("editProfile.oldPassword")} <span className={classes.star}>*</span></label>
              <input type="password" ref={oldPasswordRef} name='oldpassword' className={classes.contactsInput} />
            </div>
            <div className={classes.inputContainer}>
              <label htmlFor='newpassword'>{t("editProfile.newPassword")} <span className={classes.star}>*</span></label>
              <input type="password" ref={newPasswordRef} name='newpassword' className={classes.contactsInput} />
            </div>
            <div className={classes.inputContainer}>
              <label htmlFor='repeatpassword'>{t("editProfile.repeatPassword")} <span className={classes.star}>*</span></label>
              <input type="password" ref={repeatNewPasswordRef} name='repeatpassword' className={classes.contactsInput} />
            </div>
          </div>
          :
          ""
      }
      {errors &&
        <div>
          {Object.keys(errors).map(key => (
            <p className={classes.error} style={{ color: "red", fontWeight: "bold" }} key={key}>{errors[key][0]}</p>
          ))}</div>
      }
      <div className={classes.saveButtonContainer}>
        <button className={classes.saveButton} onClick={saveInfo}>{t("editProfile.saveChanges")}</button>
      </div>

    </div>
  )
}

export default EditProfile