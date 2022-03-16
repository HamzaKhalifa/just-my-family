import { createUseStyles } from 'react-jss'

import { ITheme } from 'theme'

const useStyles = createUseStyles((theme: ITheme) => ({
  selectRelationshipContainer: {
    maxHeight: '400px',
    overflow: 'visible',
    backgroundColor: theme.frontColor,
    width: '90%',
    margin: 'auto',
    marginBottom: '0px',
    borderRadius: '20px',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
}))

export default useStyles
