import React from 'react'

import useStyles from './styles'

interface IModal {
  open?: Boolean
  children?: any
  onClose?: any
}

const Modal = (props: IModal) => {
  const styles = useStyles()

  return (
    <div style={{ display: props.open ? 'flex' : 'none' }} className={styles.modalLayer}>
      <div
        onClick={(e) => {
          e.stopPropagation()
          props.onClose?.()
        }}
        className={styles.modalClickLayer}
      ></div>
      <div className={styles.modalContainer}>{props.children}</div>
    </div>
  )
}

export default React.memo(Modal)
