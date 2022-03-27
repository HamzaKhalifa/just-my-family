import { createUseStyles } from 'react-jss'

import { ITheme } from 'theme'

const useStyles = createUseStyles((theme: ITheme) => ({
  profileViewContainer: {
    flex: 1,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: theme.frontColor,
    padding: '15px',
    borderRadius: '40px',
    boxSizing: 'border-box',
    boxShadow: '0px 10px 40px ' + theme.shadowColor,
  },
  firstNameAndLastNameContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  },
  firstNameAndLastName: {
    color: theme.textColor1,
    fontSize: '15px',
  },
  editIcon: {
    cursor: 'pointer',
    color: theme.primaryColor,
    marginLeft: '10px',
    fontSize: '20px',
  },
}))

export default useStyles
