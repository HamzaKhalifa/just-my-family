import { createUseStyles } from 'react-jss'

import { ITheme } from 'theme'

const useStyles = createUseStyles((theme: ITheme) => ({
  postActionButtonsContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '30px',
    paddingTop: '10px',
    paddingBottom: '10px',
    borderTop: '1px solid ' + theme.shadowColor,
    borderBottom: '1px solid ' + theme.shadowColor,
  },
}))

export default useStyles
