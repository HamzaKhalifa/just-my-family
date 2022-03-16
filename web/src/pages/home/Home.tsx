import React from 'react'

import PostEditor from 'components/post-editor'

import useStyles from './styles'

const Home = () => {
  const styles = useStyles()

  return (
    <div className={styles.homeContainer}>
      <PostEditor />
    </div>
  )
}

export default React.memo(Home)
