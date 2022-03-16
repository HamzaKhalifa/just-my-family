import { createUseStyles } from 'react-jss'

import { ITheme } from 'theme'

const useStyles = createUseStyles((theme: ITheme) => ({
  userCardContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: theme.primaryColor,
    alignItems: 'center',
    padding: '10px',
    borderRadius: '20px',
    marginBottom: '10px',
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  nameAndRelationshipType: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '15px',
  },
  name: {
    color: theme.frontColor,
    fontSize: '25px',
    fontWeight: 'bold',
  },
  relationship: {
    color: theme.secondaryFrontColor,
  },
  status: {
    color: theme.frontColor,
    marginRight: '10px',
    fontSize: '15px',
  },
}))

export default useStyles
