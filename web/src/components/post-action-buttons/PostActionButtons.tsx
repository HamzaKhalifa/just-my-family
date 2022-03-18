import React from 'react'
import { FcLike } from 'react-icons/fc'
import { GiPartyPopper } from 'react-icons/gi'
import { FaLaughSquint, FaLaughWink } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'

import Loader from 'components/loader'
import Button from 'components/button'

import useStyles from './styles'
import { IPostState } from 'store/post/initialState'
import { ReactionEnum } from 'types/enumerations/ReactionEnum'
import { reactToPost } from 'store/post/actions'
import { IParsedToken } from 'types/interfaces/IParsedToken'
import { IState } from 'store'

interface IPostActionButtons {
  post: IPostState
}

const PostActionButtons = (props: IPostActionButtons) => {
  const parsedToken: IParsedToken | undefined = useSelector<IState, IParsedToken | undefined>(
    (state) => state.auth.parsedToken
  )
  const styles = useStyles()
  const dispatch = useDispatch()

  const handleReact = (type: ReactionEnum) => {
    dispatch(reactToPost(props.post.post.id, type))
  }

  const userReaction = props.post.post.reactions.find((r) => r.userId === parsedToken?.nameid)
  const buttonStyle = { marginRight: '10px', width: '60px', display: 'flex', justifyContent: 'center' }

  return (
    <div className={styles.postActionButtonsContainer}>
      {props.post.reactLoading && <Loader style={{ height: '100%' }} />}
      {!props.post.reactLoading && (
        <>
          <Button
            onClick={() => handleReact(ReactionEnum.Love)}
            style={buttonStyle}
            text=""
            PrefixIcon={FcLike}
            filled={userReaction?.type === ReactionEnum.Love}
          />
          <Button
            onClick={() => handleReact(ReactionEnum.Party)}
            style={buttonStyle}
            text=""
            PrefixIcon={GiPartyPopper}
            filled={userReaction?.type === ReactionEnum.Party}
          />
          <Button
            onClick={() => handleReact(ReactionEnum.Laugh)}
            style={buttonStyle}
            text=""
            PrefixIcon={FaLaughSquint}
            filled={userReaction?.type === ReactionEnum.Laugh}
          />
          <Button
            onClick={() => handleReact(ReactionEnum.Wink)}
            style={buttonStyle}
            text=""
            PrefixIcon={FaLaughWink}
            filled={userReaction?.type === ReactionEnum.Wink}
          />
        </>
      )}
    </div>
  )
}

export default React.memo(PostActionButtons)
