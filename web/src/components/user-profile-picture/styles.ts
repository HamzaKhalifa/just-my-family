import { createUseStyles } from 'react-jss'

import { ITheme } from 'theme'

const useStyles = createUseStyles((theme: ITheme) => ({
  big: {
    position: 'relative',
    height: '100px',
    width: '100px',
    borderRadius: '50%',
    borderColor: theme.frontColor,
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
  },
  average: {
    extend: 'big',
    height: '70px',
    width: '70px',
  },
  small: {
    extend: 'big',
    height: '40px',
    width: '40px',
  },
}))

export default useStyles
