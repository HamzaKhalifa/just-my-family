import React from 'react'

import Modal from 'components/modal'
import Button from 'components/button'

import { FcCancel } from 'react-icons/fc'

import useStyles from './styles'

interface IButtonWithConfirmationModal {
  buttonText: string
  onConfirm: any
  confirmationText: string
  confirmationButtonText: string
  cancelButtonText: string
  buttonIcon: any
  buttonLoading?: boolean
}

const ButtonWithConfirmationModal = (props: IButtonWithConfirmationModal) => {
  const [modalOpen, setModalOpen] = React.useState<boolean>(false)

  const styles = useStyles()

  const onConfirm = () => {
    props.onConfirm()
    setModalOpen(false)
  }

  return (
    <>
      <Button
        onClick={() => setModalOpen(true)}
        PrefixIcon={props.buttonIcon}
        text={props.buttonText}
        loading={props.buttonLoading}
      />

      <Modal onClose={() => setModalOpen(false)} open={modalOpen}>
        <div className={styles.modalWithConfirmationContainer}>
          <h2 className={styles.modalWithConfirmationTitle}>{props.confirmationText}</h2>
          <div className={styles.modalWithConfirmationButtons}>
            <Button
              filled
              PrefixIcon={props.buttonIcon}
              onClick={onConfirm}
              text={props.confirmationButtonText}
            />
            <div style={{ width: '30px' }} />
            <Button PrefixIcon={FcCancel} onClick={() => setModalOpen(false)} text={props.cancelButtonText} />
          </div>
        </div>
      </Modal>
    </>
  )
}

export default React.memo(ButtonWithConfirmationModal)
