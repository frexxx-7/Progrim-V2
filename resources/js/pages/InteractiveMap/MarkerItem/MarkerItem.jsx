import React from 'react'
import classes from './MarkerItem.module.scss'
import axiosCLient from '../../../axios.client'

const MarkerItem = ({ markerInfo, mapRef, setRerender, setIsEditing, setShowAddMarkers, setEditingMarker }) => {

  const onClickShowMarker = () => {
    const map = mapRef.current
    if (!map) {
      return
    }
    const handleMoveEnd = () => {
      const marker = markerInfo.markerRef.current;
      if (marker) {
        marker.openPopup();
      }
      map.off('moveend', handleMoveEnd); // отписываемся от события после его выполнения
    };

    map.on('moveend', handleMoveEnd);
    map.flyTo(markerInfo.coordinates, 13);
  }

  const deleteMarker = () => {
    axiosCLient.get('/organization/deleteMarker/'+ markerInfo.id)
      .then(({ data }) => {
        if (data) {
          setRerender(Date.now)
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  const openIsEdit = () => {
    const map = mapRef.current
    if (!map) {
      return
    }
    const handleMoveEnd = () => {
      const marker = markerInfo.markerRef.current;
      if (marker) {
        marker.openPopup();
      }
      map.off('moveend', handleMoveEnd); // отписываемся от события после его выполнения
    };

    map.on('moveend', handleMoveEnd);
    map.flyTo(markerInfo.coordinates, 13);
    
    setIsEditing(true)
    setShowAddMarkers(true)
    setEditingMarker(markerInfo)
  }

  return (
    <div className={classes.markerItemContainer}>
      <div className={classes.markerItem} onClick={() => onClickShowMarker()}>
        <p className={classes.markerTitle}>{markerInfo.title}</p>
        <p className={classes.markerText}>{markerInfo.text}</p>
        <p className={classes.markerCoordinates}>{markerInfo.coordinates}</p>
      </div>

      <div className={classes.markerItemForAdmin}>
        <div className={classes.markerButton}>
          <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" width="800px" height="800px" viewBox="0 0 528.899 528.899" xmlSpace="preserve" className={classes.pen} onClick={openIsEdit}>
            <g>
              <path d="M328.883,89.125l107.59,107.589l-272.34,272.34L56.604,361.465L328.883,89.125z M518.113,63.177l-47.981-47.981   c-18.543-18.543-48.653-18.543-67.259,0l-45.961,45.961l107.59,107.59l53.611-53.611   C532.495,100.753,532.495,77.559,518.113,63.177z M0.3,512.69c-1.958,8.812,5.998,16.708,14.811,14.565l119.891-29.069   L27.473,390.597L0.3,512.69z" />
            </g>
          </svg>
        </div>

        <div className={classes.markerButton}>
          <svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" onClick={deleteMarker}>
            <path d="M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M14 10V17M10 10V17" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default MarkerItem