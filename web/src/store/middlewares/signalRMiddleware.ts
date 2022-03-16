import {
  signalMiddleware,
  HubConnectionBuilder,
  LogLevel,
  HttpTransportType,
  withCallbacks,
} from 'redux-signalr'

import {
  addRoomMessage,
  getUnseenInvitationsCount,
  incrementNumberOfUnseenMessages,
} from 'store/relationships/actions'

import { IMessage } from 'types/interfaces/IMessage'
import { IState } from 'store'
import { IRelationship } from 'types/interfaces/IRelationship'

export const signal = signalMiddleware({
  connection: new HubConnectionBuilder()
    .configureLogging(LogLevel.Debug)
    .withUrl(process.env.REACT_APP_HUBS_URL + '', {
      skipNegotiation: true,
      transport: HttpTransportType.WebSockets,
      accessTokenFactory: () => {
        const token = JSON.parse(JSON.parse(localStorage.getItem('persist:root') || '')?.auth)?.token || ''
        return token
      },
    })
    .build(),
  callbacks: withCallbacks()
    .add('ReceiveRelationshipNotification', (relationship: IRelationship) => (dispatch) => {
      console.log('-----------------Invitation received-----------------', relationship)
      dispatch(getUnseenInvitationsCount())
    })
    .add('ReceiveChatMessage', (message: IMessage) => (dispatch, getState: () => IState) => {
      console.log('-----------------Chat message received-----------------', message)
      const state: IState = getState()
      if (message.senderId !== getState().auth.parsedToken?.nameid) {
        const roomInStore = state.relationships.approvedRelationships.find(
          (room) => room.room?.id === message.roomId
        )
        if (roomInStore) {
          dispatch(addRoomMessage(roomInStore.room?.id, message))
          // If we aren't currently looking at the room in which the message was received, then we update the number of unseen messages
          if (state.relationships.mainRoomId !== message.roomId) {
            dispatch(incrementNumberOfUnseenMessages(message.roomId))
          }
        }
      }
    }),
})

export default signal
