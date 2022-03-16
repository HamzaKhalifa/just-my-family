import { createUseStyles } from 'react-jss'

import { ITheme } from 'theme'

const useStyles = createUseStyles((theme: ITheme) => ({
  uploadProfilePictureContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: '100%',
  },
  profilePictureContainer: {
    position: 'relative',
    height: '100px',
    width: '100px',
    borderRadius: '50%',
    borderColor: theme.primaryColor,
    boxShadow: '0px 10px 40px ' + theme.shadowColor,
    borderWidth: '5px',
    borderStyle: 'solid',
    cursor: 'pointer',
    transitionDuration: '350ms',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    backgroundSize: 'cover',
    backgroundBlendMode: 'screen',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundOrigin: 'inherit',
    '&:hover': {
      backgroundColor: theme.primaryColor,
    },
    '&:hover $uploadIcon': {
      display: 'block',
    },
    '&:hover $defaultIcon': {
      display: 'none',
    },
  },
  uploadIcon: {
    display: 'none',
  },
  defaultIcon: {
    position: 'absolute',
    top: 'calc(100% - (45px / 2px))',
    left: 'calc(100% - (45px / 2px))',
    width: '70px',
    height: '70px',
  },
}))

export default useStyles
