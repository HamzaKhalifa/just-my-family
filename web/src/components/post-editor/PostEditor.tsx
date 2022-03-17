import React from 'react'
import { useTheme } from 'react-jss'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import SunEditor from 'suneditor-react'
import 'suneditor/dist/css/suneditor.min.css'
import SunEditorCore from 'suneditor/src/lib/core'

import { createPost } from 'store/post/actions'

import WritePostButton from 'components/write-post-button'
import Modal from 'components/modal'
import Button from 'components/button'

import { ImCross } from 'react-icons/im'

import useStyles from './styles'
import { ITheme } from 'theme'

interface IPostEditor {}

const PostEditor = (props: IPostEditor) => {
  const [postModalOpen, setPostModalOpen] = React.useState<boolean>(false)
  const [sunEditor, setSunEditor] = React.useState<SunEditorCore | undefined>(undefined)
  const [pictures, setPictures] = React.useState<string[]>([])

  const styles = useStyles()
  const theme: ITheme = useTheme()
  const dispatch = useDispatch()

  const handleSubmit = (e: any) => {
    e.preventDefault()

    const content: string | undefined = sunEditor?.getContents(true)
    if (!content || content.trim() === '<p><br></p>') return toast.error("Content shouldn't be empty")

    dispatch(createPost(content, pictures))
    setPostModalOpen(false)
    sunEditor?.setContents('')
  }

  // Autofocus prop is not working. So we manually focus the editor when the modal shows
  React.useEffect(() => {
    if (postModalOpen && sunEditor) {
      sunEditor.core.focus()
    }
  }, [postModalOpen, sunEditor])

  return (
    <div className={styles.postEditorContainer}>
      <WritePostButton onClick={() => setPostModalOpen(true)} />

      <Modal onClose={() => setPostModalOpen(false)} open={postModalOpen}>
        <form onSubmit={handleSubmit} className={styles.createPostModalContainer}>
          <div className={styles.createPostHeader}>
            <h2>Create Post</h2>

            <div onClick={() => setPostModalOpen(false)} className={styles.closeButton}>
              <ImCross color={theme.frontColor} />
            </div>
          </div>

          <SunEditor getSunEditorInstance={(sunEditor) => setSunEditor(sunEditor)} height="200px" />

          <Button
            text="Post"
            filled
            type="submit"
            style={{ marginTop: '10px', display: 'flex', justifyContent: 'center' }}
          />
        </form>
      </Modal>
    </div>
  )
}

export default React.memo(PostEditor)
