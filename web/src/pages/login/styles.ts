import { createUseStyles } from 'react-jss'

import { ITheme } from 'theme'

const useStyles = createUseStyles((theme: ITheme) => ({
  loginContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '400px',
  },
  greetingsText: {
    color: theme.primaryColor,
    marginTop: '100px',
    fontSize: '40px',
  },
  loginText: {
    color: theme.secondaryColor,
    fontSize: '20px',
  },
  form: {
    marginTop: '40px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  registerLink: {
    marginTop: '20px',
    letterSpacing: '2px',
    color: theme.secondaryColor,
  },
  registerText: {
    color: theme.primaryColor,
    marginLeft: '5px',
    letterSpacing: '2px',
  },
  resetPasswordLink: {
    marginTop: '20px',
    letterSpacing: '2px',
    color: theme.secondaryColor,
  },
  restPasswordText: {
    color: theme.primaryColor,
    marginLeft: '5px',
    letterSpacing: '2px',
  },
}))

export default useStyles
