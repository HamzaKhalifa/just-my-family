import { createUseStyles } from 'react-jss'

import { ITheme } from 'theme'

const useStyles = createUseStyles((theme: ITheme) => ({
  relationshipsContainer: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
  },
}))

export default useStyles
