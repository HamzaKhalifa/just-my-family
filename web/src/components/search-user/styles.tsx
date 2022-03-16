import { createUseStyles } from 'react-jss'

import { ITheme } from 'theme'

const useStyles = createUseStyles((theme: ITheme) => ({
  searchResult: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxHeight: '300px',
    overflow: 'visible',
    position: 'relative',
  },
}))

export default useStyles
