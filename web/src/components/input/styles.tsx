import { createUseStyles } from 'react-jss'

import { ITheme } from 'theme'

const useStyles = createUseStyles((theme: ITheme) => ({
  inputContainer: {
    border: 'none',
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'center',
    height: '40px',
    padding: '0px 20px',
    marginBottom: '35px',
    boxShadow: '0px 10px 40px ' + theme.shadowColor,
    position: 'relative',
    width: '100%',
    boxSizing: 'border-box',
  },
  inputErrorContainer: {
    extend: 'inputContainer',
    boxShadow: '0px 10px 40px ' + theme.shadowError,
  },
  input: {
    border: 'none',
    color: theme.textColor1,
    marginLeft: '10px',
    flex: 1,
    height: '100%',
    fontSize: '20px',
  },
  error: {
    color: theme.error,
    position: 'absolute',
    whiteSpace: 'nowrap',
    top: '45px',
  },
}))

export default useStyles
