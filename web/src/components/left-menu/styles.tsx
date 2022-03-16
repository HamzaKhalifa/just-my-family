import { createUseStyles } from 'react-jss'

import { ITheme } from 'theme'

const useStyles = createUseStyles((theme: ITheme) => ({
  leftMenuContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: '100vh',
    width: '115px',
  },
  menuButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100px',
    cursor: 'pointer',
    boxSizing: 'border-box',
    borderLeft: '4px solid ' + theme.primaryColor,
    position: 'relative',
  },
  selectedMenuButton: {
    extend: 'menuButton',
    borderLeft: '4px solid white',
  },
  notificationContainer: {
    position: 'absolute',
    right: 'calc(50% - 40px)',
    top: 'calc(50% - 30px)',
  },
}))

export default useStyles
