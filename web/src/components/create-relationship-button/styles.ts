import { createUseStyles } from 'react-jss'

import { ITheme } from 'theme'

const useStyles = createUseStyles((theme: ITheme) => ({
  addMemberButtonContainer: {
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'center',
    height: '60px',
    padding: '10px 20px',
    marginBottom: '20px',
    boxShadow: '0px 10px 40px ' + theme.shadowColor,
    position: 'relative',
    width: '100%',
    boxSizing: 'border-box',
    cursor: 'pointer',
  },
  addMemberTitle: {
    color: theme.primaryColor,
    whiteSpace: 'nowrap',
    fontSize: '17px',
    marginLeft: '10px',
  },
  searchModalContainer: {
    width: '400px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
  },
  searchModalTitle: {
    fontSize: '20px',
    color: theme.primaryColor,
    marginBottom: '20px',
    borderBottom: '1px solid ' + theme.primaryColor,
    paddingBottom: '20px',
  },

  searchModalButtons: {
    display: 'flex',
    width: '100%',
    boxSizing: 'border-box',
    justifyContent: 'space-between',
    marginBottom: '20px',
    marginTop: '20px',
  },
  relationshipsContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    boxSizing: 'border-box',
  },
  certaintyMessage: {
    color: theme.primaryColor,
    fontSize: '30px',
  },
}))

export default useStyles
