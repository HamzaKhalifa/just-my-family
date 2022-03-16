import { createUseStyles } from 'react-jss'

import { ITheme } from 'theme'

const useStyles = createUseStyles((theme: ITheme) => ({
  withProfileViewContainer: {
    display: 'flex',
    boxSizing: 'border-box',
    height: 'calc(100vh - 30px)',
    margin: '15px',
    marginLeft: '0px',
    flex: 1,
    position: 'relative',
    borderRadius: '40px',
  },
}))

export default useStyles
