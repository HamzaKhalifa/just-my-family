import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Loader from 'components/loader'

import { loadMoreMessages } from 'store/relationships/actions'

import useStyles from './styles'
import { IMultiParticipantsRoom } from 'types/interfaces/IMultiParticipantsRoom'
import { IRelationship } from 'types/interfaces/IRelationship'
import { IRoomState } from 'types/interfaces/IRoomState'
import { IState } from 'store'

interface IChatLoadMore {
  roomId?: number
}
const ChatLoadMore = (props: IChatLoadMore) => {
  const room: IRoomState<IRelationship | IMultiParticipantsRoom> | undefined = useSelector<
    IState,
    IRoomState<IRelationship | IMultiParticipantsRoom> | undefined
  >((state) => state.relationships.approvedRelationships.find((r) => r.room?.id === props.roomId))

  const styles = useStyles()
  const dispatch = useDispatch()

  if ((room?.room?.messages?.length || 0) >= (room?.room?.totalMessages || 0)) return null

  const handleLoadMoreMessages = () => dispatch(loadMoreMessages(props.roomId))

  return (
    <div className={styles.chatLoadMoreContainer}>
      {room?.moreMessagesLoading && <Loader />}

      {!room?.moreMessagesLoading && (
        <span onClick={handleLoadMoreMessages} className={styles.loadMoreText}>
          {(room?.room?.totalMessages || 0) - (room?.room?.messages?.length || 0)} More messages...
        </span>
      )}
    </div>
  )
}

export default ChatLoadMore
