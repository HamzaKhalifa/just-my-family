import { createUseStyles } from 'react-jss'

import { ITheme } from 'theme'

const useStyles = createUseStyles((theme: ITheme) => ({
  postCardContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '20px',
    paddingBottom: '20px',
    backgroundColor: theme.frontColor,
    borderRadius: '20px',
    padding: '20px 10px',
    boxShadow: '0px 5px 10px ' + theme.shadowColor,
    width: '100%',
    maxWidth: '700px',
    minWidth: '300px',
    margin: 'auto',
    boxSizing: 'border-box',
  },
  postContent: {
    marginTop: '10px',
    paddingLeft: '60px',
  },

  // Comment creation
  createCommentModalContainer: {
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: '15px',
    maxHeight: 'calc(100vh - 200px)',
    position: 'relative',
  },
  createCommentHeader: {
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

  // Comments section
  hideShowComments: {
    color: theme.secondaryColor,
    margin: 'auto',
    marginBottom: '10px',
    cursor: 'pointer',
  },
  loadMoreComments: {
    color: theme.secondaryColor,
    margin: 'auto',
    marginBottom: '10px',
    cursor: 'pointer',
  },
  commentsList: {
    display: 'flex',
    flexDirection: 'column',
  },
}))

export default useStyles
