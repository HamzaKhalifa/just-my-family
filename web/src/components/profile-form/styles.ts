import { createUseStyles } from 'react-jss'

import { ITheme } from 'theme'

const useStyles = createUseStyles((theme: ITheme) => ({
  profileForm: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '40px',
    border: '2px solid ' + theme.primaryColor,
    padding: '20px 10px',
    boxSizing: 'border-box',
    borderRadius: '20px',
  },
}))

export default useStyles
