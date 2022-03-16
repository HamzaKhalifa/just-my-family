import { createUseStyles } from 'react-jss'

import { ITheme } from 'theme'

const useStyles = createUseStyles((theme: ITheme) => ({
  profileViewContainer: {
    flex: 1,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: theme.frontColor,
    padding: '15px',
    borderRadius: '40px',
    boxSizing: 'border-box',
    boxShadow: '0px 10px 40px ' + theme.shadowColor,
  },
}))

export default useStyles
