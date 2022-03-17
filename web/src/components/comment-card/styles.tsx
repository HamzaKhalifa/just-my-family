import { createUseStyles } from 'react-jss'

import { ITheme } from 'theme'

const useStyles = createUseStyles((theme: ITheme) => ({
  commentCardContainer: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.secondaryFrontColor,
    padding: '10px',
    borderRadius: '10px',
    marginBottom: '10px',
  },
  commentHeader: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: theme.secondaryFrontColor,
    padding: '10px',
    borderRadius: '10px',
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
  commentContent: {
    marginLeft: '70px',
  },
}))

export default useStyles
