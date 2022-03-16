import { createUseStyles } from 'react-jss'

import { ITheme } from 'theme'

const useStyles = createUseStyles((theme: ITheme) => ({
  container: {
    width: '100%',
    minHeight: '100vh',
    backgroundColor: 'white',
  },
  authLayoutContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    margin: 'auto',
    minHeight: '100%',
    maxWidth: '1300px',
  },
  right: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    backgroundImage: 'url("/images/auth.png")',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundPosition: 'bottom',
    minHeight: '100vh',
  },
  left: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
  },
  welcomeTitle: {
    color: theme.primaryColor,
    marginTop: '100px',
    fontSize: '60px',
    marginBottom: '40px',
  },
  welcomeText: {
    color: theme.secondaryColor,
    fontSize: '20px',
    width: '350px',
    textAlign: 'center',
  },
}))

export default useStyles
