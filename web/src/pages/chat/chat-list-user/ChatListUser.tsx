import React from 'react'
import { useDispatch } from 'react-redux'

import UserProfilePicture from 'components/user-profile-picture'
import Notification from 'components/notification'

import { setMainRoomId } from 'store/relationships/actions'

import useStyles from './styles'
import { IRelationship } from 'types/interfaces/IRelationship'
import { IUser } from 'types/interfaces/IUser'
import { SizeEnum } from 'components/user-profile-picture/UserProfilePicture'
import { IRoomState } from 'types/interfaces/IRoomState'

interface IChatListUser {
  relationship: IRoomState<IRelationship>
  user?: IUser
}
const ChatListUser = (props: IChatListUser) => {
  const styles = useStyles()
  const dispatch = useDispatch()

  const handleUserClick = () => {
    dispatch(setMainRoomId(props.relationship.room?.id))
  }

  return (
    <div onClick={handleUserClick} className={styles.chatListUserContainer}>
      <UserProfilePicture size={SizeEnum.Average} profilePictureName={props.user?.profilePictureName} />
      <div className={styles.notificationContainer}>
        <Notification number={props.relationship.room?.numberOfUnseenMessages} />
      </div>
      <div className={styles.nameAndLastConnected}>
        <span>{(props.user?.firstName || '-') + ' ' + (props.user?.lastName || '-')}</span>
        <span className={styles.lastConnected}>23 minutes ago</span>
      </div>
    </div>
  )
}

export default React.memo(ChatListUser)
