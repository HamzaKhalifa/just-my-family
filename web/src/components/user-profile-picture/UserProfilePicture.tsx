import React from 'react'
import { useTheme } from 'react-jss'

import { GoPerson } from 'react-icons/go'

import useStyles from './styles'
import { ITheme } from 'theme'

export enum SizeEnum {
  Big = 'big',
  Average = 'average',
  Small = 'small',
}

interface IUserProfilePicture {
  profilePictureName?: string // Just the profile picture name
  profilePicture?: string // Direct link or base64
  size: SizeEnum
}

const UserProfilePicture = (props: IUserProfilePicture) => {
  const styles = useStyles()
  const theme: ITheme = useTheme()

  // Create an empty object if the profile picture name is undefined or null
  const styleObject = {
    ...(Boolean(props.profilePictureName) || Boolean(props.profilePicture)
      ? {
          backgroundImage:
            'url(' +
            (props.profilePictureName
              ? process.env.REACT_APP_STATIC_FILES_URL +
                '/uploads/profilePictures/' +
                props.profilePictureName
              : props.profilePicture) +
            ')',
        }
      : {}),
  }

  let containerClassName = styles.average
  switch (props.size) {
    case SizeEnum.Big:
      containerClassName = styles.big
      break
    case SizeEnum.Average:
      containerClassName = styles.average
      break
    case SizeEnum.Small:
      containerClassName = styles.small
      break
  }
  return (
    <div className={containerClassName} style={styleObject}>
      {!Boolean(props.profilePictureName) && !Boolean(props.profilePicture) && (
        <GoPerson
          size={{ [SizeEnum.Big]: 100, [SizeEnum.Average]: 70, [SizeEnum.Small]: 30 }[props.size]}
          color={theme.frontColor}
        />
      )}
    </div>
  )
}

export default React.memo(UserProfilePicture)
