import { createUseStyles } from 'react-jss'

import { ITheme } from 'theme'

const useStyles = createUseStyles((theme: ITheme) => ({
  notification: {
    display: 'flex',
    backgroundColor: theme.error,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    height: '25px',
    width: '25px',
    color: theme.frontColor,
  },
}))

export default useStyles
