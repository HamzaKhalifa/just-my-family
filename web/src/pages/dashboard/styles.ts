import { createUseStyles } from 'react-jss'

import { ITheme } from 'theme'

const useStyles = createUseStyles((theme: ITheme) => ({
  dashboardContainer: {
    display: 'flex',
    boxSizing: 'border-box',
    height: '100%',
    marginRight: '10px',
    marginLeft: '0px',
    backgroundColor: theme.secondaryFrontColor,
    padding: '20px',
    flex: 4,
    position: 'relative',
    borderRadius: '40px',
  },
}))

export default useStyles
