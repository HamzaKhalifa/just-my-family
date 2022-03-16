import { createUseStyles } from 'react-jss'

import { ITheme } from 'theme'

const useStyles = createUseStyles((theme: ITheme) => ({
  modalLayer: {
    zIndex: 100,
    position: 'fixed',
    top: '0px',
    left: '0px',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0000006b',
  },
  modalClickLayer: {
    zIndex: 101,
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: '0px',
    left: '0px',
  },
  modalContainer: {
    display: 'flex',
    padding: '20px',
    paddingBottom: '5px',
    backgroundColor: theme.frontColor,
    boxShadow: '0px 10px 40px ' + theme.shadowColor,
    borderRadius: '40px',
    zIndex: 102,
    overflow: 'auto',
  },
}))

export default useStyles
