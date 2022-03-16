import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import ChatMenu from 'pages/chat/chat-menu'
import ChatView from 'pages/chat/chat-view'
import { setMainRoomId } from 'store/relationships/actions'

import useStyles from './styles'
import { IState } from 'store'

const MainChat = () => {
  const mainRoomId: number | undefined = useSelector<IState, number | undefined>(
    (state) => state.relationships.mainRoomId
  )
  const styles = useStyles()
  const dispatch = useDispatch()

  // Unset the main room when this component is unmounted. (To avoid having a room selected by default when the user navigates to the chat page)
  React.useEffect(() => {
    return () => {
      dispatch(setMainRoomId(undefined))
    }
  }, [dispatch])

  return (
    <div className={styles.chatMenuAndChatView}>
      <ChatMenu />
      <ChatView roomId={mainRoomId} />
    </div>
  )
}

export default React.memo(MainChat)
