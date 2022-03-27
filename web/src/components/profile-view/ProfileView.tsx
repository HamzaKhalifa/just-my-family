import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import ProfilePicture from 'components/profile-picture'
import ButtonWithConfirmationModal from 'components/button-with-confirmation-modal'
import ProfileForm from 'components/profile-form'

import { AiOutlineLogout, AiTwotoneEdit } from 'react-icons/ai'

import { logout } from 'store/auth/actions'

import useStyles from './styles'
import { IUser } from 'types/interfaces/IUser'
import { IState } from 'store'

const ProfileView = () => {
  const user: IUser | undefined = useSelector<IState, IUser | undefined>((state) => state.profile.user?.user)

  const [profileFormActive, setProfileFormActive] = React.useState<boolean>(false)

  const styles = useStyles()
  const dispatch = useDispatch()

  const handleLogout = () => dispatch(logout())
  const handleToggleProfileForm = () => setProfileFormActive(!profileFormActive)

  return (
    <div className={styles.profileViewContainer}>
      <ProfilePicture />
      <br />

      <div className={styles.firstNameAndLastNameContainer}>
        <span className={styles.firstNameAndLastName}>
          {(user?.firstName || '-') + ' ' + (user?.lastName || '-')}
        </span>
        <AiTwotoneEdit onClick={handleToggleProfileForm} className={styles.editIcon} />
      </div>

      {profileFormActive && <ProfileForm />}

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
