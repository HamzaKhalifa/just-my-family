import React from 'react'
import { useTheme } from 'react-jss'
import { useDispatch, useSelector } from 'react-redux'

import Loader from 'components/loader'
import { addRoomMessagesSeenBy, sendMessage as sendRelationshipMessage } from 'store/relationships/actions'

import { BiPlus } from 'react-icons/bi'
import { GrSend } from 'react-icons/gr'
import { BsFillEmojiSmileFill } from 'react-icons/bs'

import useStyles from './styles'
import { ITheme } from 'theme'
import { IMultiParticipantsRoom } from 'types/interfaces/IMultiParticipantsRoom'
import { IRelationship } from 'types/interfaces/IRelationship'
import { IRoomState } from 'types/interfaces/IRoomState'
import { IState } from 'store'

interface IChatInput {
  roomId?: number
}
const ChatInput = (props: IChatInput) => {
  const room: IRoomState<IRelationship | IMultiParticipantsRoom> | undefined = useSelector<
    IState,
    IRoomState<IRelationship | IMultiParticipantsRoom> | undefined
  >((state) => state.relationships.approvedRelationships.find((r) => r.room?.id === props.roomId))

  const styles = useStyles()
  const theme: ITheme = useTheme()

  const messageRef: any = React.useRef<HTMLInputElement>()
  const dispatch = useDispatch()

  // Autofocus the textarea
  React.useEffect(() => {
    messageRef.current.focus()
  }, [props.roomId])
  // Create the input Id
  React.useEffect(() => {
    const roomId: string | undefined = room?.room?.id?.toString()

    const enterEvent = (e: any) => {
      // If we press Enter without shift, then we send the message and prevent the default return to line behavior
      if (e.which === 13 && !e.shiftKey) {
        e.preventDefault()
        handleSendMessage()
      }
    }
    if (roomId && roomId !== '') {
      messageRef.current?.addEventListener('keypress', enterEvent)
    }
    return () => {
      messageRef.current?.removeEventListener('keypress', enterEvent)
    }
  }, [room])

  const handleSendMessage = () => {
    const text: string = messageRef.current.innerHTML
    if (text.trim() === '') return
    dispatch(sendRelationshipMessage(text, props.roomId))
    messageRef.current.innerHTML = ''
  }
  const handleSeen = () => {
    if (props.roomId !== undefined) dispatch(addRoomMessagesSeenBy(props.roomId))
  }

  return (
    <div className={styles.chatInputContainer}>
      <div className={styles.plusContainer}>
        <BiPlus color={theme.primaryColor} size={25} />
      </div>

      <div
        ref={messageRef}
        className={styles.chatInput}
        placeholder="Type a message here"
        contentEditable="true"
        id={room?.room?.id?.toString()}
        onFocus={() => handleSeen()}
      ></div>

      <BsFillEmojiSmileFill className={styles.emoji} color={theme.primaryColor} size={25} />

      {!room?.sendMessageLoading && (
        <div onClick={handleSendMessage} className={styles.sendContainer}>
          <GrSend color={theme.primaryColor} size={25} />
        </div>
      )}

      {room?.sendMessageLoading && (
        <div className={styles.loadingContainer}>
          <Loader />
        </div>
      )}
    </div>
  )
}

export default ChatInput
