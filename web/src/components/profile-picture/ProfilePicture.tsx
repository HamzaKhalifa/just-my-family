import React from 'react'
import { useTheme } from 'react-jss'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import Button from 'components/button'

import { getProfilePicture, setProfilePicture } from 'store/profile/actions'

import { GiCloudUpload } from 'react-icons/gi'
import { IoSaveOutline } from 'react-icons/io5'
import { GiCancel } from 'react-icons/gi'
import { GoPerson } from 'react-icons/go'

import useStyles from './styles'
import { ITheme } from 'theme'
import { IState } from 'store'
import { IParsedToken } from 'types/interfaces/IParsedToken'

const ProfilePicture = () => {
  //#region Store
  const token: string | undefined = useSelector<IState, string | undefined>((state) => state.auth.token)
  const parsedToken: IParsedToken | undefined = useSelector<IState, IParsedToken | undefined>(
    (state) => state.auth.parsedToken
  )
  const profilePicture: string | undefined = useSelector<IState, string | undefined>(
    (state) => state.profile.profilePicture
  )
  //#endregion Store

  //#region State
  const [newProfilePicture, setNewProfilePicture] = React.useState<string | undefined>(undefined)
  const [loading, setLoading] = React.useState<boolean>(false)

  const styles = useStyles()
  const theme: ITheme = useTheme()
  const dispatch = useDispatch()
  //#endregion State

  //#region Hooks
  const fileInputRef: any = React.useRef()
  // Getting the profile picture
  React.useEffect(() => {
    dispatch(getProfilePicture())
  }, [parsedToken])
  //#endregion Hooks

  //#region Event handlers
  const handleInputFileClick = () => fileInputRef?.current?.click()
  const handleFileChange = (e: any) => {
    const reader = new FileReader()
    reader.readAsDataURL(e.target.files[0])
    reader.onload = () => {
      setNewProfilePicture(reader.result as string)
    }
  }
  const handleSaveProfilePicture = () => {
    if (!Boolean(newProfilePicture)) return

    const toastId = toast.info('Uploading picture...')

    if (!token) return

    axios
      .request({
        method: 'POST',
        url: process.env.REACT_APP_API + '/user/changeProfilePicture',
        headers: {
          authorization: 'Bearer ' + token,
        },
        data: {
          base64: newProfilePicture,
        },
      })
      .then(() => {
        toast.info('Picture has been updated 👌')
        dispatch(setProfilePicture(newProfilePicture))
        setNewProfilePicture(undefined)
      })
      .catch((error) => error.response?.data.messages?.forEach((message: string) => toast.error(message)))
      .finally(() => {
        toast.update(toastId, { isLoading: false, autoClose: 3000 })
        setLoading(false)
      })
  }
  const handleCancel = () => setNewProfilePicture(undefined)
  //#endregion Event handlers

  return (
    <div className={styles.uploadProfilePictureContainer}>
      <div
        onClick={handleInputFileClick}
        className={styles.profilePictureContainer}
        style={{
          backgroundImage: 'url(' + (newProfilePicture || profilePicture || '') + ')',
        }}
      >
        {/* Default icon */}
        {!Boolean(profilePicture || newProfilePicture) && (
          <GoPerson className={styles.defaultIcon} size={50} color={theme.primaryColor} />
        )}

        {/* Upload icon */}
        <GiCloudUpload className={styles.uploadIcon} color={theme.frontColor} size={60} />
        <input style={{ display: 'none' }} ref={fileInputRef} type="file" onChange={handleFileChange} />
      </div>

      {Boolean(newProfilePicture) && (
        <Button
          text="Save"
          filled
          onClick={handleSaveProfilePicture}
          style={{
            display: 'flex',
            width: '100%',
            marginBottom: '5px',
            marginTop: '5px',
          }}
          PrefixIcon={IoSaveOutline}
          loading={loading}
        />
      )}
      {Boolean(newProfilePicture) && (
        <Button
          text="Cancel"
          onClick={handleCancel}
          style={{
            display: 'flex',
            width: '100%',
          }}
          PrefixIcon={GiCancel}
        />
      )}
    </div>
  )
}

export default React.memo(ProfilePicture)
