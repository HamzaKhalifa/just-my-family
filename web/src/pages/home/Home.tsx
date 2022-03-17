import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import PostCard from 'components/post-card'
import PostEditor from 'components/post-editor'

import { getFeedPosts } from 'store/post/actions'

import useStyles from './styles'
import { IState } from 'store'
import { IPostState } from 'store/post/initialState'

const Home = () => {
  const posts: IPostState[] = useSelector<IState, IPostState[]>((state) => state.posts.feedPosts)

  const styles = useStyles()
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(getFeedPosts(1, 10))
  }, [])

  return (
    <div className={styles.homeContainer}>
      <PostEditor />

      <div className={styles.postsContainer}>
        {posts.map((post) => (
          <PostCard key={post.post.id} post={post} />
        ))}
      </div>
    </div>
  )
}

export default React.memo(Home)
