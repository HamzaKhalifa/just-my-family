import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'

import { getUnseenInvitationsCount } from 'store/relationships/actions'

import { IState } from 'store'

interface ICore {}

const Core = (props: ICore) => {
  const token: string | undefined = useSelector<IState, string | undefined>((state) => state.auth.token)

  const dispatch = useDispatch()

  // Relationships' invitations notifications
  React.useEffect(() => {
    dispatch(getUnseenInvitationsCount())
  }, [token, dispatch])

  return (
    <>
      <ToastContainer position={toast.POSITION.BOTTOM_CENTER} draggable hideProgressBar />
    </>
  )
}

export default React.memo(Core)
