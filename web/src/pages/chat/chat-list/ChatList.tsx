import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import ChatListUser from '../chat-list-user'
import Loader from 'components/loader'

import { getApprovedRelationships } from 'store/relationships/actions'

import useStyles from './styles'
import { IRelationship } from 'types/interfaces/IRelationship'
import { IState } from 'store'
import { IParsedToken } from 'types/interfaces/IParsedToken'
import { IRoomState } from 'types/interfaces/IRoomState'

const ChatList = () => {
  const approvedRelationships: IRoomState<IRelationship>[] = useSelector<IState, IRoomState<IRelationship>[]>(
    (state) => state.relationships.approvedRelationships
  )
  const loading: boolean = useSelector<IState, boolean>(
    (state) => state.relationships.loadings['approvedRelationships']
  )
  const parsedToken: IParsedToken | undefined = useSelector<IState, IParsedToken | undefined>(
    (state) => state.auth.parsedToken
  )

  const styles = useStyles()
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(getApprovedRelationships())
  }, [dispatch])

  return (
    <div className={styles.chatListContainer}>
      {loading && <Loader />}
      {!loading &&
        approvedRelationships.map((approvedRelationship, index) => (
          <ChatListUser
            key={index}
            relationship={approvedRelationship}
            user={
              approvedRelationship.room?.user1Id === parsedToken?.nameid
                ? approvedRelationship.room?.user2
                : approvedRelationship.room?.user1
            }
          />
        ))}
    </div>
  )
}

export default React.memo(ChatList)
