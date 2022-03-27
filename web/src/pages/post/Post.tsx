import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import PostCard from 'components/post-card'
import Loader from 'components/loader'
import withProfileView from 'hoc/with-profile-view'

import useStyles from './styles'
import { IState } from 'store'
import { IPostState } from 'store/post/initialState'

const Post = () => {
  const styles = useStyles()
  const postId = useParams().id

  const currentPost: IPostState | undefined = useSelector<IState, IPostState | undefined>(
    (state) => state.posts.currentPost
  )

  if (!currentPost) return <Loader />

  return (
    <div className={styles.postContainer}>
      <PostCard post={currentPost} />
    </div>
  )
}

export default Post
