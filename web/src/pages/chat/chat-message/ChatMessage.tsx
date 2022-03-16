import React from 'react'
import { useSelector } from 'react-redux'

import UserProfilePicture from 'components/user-profile-picture'

import useStyles from './styles'
import { IMessage } from 'types/interfaces/IMessage'
import { SizeEnum } from 'components/user-profile-picture/UserProfilePicture'
import { IState } from 'store'
import { IRoomState } from 'types/interfaces/IRoomState'
import { IRelationship } from 'types/interfaces/IRelationship'
import { IMultiParticipantsRoom } from 'types/interfaces/IMultiParticipantsRoom'

interface IChatMessage {
  message: IMessage
  room?: IRoomState<IRelationship | IMultiParticipantsRoom>
}
const ChatInput = (props: IChatMessage) => {
  const styles = useStyles()
  const currentUserId: string | undefined = useSelector<IState, string | undefined>(
    (state) => state.auth.parsedToken?.nameid
  )

  return (
    <div
      className={
        currentUserId === props.message.senderId ? styles.myMessageContainer : styles.chatMessageContainer
      }
    >
      <UserProfilePicture
        size={SizeEnum.Small}
        profilePictureName={
          'user1' in (props.room?.room || {})
            ? /* @ts-ignore */
              props.room?.room?.user1.id === props.message.senderId
              ? /* @ts-ignore */
                props.room?.room?.user1.profilePictureName
              : /* @ts-ignore */
                props.room?.room?.user2.profilePictureName
            : ''
        }
      />
      <div
        className={currentUserId === props.message.senderId ? styles.myMessageBubble : styles.messageBubble}
      >
        <p
          className={currentUserId === props.message.senderId ? styles.myMessageText : styles.messageText}
          dangerouslySetInnerHTML={{ __html: props.message.text }}
        ></p>
        <div className={styles.messageAttachments}></div>
        <span className={styles.messageSentAt}>
          {/* We don't want to show milliseconds, so we slice the 5 last characters (:ssss) */}
          {props.message.sentAt?.toString().slice(0, props.message.sentAt?.length - 5)}
        </span>
      </div>
    </div>
  )
}

export default ChatInput
