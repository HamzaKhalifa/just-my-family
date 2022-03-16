import ProfileView from 'components/profile-view'

import useStyles from './styles'

const withProfileView = (Component: any) => (props: any) => {
  const styles = useStyles()

  return (
    <div className={styles.withProfileViewContainer}>
      <Component />
      <ProfileView />
    </div>
  )
}

export default withProfileView
