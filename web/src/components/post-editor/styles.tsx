import { createUseStyles } from 'react-jss'

import { ITheme } from 'theme'

const useStyles = createUseStyles((theme: ITheme) => ({
  postEditorContainer: {
    width: '100%',
  },
  createPostModalContainer: {
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: '15px',
    maxHeight: 'calc(100vh - 200px)',
    position: 'relative',
  },
  createPostHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '40px',
    paddingBottom: '15px',
    borderBottom: '1px solid ' + theme.secondaryColor,
    marginBottom: '10px',
  },
  closeButton: {
    cursor: 'pointer',
    position: 'absolute',
    backgroundColor: theme.tertiaryFrontColor,
    top: '0px',
    right: '5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '30px',
    height: '30px',
    borderRadius: '50%',
  },
}))

export default useStyles
