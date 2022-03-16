import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Notification from 'components/notification'

import { BsFillChatDotsFill, BsPeopleFill } from 'react-icons/bs'
import { FaHome } from 'react-icons/fa'
import { RiNotification3Fill } from 'react-icons/ri'
import { useLocation } from 'react-router-dom'

import useStyles from './styles'
import { IState } from 'store'

interface ILeftMenu {}

const LeftMenu = (props: ILeftMenu) => {
  const unseenInvitationsCount: number = useSelector<IState, number>(
    (state) => state.relationships.unseenInvitationsCount
  )

  const styles = useStyles()
  const location = useLocation()

  return (
    <div className={styles.leftMenuContainer}>
      <Link
        to="/dashboard/home"
        className={styles[location.pathname === '/dashboard/home' ? 'selectedMenuButton' : 'menuButton']}
      >
        <FaHome size={30} color="white" />
      </Link>
      <Link
        to="/dashboard/notifications"
        className={
          styles[location.pathname === '/dashboard/notifications' ? 'selectedMenuButton' : 'menuButton']
        }
      >
        <RiNotification3Fill size={30} color="white" />
      </Link>
      <Link
        to="/dashboard/chat"
        className={styles[location.pathname === '/dashboard/chat' ? 'selectedMenuButton' : 'menuButton']}
      >
        <BsFillChatDotsFill size={30} color="white" />
      </Link>
      <Link
        to="/dashboard/relationships"
        className={
          styles[location.pathname === '/dashboard/relationships' ? 'selectedMenuButton' : 'menuButton']
        }
      >
        <div className={styles.notificationContainer}>
          <Notification number={unseenInvitationsCount} />
        </div>
        <BsPeopleFill size={30} color="white" />
      </Link>
    </div>
  )
}

export default React.memo(LeftMenu)
