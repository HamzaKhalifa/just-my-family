import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'

import { getTotalUnseenInvitations } from 'store/relationships/actions'
import { getTotalUnseenReactions } from 'store/notifications/actions'

import { connection } from 'store/middlewares/signalRMiddleware'

import { IState } from 'store'
import { HubConnectionState } from 'redux-signalr'

interface ICore {}

const Core = (props: ICore) => {
  const token: string | undefined = useSelector<IState, string | undefined>((state) => state.auth.token)

  const dispatch = useDispatch()

  // Relationships' invitations notifications
  // Unseen reactions notifications
  React.useEffect(() => {
    if (token) {
      dispatch(getTotalUnseenInvitations())
      dispatch(getTotalUnseenReactions())
    }
  }, [token, dispatch])

  // Only connect to signalR when there is a valid token
  React.useEffect(() => {
    if (token && connection.state !== HubConnectionState.Connected) {
      connection.start().then(() => console.log('Connected to hub'))
    }
  }, [token])

  return (
    <>
      <ToastContainer position={toast.POSITION.BOTTOM_CENTER} draggable hideProgressBar />
    </>
  )
}

export default React.memo(Core)
