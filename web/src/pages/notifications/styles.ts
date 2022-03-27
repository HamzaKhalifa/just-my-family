import { createUseStyles } from 'react-jss'

import { ITheme } from 'theme'

const useStyles = createUseStyles((theme: ITheme) => ({
  notificationsContainer: {
    display: 'flex',
    width: '100%',
    flexWrap: 'wrap',
    height: 'fit-content',
  },
}))

export default useStyles
