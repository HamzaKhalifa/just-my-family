import React from 'react'
import { FcLike } from 'react-icons/fc'
import { GiPartyPopper } from 'react-icons/gi'
import { FaLaughSquint, FaLaughWink } from 'react-icons/fa'

import Button from 'components/button'

import useStyles from './styles'
import { IPostState } from 'store/post/initialState'

interface IPostActionButtons {
  post: IPostState
}

const PostActionButtons = (props: IPostActionButtons) => {
  const styles = useStyles()

  const buttonStyle = { marginRight: '10px', width: '60px', display: 'flex', justifyContent: 'center' }
  return (
    <div className={styles.postActionButtonsContainer}>
      <Button style={buttonStyle} text="" PrefixIcon={FcLike} />
      <Button style={buttonStyle} text="" PrefixIcon={GiPartyPopper} />
      <Button style={buttonStyle} text="" PrefixIcon={FaLaughSquint} />
      <Button style={buttonStyle} text="" PrefixIcon={FaLaughWink} />
    </div>
  )
}

export default React.memo(PostActionButtons)
