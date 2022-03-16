import React from 'react'
import { useDispatch } from 'react-redux'

import ProfilePicture from 'components/profile-picture'
import ButtonWithConfirmationModal from 'components/button-with-confirmation-modal'

import { AiOutlineLogout } from 'react-icons/ai'

import { logout } from 'store/auth/actions'

import useStyles from './styles'

const ProfileView = () => {
  const styles = useStyles()
  const dispatch = useDispatch()

  const handleLogout = () => dispatch(logout())

  return (
    <div className={styles.profileViewContainer}>
      <ProfilePicture />
      <br />
      <ButtonWithConfirmationModal
        buttonText="Logout"
        buttonIcon={AiOutlineLogout}
        onConfirm={handleLogout}
        confirmationText="Are you sure you want to logout?"
        confirmationButtonText="Logout"
        cancelButtonText="Cancel"
      />
    </div>
  )
}

export default React.memo(ProfileView)
