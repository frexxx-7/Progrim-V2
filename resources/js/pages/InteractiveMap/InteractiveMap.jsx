import React, { useEffect, useRef, useState } from 'react'
import classes from './InteractiveMap.module.scss'
import Loader from '../../components/UI/Loader/Loader'
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useStateContext } from '../../context/ContextProvider'
import axiosCLient from '../../axios.client'
import { Icon, divIcon, point } from 'leaflet'
import MarkerClusterGroup from 'react-leaflet-cluster'
import MarkerItem from './MarkerItem/MarkerItem'

const InteractiveMap = () => {
  const { user } = useStateContext()

  const [selectedPosition, setSelectedPosition] = useState([0, 0]);
  const [errors, setErrors] = useState([])
  const [rerender, setRerender] = useState(Date.now)

  const [organizationInfo, setOrganizationInfo] = useState()
  const [loaded, isLoaded] = useState(true)
  const [interactiveMapLink, setInteracitveMapLink] = useState('https://tile.jawg.io/jawg-matrix/{z}/{x}/{y}{r}.png?access-token={accessToken}')
  const [showAddMarkers, setShowAddMarkers] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editingMarker, setEditingMarker] = useState()

  const nameRef = useRef()
  const textRef = useRef()
  const coordinatsRef = useRef()
  const mapRef = useRef(null)

  const [markers, setMarkers] = useState()

  const organizationId = location.pathname.split("/")[location.pathname.split("/").length - 1]

  const loadInfoOrganization = () => {
    axiosCLient.get('/loadInfoOrganization/' + organizationId)
      .then(({ data }) => {
        isLoaded(false)
        setOrganizationInfo(data.organization);
      })
  }

  const customIcon = new Icon({
    iconUrl: "/map-marker.svg",
    iconSize: [38, 38]
  })

  useEffect(() => {
    loadInfoOrganization()
  }, [])

  const createCustimClusterIcon = (cluster) => {
    return new divIcon({
      html: `<div class="cluster-icon"> ${cluster.getChildCount()} </div>`,
      className: 'custom-marker-cluster',
      iconSize: point(33, 33, true)
    })
  }

  function MyComponent() {
    const map = useMapEvents({
      click(e) {
        setSelectedPosition([
          e.latlng.lat,
          e.latlng.lng
        ]);
      },
    })
    return (
      selectedPosition ?
        <Marker
          key={selectedPosition[0]}
          position={selectedPosition}
          interactive={false}
          icon={customIcon}
        />
        : null
    )
  }

  useEffect(() => {
    if (coordinatsRef.current)
      coordinatsRef.current.value = selectedPosition
  }, [selectedPosition])

  const saveMarkerInDB = () => {  
    if (!isEditing) {
      const payload = {
        title: nameRef.current.value,
        text: textRef.current.value,
        coordinates: `${selectedPosition}`,
        idOrganization: organizationId
      }
      axiosCLient.post('/organization/addMarker', payload)
        .then(({ data }) => {
          if (data) {
            nameRef.current.value = ""
            textRef.current.value = ""
            setSelectedPosition("")
            coordinatsRef.current.value = ""
            setShowAddMarkers(false)
            loadInfoMarkers()
          }
        })
        .catch(err => {
          const response = err.response
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        })
    } else {
      const payload = {
        title: nameRef.current.value,
        text: textRef.current.value,
        coordinates: coordinatsRef.current.value,
        idOrganization: organizationId
      }
      axiosCLient.post('/organization/editMarker/' + editingMarker.id, payload)
        .then(({ data }) => {
          if (data) {
            nameRef.current.value = ""
            textRef.current.value = ""
            setSelectedPosition("")
            coordinatsRef.current.value = ""

            setShowAddMarkers(false)
            setEditingMarker({})
            setIsEditing(false)

            loadInfoMarkers()
          }
        })
        .catch(err => {
          const response = err.response
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        })
    }
  }

  const loadInfoMarkers = () => {
    axiosCLient.get(`/organization/${organizationId}/markers`)
      .then(({ data }) => {
        if (data) {
          setMarkers(data.markers.map((marker) => {
            return {
              id: marker.id,
              coordinates: marker.coordinates.split(",").map((onePost) => {
                return +onePost
              }),
              text: marker.text,
              title: marker.title,
              markerRef: React.createRef()
            }
          }
          )
          )
        }
      })
      .catch(({ response }) => {
        console.log(response);
      })
  }

  useEffect(() => {
    loadInfoMarkers()
  }, [])

  useEffect(() => {
    if (isEditing) {
      nameRef.current.value = editingMarker.title
      textRef.current.value = editingMarker.text
      coordinatsRef.current.value = editingMarker.coordinates
    }
  }, [isEditing, editingMarker])

  useEffect(() => {
    loadInfoMarkers()
  }, [rerender])

  return (
    <>
      {
        loaded ?
          <Loader />
          :
          <div className={classes.InteractiveMap}>
            <div className={classes.pageTitle}>
              <h1>Интерактивная карта</h1>
            </div>

            <div className={classes.InteractiveMapContainer}>
              <div className={classes.interactiveMap_addedMarkers_container}>
                {
                  user.id == organizationInfo.idUser &&
                  <div className={classes.iteractiveMap_addMarkers}>
                    <button onClick={() => setShowAddMarkers(!showAddMarkers)}>{showAddMarkers ? "Отмена" : "Добавить маркер"} </button>
                  </div>
                }

                {
                  showAddMarkers &&
                  <div className={classes.addedMarkers_container}>
                    <div className={classes.addedMarkers_item}>
                      <input ref={nameRef} type="text" name='nameMark' placeholder='Название' />
                    </div>
                    <div className={classes.addedMarkers_item}>
                      <input ref={textRef} type="text" name='textMark' placeholder='Текст' />
                    </div>
                    <div className={classes.addedMarkers_item}>
                      <input ref={coordinatsRef} type="text" name='coordMark' placeholder='Координаты' />
                    </div>
                    <div className={classes.addedMarkers_item}>
                      <p>Нажмите на карту чтобы взять координаты</p>
                    </div>

                    <div className={classes.saveAddedMarkers}>
                      <button onClick={() => saveMarkerInDB()}>Сохранить</button>
                    </div>
                  </div>
                }

                <div className={classes.markersContainer}>
                  {
                    markers ?
                      markers.map((marker, key) => {
                        return <MarkerItem markerInfo={marker} key={key} mapRef={mapRef} setRerender={setRerender} setIsEditing={setIsEditing} setShowAddMarkers={setShowAddMarkers} setEditingMarker={setEditingMarker} />
                      })
                      :
                      <p>Нету маркеров</p>
                  }
                </div>
              </div>


              <div className={classes.interactiveMap_container}>
                <div className={classes.interactiveMap_buttons}>
                  <button onClick={() => setInteracitveMapLink('https://tile.jawg.io/jawg-streets/{z}/{x}/{y}{r}.png?access-token={accessToken}')}>Улицы</button>
                  <button onClick={() => setInteracitveMapLink('https://tile.jawg.io/jawg-terrain/{z}/{x}/{y}{r}.png?access-token={accessToken}')}>Местность</button>
                  <button onClick={() => setInteracitveMapLink('https://tile.jawg.io/jawg-lagoon/{z}/{x}/{y}{r}.png?access-token={accessToken}')}>Лагуна</button>
                  <button onClick={() => setInteracitveMapLink('https://tile.jawg.io/jawg-sunny/{z}/{x}/{y}{r}.png?access-token={accessToken}')}>Солнечная</button>
                  <button onClick={() => setInteracitveMapLink('https://tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token={accessToken}')}>Темная</button>
                  <button onClick={() => setInteracitveMapLink('https://tile.jawg.io/jawg-light/{z}/{x}/{y}{r}.png?access-token={accessToken}')}>Светлая</button>
                  <button onClick={() => setInteracitveMapLink('https://tile.jawg.io/jawg-matrix/{z}/{x}/{y}{r}.png?access-token={accessToken}')}>Матрица</button>
                </div>
                <MapContainer
                  ref={mapRef}
                  center={[53.9023248222806, 27.558146744246983]}
                  zoom={7}
                  className={classes.leaflet_container}
                >
                  {showAddMarkers && <MyComponent />}

                  <TileLayer
                    url={interactiveMapLink}
                    accessToken='Rcl5mQAmw9tBFEmpeRGIDyDuhes3665T4kedTLKhrQ3KFCx7EQV4x0vS45c8jwbe'
                  />
                  <MarkerClusterGroup
                    chunkedLoading
                    iconCreateFunction={createCustimClusterIcon}
                  >
                    {
                      markers && markers.map((marker, key) => {
                        return <Marker
                          ref={marker.markerRef}
                          key={key}
                          position={marker.coordinates}
                          icon={customIcon}
                        >
                          <Popup>
                            <h2>{marker.title}</h2>
                          </Popup>
                        </Marker>
                      })
                    }
                  </MarkerClusterGroup>
                </MapContainer>
              </div>
            </div>
          </div >
      }
    </>
  )
}

export default InteractiveMap