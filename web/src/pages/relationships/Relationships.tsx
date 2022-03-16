import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import UserRelationshipCard from 'components/user-relationship-card'
import Loader from 'components/loader'

import { getRelationships } from 'store/relationships/actions'

import useStyles from './styles'
import { IState } from 'store'
import { IRelationship } from 'types/interfaces/IRelationship'
import { IParsedToken } from 'types/interfaces/IParsedToken'

const Relationships = () => {
  const parsedToken: IParsedToken | undefined = useSelector<IState, IParsedToken | undefined>(
    (state) => state.auth.parsedToken
  )
  const relationships: IRelationship[] = useSelector<IState, IRelationship[]>(
    (state) => state.relationships.relationships
  )
  const relationshipsLoading: boolean = useSelector<IState, boolean>(
    (state) => state.relationships.loadings.relationships
  )

  const styles = useStyles()
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(getRelationships())
  }, [dispatch])

  return (
    <div className={styles.relationshipsContainer}>
      {relationshipsLoading && <Loader />}
      {relationships.map((r, index) => (
        <UserRelationshipCard
          key={index}
          user={r.user1.id === parsedToken?.nameid ? r.user2 : r.user1}
          relationship={r}
        />
      ))}
    </div>
  )
}

export default React.memo(Relationships)
