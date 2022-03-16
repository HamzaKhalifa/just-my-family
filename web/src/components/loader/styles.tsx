import { createUseStyles } from 'react-jss'

import { ITheme } from 'theme'

const useStyles = createUseStyles((theme: ITheme) => ({
  loader: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 99,
  },
}))

export default useStyles
