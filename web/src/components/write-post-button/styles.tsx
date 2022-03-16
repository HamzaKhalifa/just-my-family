import { createUseStyles } from 'react-jss'

import { ITheme } from 'theme'

const useStyles = createUseStyles((theme: ITheme) => ({
  writePostButtonContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
  },
  whatsInYourMindInput: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.tertiaryFrontColor,
    height: '40px',
    paddingLeft: '10px',
    opacity: '.3',
    marginLeft: '10px',
    borderRadius: '20px',
    flex: 1,
    cursor: 'pointer',
    '&:hover': {
      opacity: '.7',
    },
  },
}))

export default useStyles
