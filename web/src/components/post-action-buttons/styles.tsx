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
    position: 'relative',
  },
  loadingLayer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: '0px',
    top: '0px',
    backgroundColor: theme.tertiaryFrontColor,
    zIndex: 2,
    opacity: 0.3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    position: 'relative',
  },
  numberOfReactions: {
    position: 'absolute',
    color: theme.primaryColor,
    fontSize: '14px',
    top: '37px',
    right: '-55px',
    textAlign: 'left',
    width: '70px',
    zIndex: 9,
  },
}))

export default useStyles
