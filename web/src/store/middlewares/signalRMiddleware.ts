import {
  signalMiddleware,
  HubConnectionBuilder,
  LogLevel,
  HttpTransportType,
  withCallbacks,
} from 'redux-signalr'
import { Dispatch } from 'redux'

import {
  addRoomMessage,
  getUnseenInvitationsCount,
  incrementNumberOfUnseenMessages,
} from 'store/relationships/actions'
import { removePostReaction, addPostReaction } from 'store/post/actions'

import { IMessage } from 'types/interfaces/IMessage'
import { IState } from 'store'
import { IRelationship } from 'types/interfaces/IRelationship'
import { IReaction } from 'types/interfaces/IReaction'

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
    })
    .add(
      'ReceiveReactionToPostInFeed',
      (message: { postId: number; reaction: IReaction }) => (dispatch: Dispatch, getState: () => IState) => {
        console.log('-----------------Reaction to post message received-----------------', message)
        // check if post exists in store:
        const post = getState().posts.feedPosts.find((p) => p.post.id === message.postId)
        const reaction = post?.post.reactions.find((r) => r.id === message.reaction.id)

        if (post) {
          if (reaction) dispatch(removePostReaction(message.postId, message.reaction.id))

          dispatch(addPostReaction(message.postId, message.reaction))
        }
      }
    )
    .add(
      'ReceiveDeleteReactionToPostInFeed',
      (message: { postId: number; reactionId: number }) => (dispatch: Dispatch, getState: () => IState) => {
        console.log('-----------------Deleted Reaction message received-----------------', message)
        // check if post exists in store:
        const post = getState().posts.feedPosts.find((p) => p.post.id === message.postId)

        if (post) {
          dispatch(removePostReaction(message.postId, message.reactionId))
        }
      }
    ),
})

export default signal
