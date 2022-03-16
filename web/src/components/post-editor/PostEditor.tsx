import React from 'react'
import { useTheme } from 'react-jss'
import SunEditor from 'suneditor-react'
import 'suneditor/dist/css/suneditor.min.css'
import SunEditorCore from 'suneditor/src/lib/core'

import { ImCross } from 'react-icons/im'

import WritePostButton from 'components/write-post-button'
import Modal from 'components/modal'
import Button from 'components/button'

import useStyles from './styles'
import { ITheme } from 'theme'

interface IPostEditor {}

const PostEditor = (props: IPostEditor) => {
  const [postModalOpen, setPostModalOpen] = React.useState<boolean>(false)
  const [sunEditor, setSunEditor] = React.useState<SunEditorCore | undefined>(undefined)

  const styles = useStyles()
  const theme: ITheme = useTheme()

  const handleChange = (content: string) => {
    console.log(content)
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
        <div className={styles.createPostModalContainer}>
          <div className={styles.createPostHeader}>
            <h2>Create Post</h2>

            <div onClick={() => setPostModalOpen(false)} className={styles.closeButton}>
              <ImCross color={theme.frontColor} />
            </div>
          </div>

          <SunEditor
            getSunEditorInstance={(sunEditor) => setSunEditor(sunEditor)}
            onChange={handleChange}
            height="200px"
          />

          <Button
            text="Post"
            filled
            style={{ marginTop: '10px', display: 'flex', justifyContent: 'center' }}
          />
        </div>
      </Modal>
    </div>
  )
}

export default React.memo(PostEditor)
