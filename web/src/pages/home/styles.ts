import { createUseStyles } from 'react-jss'

import { ITheme } from 'theme'

const useStyles = createUseStyles((theme: ITheme) => ({
  homeContainer: {
    display: 'flex',
    width: '100%',
    overflow: 'visible',
    margin: 'auto',
    height: '100%',
    alignItems: 'center',
    flexDirection: 'column',
  },
  postsContainer: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    overflowY: 'auto',
    overflowX: 'visible',
    height: '100%',
    paddingBottom: '200px',
    paddingRight: '20px',
    paddingLeft: '5px',
  },
}))

export default useStyles
