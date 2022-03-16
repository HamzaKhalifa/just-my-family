import { createUseStyles } from 'react-jss'

import { ITheme } from 'theme'

const useStyles = createUseStyles((theme: ITheme) => ({
  modalWithConfirmationContainer: {
    width: '400px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
  },
  modalWithConfirmationTitle: {
    fontSize: '20px',
    color: theme.primaryColor,
    marginBottom: '20px',
    borderBottom: '1px solid ' + theme.primaryColor,
    paddingBottom: '20px',
    textAlign: 'center',
  },
  modalWithConfirmationButtons: {
    display: 'flex',
    width: '100%',
    boxSizing: 'border-box',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
}))

export default useStyles
