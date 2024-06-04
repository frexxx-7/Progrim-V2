import React, { useEffect, useState } from 'react'
import classes from './Friends.module.scss'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setSearchQuery } from '../../redux/searchQueryReducer'
import FriendList from './FriendList'
import SearchFriends from './SearchFriends'
import { useStateContext } from '../../context/ContextProvider'
import axiosCLient from '../../axios.client'
import InboxFriends from './InboxFriends'
import OutBoxFriends from './OutBoxFriends'

const Friends = () => {
  const [componentCh, setComponentCh] = useState(0)
  const [visibleLoader, setVisibleLoader] = useState(true)
  const { user } = useStateContext()
  const [friends, setFriends] = useState()
  const [searchVisible, setSearchVisible] = useState(false)

  const dispatch = useDispatch();

  const changeSearchQuery = (searchQuery) => {
    dispatch(setSearchQuery(searchQuery))
  }

  const getAllFriends = () => {
    const payload = {
      userId: user.id
    }
    axiosCLient.post('/friends', payload)
      .then(({ data }) => {
        setVisibleLoader(false)
        setFriends(data)
      })
  }

  useEffect(() => {
    user.id &&
      getAllFriends()
  }, [user])


  const selectPage = () => {
    switch (componentCh) {
      case 0:
        return <FriendList visibleLoader={visibleLoader} friends={friends} />
      case 1:
        return <InboxFriends visibleLoader={visibleLoader} friends={friends} />
      case 2:
        return <OutBoxFriends visibleLoader={visibleLoader} friends={friends} />
      case 3:
        return <SearchFriends visibleLoader={visibleLoader} friends={friends} />
      default:
        return <FriendList visibleLoader={visibleLoader} friends={friends} />
    }
  }

  return (
    <div className={classes.friends}>
      <div className={classes.friendsList}>
        {
          selectPage()
        }
      </div>
      <div className={classes.friendsNavbar}>
        <div className={classes.friendsNavbarDiv}>
          <ul className={classes.friendsButtons}>
            <li><a onClick={() => {
              setComponentCh(0)
              setSearchVisible(false)
            }}>
              {
                window.innerWidth <= 620
                  ? <i className="fa-solid fa-user-group"></i>
                  : 'Мои друзья'
              }
            </a></li>
            <li><a onClick={() => {
              setComponentCh(1)
              setSearchVisible(true)
            }}>
              {
                window.innerWidth <= 620
                  ? <i class="fa-solid fa-arrow-down"></i>
                  : 'Входящие'
              }
            </a></li>
            <li><a onClick={() => {
              setComponentCh(2)
              setSearchVisible(true)
            }}>
              {
                window.innerWidth <= 620
                  ? <i class="fa-solid fa-arrow-up"></i>
                  : 'Исходящие'
              }
            </a></li>
            <li><a onClick={() => {
              setComponentCh(3)
              setSearchVisible(true)
            }}>
              {
                window.innerWidth <= 620
                  ? <i className="fa-solid fa-magnifying-glass"></i>
                  : 'Поиск друзей'
              }
            </a></li>
            {
              searchVisible ?
                <li>
                  <input
                    type="text"
                    onChange={(e) => changeSearchQuery(e.target.value)}
                    className={classes.searchInput}
                    placeholder='Поиск'
                  />
                </li>
                :
                ""
            }
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Friends