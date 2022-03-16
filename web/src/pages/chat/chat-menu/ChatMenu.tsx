import React from 'react'
import { BiSearchAlt } from 'react-icons/bi'

import Input from 'components/input'
import CreateRelationshipButton from 'components/create-relationship-button'
import ChatList from 'pages/chat/chat-list'

import useStyles from './styles'

const ChatMenu = () => {
  const styles = useStyles()
  const searchRef = React.useRef()

  return (
    <div className={styles.chatMenuContainer}>
      <CreateRelationshipButton />

      <br />

      <h2 className={styles.chatMenuTitle}>Chat</h2>
      <Input ref={searchRef} SuffixIcon={BiSearchAlt} placeholder="Search" />

      <ChatList />
    </div>
  )
}

export default React.memo(ChatMenu)
