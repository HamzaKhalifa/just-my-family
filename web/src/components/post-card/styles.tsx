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
  postHeader: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  posterNameAndTime: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '10px',
  },
  posterName: {
    color: theme.textColor1,
  },
  postTime: {
    color: theme.tertiaryFrontColor,
  },
  postContent: {
    marginTop: '10px',
    paddingLeft: '60px',
  },
}))

export default useStyles
