import { createUseStyles } from 'react-jss'

import { ITheme } from 'theme'

const useStyles = createUseStyles((theme: ITheme) => ({
  buttonContainer: {
    border: 'none',
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'center',
    height: '40px',
    padding: '0px 15px',
    boxShadow: '0px 10px 40px ' + theme.shadowColor,
    position: 'relative',
    width: '100%',
    boxSizing: 'border-box',
    cursor: 'pointer',
    backgroundColor: theme.frontColor,
  },
  buttonContainerFilled: {
    extend: 'buttonContainer',
    backgroundColor: theme.primaryColor,
  },
  buttonTitle: {
    color: theme.primaryColor,
    whiteSpace: 'nowrap',
    fontSize: '17px',
    marginLeft: '10px',
  },
  buttonTitleFilled: {
    extend: 'buttonTitle',
    color: theme.frontColor,
  },
  buttonDislabed: {
    extend: 'buttonContainer',
    backgroundColor: theme.shadowColor,
  },
}))

export default useStyles
