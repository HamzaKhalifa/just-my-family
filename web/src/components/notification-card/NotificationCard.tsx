import React from 'react'
import { Link } from 'react-router-dom'

import UserProfilePicture from 'components/user-profile-picture'

import useStyles from './styles'
import { SizeEnum } from 'components/user-profile-picture/UserProfilePicture'

interface INotificationCard {
  profilePictureName?: string
  userFullName: string
  submittedAt: string
  to: string
  text: string
}

const NotificationCard = (props: INotificationCard) => {
  const styles = useStyles()

  return (
    <Link to={props.to} className={styles.notificationCardContainer}>
      <UserProfilePicture size={SizeEnum.Small} profilePictureName={props.profilePictureName} />
      <div className={styles.nameAndTimeContainer}>
        <span className={styles.userFullName}>{props.userFullName}</span>
        <span className={styles.text}>{props.text}</span>
        <span className={styles.submittedAt}>{props.submittedAt || '-'}</span>
      </div>
    </Link>
  )
}

export default React.memo(NotificationCard)
