import { createUseStyles } from 'react-jss'

import { ITheme } from 'theme'

const useStyles = createUseStyles((theme: ITheme) => ({
  checkboxContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    border: 'none',
    borderRadius: '20px',
    height: '40px',
    padding: '0px 20px',
    marginBottom: '35px',
    boxShadow: '0px 10px 40px ' + theme.shadowColor,
    position: 'relative',
    width: '100%',
    boxSizing: 'border-box',
    cursor: 'pointer',
  },
  label: {
    marginRight: '10px',
  },
  checkboxErrorContainer: {
    extend: 'checkboxContainer',
    boxShadow: '0px 10px 40px ' + theme.shadowError,
  },
  checkbox: {
    border: 'none',
    color: theme.textColor1,
    marginLeft: '10px',
    height: '100%',
    fontSize: '20px',
    cursor: 'pointer',
  },
  error: {
    color: theme.error,
    position: 'absolute',
    whiteSpace: 'nowrap',
    top: '45px',
  },
}))

export default useStyles
