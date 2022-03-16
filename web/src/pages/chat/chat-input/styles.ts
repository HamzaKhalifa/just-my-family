import { createUseStyles } from 'react-jss'

import { ITheme } from 'theme'

const useStyles = createUseStyles((theme: ITheme) => ({
  chatInputContainer: {
    border: 'none',
    borderRadius: '40px',
    display: 'flex',
    alignItems: 'center',
    minHeight: '80px',
    padding: '0px 20px',
    boxShadow: '0px 10px 40px ' + theme.shadowColor,
    position: 'relative',
    width: '100%',
    boxSizing: 'border-box',
    backgroundColor: theme.frontColor,
  },
  chatInput: {
    border: 'none',
    borderRadius: '40px',
    color: theme.textColor1,
    marginLeft: '10px',
    flex: 1,
    fontSize: '20px',
    backgroundColor: theme.frontColor,
    marginRight: '10px',
    paddingTop: '10px',
    paddingBottom: '10px',
    whiteSpace: 'pre-wrap',
  },
  plusContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.secondaryFrontColor,
    borderRadius: '50%',
    height: '50px',
    width: '50px',
    cursor: 'pointer',
  },
  sendContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.secondaryFrontColor,
    borderRadius: '50%',
    height: '50px',
    width: '50px',
    cursor: 'pointer',
    marginLeft: '10px',
  },
  emoji: {
    cursor: 'pointer',
  },
  loadingContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    height: '50px',
    width: '50px',
    cursor: 'pointer',
    marginLeft: '10px',
  },
}))

export default useStyles
