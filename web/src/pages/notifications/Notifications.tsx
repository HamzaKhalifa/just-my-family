import React from 'react'

import useStyles from './styles'

const Notifications = () => {
  const styles = useStyles()

  return <div className={styles.notificationsContainer}>Notifications</div>
}

export default React.memo(Notifications)
