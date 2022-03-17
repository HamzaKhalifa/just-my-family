import React from 'react'

import PostActionButtons from 'components/post-action-buttons'

import useStyles from './styles'
import { IPostState } from 'store/post/initialState'
import UserProfilePicture from 'components/user-profile-picture'
import { SizeEnum } from 'components/user-profile-picture/UserProfilePicture'

interface IPostCard {
  post: IPostState
}

const PostCard = (props: IPostCard) => {
  const styles = useStyles()

  return (
    <div className={styles.postCardContainer}>
      <div className={styles.postHeader}>
        <UserProfilePicture
          size={SizeEnum.Small}
          profilePictureName={props.post.post.user?.profilePictureName}
        />
        <div className={styles.posterNameAndTime}>
          <span className={styles.posterName}>
            {(props.post.post.user?.firstName || '-') + ' ' + (props.post.post.user?.lastName || '-')}
          </span>
          <span className={styles.postTime}>
            {props.post.post.submittedAt.toString().slice(0, props.post.post.submittedAt.length - 5)}
          </span>
        </div>
      </div>
      <div className={styles.postContent} dangerouslySetInnerHTML={{ __html: props.post.post.content }}></div>
      <PostActionButtons post={props.post} />
    </div>
  )
}

export default React.memo(PostCard)
