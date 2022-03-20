import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import NotificationCard from 'components/notification-card'

import { getPostsReactions } from 'store/notifications/actions'

import useStyles from './styles'
import { IReactionNotification } from 'store/notifications/initialState'
import { IState } from 'store'

const Notifications = () => {
  const postReactionsNotifications: IReactionNotification[] = useSelector<IState, IReactionNotification[]>(
    (state) => state.notifications.postReactionsNotifications
  )

  React.useEffect(() => {
    dispatch(getPostsReactions())
  }, [])
  const styles = useStyles()
  const dispatch = useDispatch()

  return (
    <div className={styles.notificationsContainer}>
      {postReactionsNotifications.map((reactionNotification) => (
        <NotificationCard
          to="/"
          key={reactionNotification.reaction.id}
          profilePictureName={reactionNotification.reaction?.user?.profilePictureName}
          userFullName={
            (reactionNotification.reaction?.user?.firstName || '-') +
            ' ' +
            (reactionNotification.reaction?.user.lastName || '-')
          }
          submittedAt={
            reactionNotification.reaction.submittedAt?.slice(
              0,
              reactionNotification.reaction.submittedAt.length - 5
            ) || ''
          }
          text={reactionNotification.reaction?.user.firstName + ' has reacted to your post'}
        />
      ))}
    </div>
  )
}

export default React.memo(Notifications)
