import React, { useState } from 'react'
import classes from './EditPhoto.module.scss'
import { useStateContext } from '../../../context/ContextProvider'

const EditPhoto = ({ photo, editing = true, setImage, setVisible }) => {
  const { user, setUser } = useStateContext()

  const [onEdit, setOnEdit] = useState(false)
  
  const changeImage = (e) => {
    const fileElem = document.getElementById("fileElem");
    if (fileElem) {
      fileElem.click();
    }
  }

  const chooseImage = async (files) => {
    const avatar = document.getElementById("avatar");
    const file = files[0]
    if (!file.type.startsWith('image/')) { return '' }
    avatar.file = file
    var reader = new FileReader();
    reader.onload = (function (aImg) {
      return function (e) {
        aImg.src = e.target.result;
      };
    })(avatar);
    reader.readAsDataURL(file);
    setOnEdit(true)
  }

  const savePhoto = () => {
    setImage(document.getElementById("avatar").src)
    setVisible(false)
  }

  return (
    <div className={classes.editPhoto}>
      <img src={photo} alt="avatar" id='avatar' />
      {editing
        ? <div>
          <input
            type="file"
            name="file"
            id="fileElem"
            style={{ display: "none" }}
            onChange={(e) => chooseImage(e.target.files)}
          />
          <button
            className={classes.EditPhotoInput}
            onClick={changeImage}
          >
            Выбрать фото
          </button>
          {
            onEdit &&
            <button
              className={classes.EditPhotoInput}
              onClick={savePhoto}
            >
              Сохранить
            </button>
          }

        </div>
        : ''
      }
    </div>
  )
}

export default React.memo(EditPhoto)