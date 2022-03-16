import React from 'react'

import useStyles from './styles'

interface INotification {
  number?: number
}

const Notification = (props: INotification) => {
  const styles = useStyles()

  if (!props.number) return null

  return <div className={styles.notification}>{props.number}</div>
}

export default React.memo(Notification)
