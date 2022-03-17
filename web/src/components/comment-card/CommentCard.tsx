import React from 'react'

import UserProfilePicture from 'components/user-profile-picture'

import useStyles from './styles'
import { SizeEnum } from 'components/user-profile-picture/UserProfilePicture'
import { IComment } from 'types/interfaces/IComment'

interface ICommentCard {
  comment: IComment
}

const CommentCard = (props: ICommentCard) => {
  const styles = useStyles()

  return (
    <div className={styles.commentCardContainer}>
      <div className={styles.commentHeader}>
        <UserProfilePicture
          size={SizeEnum.Small}
          profilePictureName={props.comment?.user?.profilePictureName}
        />

        <div className={styles.posterNameAndTime}>
          <span className={styles.posterName}>
            {(props.comment?.user?.firstName || '-') + ' ' + (props.comment?.user?.lastName || '-')}
          </span>
          <span className={styles.postTime}>
            {props.comment?.submittedAt.toString().slice(0, props.comment?.submittedAt.length - 5)}
          </span>
        </div>
      </div>

      <p className={styles.commentContent} dangerouslySetInnerHTML={{ __html: props.comment?.content }}></p>
    </div>
  )
}

export default React.memo(CommentCard)
