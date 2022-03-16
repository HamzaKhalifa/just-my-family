import { createUseStyles } from 'react-jss'

import { ITheme } from 'theme'

const useStyles = createUseStyles((theme: ITheme) => ({
  chatMenuContainer: {
    flex: 1,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: theme.frontColor,
    padding: '15px',
    borderRadius: '20px',
    boxSizing: 'border-box',
    boxShadow: '0px 10px 40px ' + theme.shadowColor,
  },
  chatMenuTitle: {
    color: theme.textColor1,
    textAlign: 'left',
    width: '100%',
    marginBottom: '10px',
  },
}))

export default useStyles
