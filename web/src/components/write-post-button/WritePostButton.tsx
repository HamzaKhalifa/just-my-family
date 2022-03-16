import React from 'react'
import { useSelector } from 'react-redux'

import UserProfilePicture from 'components/user-profile-picture'

import useStyles from './styles'
import { SizeEnum } from 'components/user-profile-picture/UserProfilePicture'
import { IState } from 'store'

interface IButton {
  onClick?: any
}

const WritePostButton = (props: IButton) => {
  const profilePicture: string | undefined = useSelector<IState, string | undefined>(
    (state) => state.profile.profilePicture
  )

  const styles = useStyles()

  return (
    <div className={styles.writePostButtonContainer}>
      <UserProfilePicture profilePicture={profilePicture} size={SizeEnum.Small} />

      <div onClick={props.onClick} className={styles.whatsInYourMindInput}>
        What's in your mind
      </div>
    </div>
  )
}

export default React.memo(WritePostButton)
