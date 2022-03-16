import { createUseStyles } from 'react-jss'

import { ITheme } from 'theme'

const useStyles = createUseStyles((theme: ITheme) => ({
  chatViewContainer: {
    flex: 3,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'transparent',
    padding: '10px',
    height: '100%',
    boxSizing: 'border-box',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
  },
  messagesContainer: {
    overflow: 'auto',
    flex: 1,
    flexDirection: 'column',
  },
  left: {
    display: 'flex',
    alignItems: 'center',
  },
  headerNameAndStatus: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: '5px',
  },
  headerName: {
    color: theme.textColor1,
  },
  status: {
    color: theme.tertiaryFrontColor,
  },
}))

export default useStyles
