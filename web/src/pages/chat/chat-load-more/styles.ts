import { createUseStyles } from 'react-jss'

import { ITheme } from 'theme'

const useStyles = createUseStyles((theme: ITheme) => ({
  chatLoadMoreContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    cursor: 'pointer',
    marginBottom: '10px',
    justifyContent: 'center',
  },
  loadMoreText: {
    color: theme.primaryColor,
    fontSize: '13px',
  },
}))

export default useStyles
