import { createUseStyles } from 'react-jss'

import { ITheme } from 'theme'

const useStyles = createUseStyles((theme: ITheme) => ({
  commentCardContainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: theme.tertiaryFrontColor,
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
  commentContent: {},
}))

export default useStyles
