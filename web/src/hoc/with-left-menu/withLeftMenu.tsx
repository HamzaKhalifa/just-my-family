import React from 'react'

import LeftMenu from 'components/left-menu'

import useStyles from './styles'

const withLeftMenu = (Component: any) => (props: any) => {
  const styles = useStyles()

  return (
    <div className={styles.withLeftMenuContainer}>
      <LeftMenu />

      <Component {...props} />
    </div>
  )
}

export default withLeftMenu
