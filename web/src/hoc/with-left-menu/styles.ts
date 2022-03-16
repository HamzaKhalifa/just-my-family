import { createUseStyles } from 'react-jss'

import { ITheme } from 'theme'

const useStyles = createUseStyles((theme: ITheme) => ({
  withLeftMenuContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: theme.primaryColor,
    minHeight: '100vh',
    width: '100%',
    position: 'relative',
  },
}))

export default useStyles
