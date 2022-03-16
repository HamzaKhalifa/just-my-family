import { createUseStyles } from 'react-jss'

import { ITheme } from 'theme'

const useStyles = createUseStyles((theme: ITheme) => ({
  registerContainer: {
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
  registerText: {
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
  loginLink: {
    marginTop: '20px',
    letterSpacing: '2px',
  },
  loginText: {
    color: theme.secondaryColor,
    marginLeft: '5px',
    letterSpacing: '2px',
  },
  gender: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  genderLabel: {
    color: theme.textColor1,
    marginBottom: '10px',
    marginLeft: '10px',
    fontSize: '20px',
  },
  genderContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    width: '100%',
    justifyContent: 'space-around',
  },
}))

export default useStyles
