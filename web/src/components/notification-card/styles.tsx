import { createUseStyles } from 'react-jss'

import { ITheme } from 'theme'

const useStyles = createUseStyles((theme: ITheme) => ({
  notificationCardContainer: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.frontColor,
    height: '80px',
    borderRadius: '20px',
    padding: '10px',
    cursor: 'pointer',
    boxSizing: 'border-box',
    border: '2px solid ' + theme.primaryColor,
    width: '25%',
    margin: '3px',
    minWidth: '250px',
  },
  nameAndTimeContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '10px',
  },
  userFullName: {
    color: theme.textColor1,
  },
  submittedAt: {
    color: theme.tertiaryFrontColor,
    fontSize: '14px',
  },
  text: {
    color: theme.textColor2,
    fontSize: '13px',
  },
}))

export default useStyles
