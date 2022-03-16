import { createUseStyles } from 'react-jss'

import { ITheme } from 'theme'

const useStyles = createUseStyles((theme: ITheme) => ({
  chatListUserContainer: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    paddingTop: '10px',
    paddingBottom: '10px',
    borderBottom: '1px solid ' + theme.secondaryFrontColor,
    position: 'relative',
  },
  nameAndLastConnected: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '10px',
  },
  lastConnected: {
    color: theme.tertiaryFrontColor,
    fontSize: '13px',
  },
  notificationContainer: {
    display: 'flex',
    position: 'absolute',
    left: '60px',
    top: '5px',
  },
}))

export default useStyles
