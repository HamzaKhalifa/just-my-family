import React from 'react'

import ChatInput from '../chat-input'
import Loader from 'components/loader'
import ChatMessage from '../chat-message'
import UserProfilePicture from 'components/user-profile-picture'
import ChatLoadMore from '../chat-load-more'

import useStyles from './styles'
import { useSelector } from 'react-redux'
import { IState } from 'store'
import { IRoomState } from 'types/interfaces/IRoomState'
import { IMultiParticipantsRoom } from 'types/interfaces/IMultiParticipantsRoom'
import { IRelationship } from 'types/interfaces/IRelationship'
import { IParsedToken } from 'types/interfaces/IParsedToken'
import { IUser } from 'types/interfaces/IUser'
import { SizeEnum } from 'components/user-profile-picture/UserProfilePicture'
import { IMessage } from 'types/interfaces/IMessage'

interface IChatView {
  roomId?: number
}

const ChatView = (props: IChatView) => {
  const room: IRoomState<IRelationship | IMultiParticipantsRoom> | undefined = useSelector<
    IState,
    IRoomState<IRelationship | IMultiParticipantsRoom> | undefined
  >((state) => state.relationships.approvedRelationships.find((r) => r.room?.id === props.roomId))
  const parsedToken: IParsedToken | undefined = useSelector<IState, IParsedToken | undefined>(
    (state) => state.auth.parsedToken
  )
  const [lastMessage, setLastMessage] = React.useState<IMessage | null>(null)

  const user: IUser | undefined =
    (room as IRoomState<IRelationship>)?.room?.user1Id === parsedToken?.nameid
      ? (room as IRoomState<IRelationship>)?.room?.user2
      : (room as IRoomState<IRelationship>)?.room?.user1

  const styles = useStyles()
  const bottomRef: any = React.useRef()

  React.useEffect(() => {
    // Only scroll into view when the last message in the current messages list is different from the last message we are tracking in the internal state
    if (
      room?.room?.messages &&
      room?.room?.messages.length > 0 &&
      room?.room?.messages[(room?.room?.messages?.length || 0) - 1].id !== lastMessage?.id
    ) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
      if (room?.room?.messages)
        setLastMessage(room?.room?.messages[(room?.room?.messages?.length || 0) - 1] || null)
    }
  }, [room?.room?.messages?.length])
  // Change the last message when we change rooms so that we get an automatic scroll to the bottom when we go into a room
  React.useEffect(() => {
    if (room?.room?.messages)
      setLastMessage(room?.room?.messages[(room?.room?.messages?.length || 0) - 1] || null)
  }, [props.roomId])

  return (
    <div className={styles.chatViewContainer}>
      {room && (
        <div className={styles.header}>
          <div className={styles.left}>
            <UserProfilePicture size={SizeEnum.Small} profilePictureName={user?.profilePictureName} />
            <div className={styles.headerNameAndStatus}>
              <span className={styles.headerName}>
                {(user?.firstName || '-') + ' ' + (user?.lastName || '-')}
              </span>
              <span className={styles.status}>online</span>
            </div>
          </div>
        </div>
      )}

      {room && <ChatLoadMore roomId={props.roomId} />}

      {room && (
        <div className={styles.messagesContainer}>
          {room?.room?.messages?.map((message) => (
            <ChatMessage key={message.id} room={room} message={message} />
          ))}
          <div ref={bottomRef}></div>
        </div>
      )}

      {room?.loading && <Loader />}

      {room && <ChatInput roomId={props.roomId} />}
    </div>
  )
}

export default React.memo(ChatView)
