import React from 'react'
import { useTheme } from 'react-jss'
import { useDispatch } from 'react-redux'
import SunEditor from 'suneditor-react'
import 'suneditor/dist/css/suneditor.min.css'
import { toast } from 'react-toastify'
import SunEditorCore from 'suneditor/src/lib/core'

import PostActionButtons from 'components/post-action-buttons'
import WriteCommentButton from 'components/write-comment-button'
import Modal from 'components/modal'
import Button from 'components/button'
import PostHeader from 'components/post-header'

import { ImCross } from 'react-icons/im'

import { createComment } from 'store/post/actions'

import useStyles from './styles'
import { IPostState } from 'store/post/initialState'
import { ITheme } from 'theme'

interface IPostCard {
  post: IPostState
}

const PostCard = (props: IPostCard) => {
  const [commentModalOpen, setCommentModalOpen] = React.useState<boolean>(false)
  const [sunEditor, setSunEditor] = React.useState<SunEditorCore | undefined>(undefined)

  const styles = useStyles()
  const dispatch = useDispatch()
  const theme: ITheme = useTheme()

  const handleSubmitComment = (e: any) => {
    e.preventDefault()
    const content: string | undefined = sunEditor?.getContents(true)
    if (content && content.trim() !== '' && props.post?.post?.id) {
      dispatch(createComment(props.post?.post?.id, content))
    } else {
      toast.error('Please write something first')
    }

    setCommentModalOpen(false)
    sunEditor?.setContents('')
  }

  // Autofocus prop is not working. So we manually focus the editor when the modal shows
  React.useEffect(() => {
    if (commentModalOpen && sunEditor) {
      sunEditor.core.focus()
    }
  }, [commentModalOpen, sunEditor])

  return (
    <div className={styles.postCardContainer}>
      <PostHeader post={props.post} />

      <div className={styles.postContent} dangerouslySetInnerHTML={{ __html: props.post.post.content }}></div>

      <PostActionButtons post={props.post} />

      <WriteCommentButton onClick={() => setCommentModalOpen(true)} />

      <div className={styles.commentsList}></div>

      <Modal onClose={() => setCommentModalOpen(false)} open={commentModalOpen}>
        <form onSubmit={handleSubmitComment} className={styles.createCommentModalContainer}>
          <div className={styles.createCommentHeader}>
            <h2>Post a comment</h2>

            <div onClick={() => setCommentModalOpen(false)} className={styles.closeButton}>
              <ImCross color={theme.frontColor} />
            </div>
          </div>

          <SunEditor getSunEditorInstance={(sunEditor) => setSunEditor(sunEditor)} height="200px" />

          <Button
            text="Comment"
            filled
            type="submit"
            style={{ marginTop: '10px', display: 'flex', justifyContent: 'center' }}
          />
        </form>
      </Modal>
    </div>
  )
}

export default React.memo(PostCard)
