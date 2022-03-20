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
  getTotalUnseenInvitations,
  incrementNumberOfUnseenMessages,
} from 'store/relationships/actions'
import { removePostReaction, addPostReaction } from 'store/post/actions'
import { addPostReactionNotification } from 'store/notifications/actions'

import { IMessage } from 'types/interfaces/IMessage'
import { IState } from 'store'
import { IRelationship } from 'types/interfaces/IRelationship'
import { IReaction } from 'types/interfaces/IReaction'

export const connection = new HubConnectionBuilder()
  .configureLogging(LogLevel.Debug)
  .withUrl(process.env.REACT_APP_HUBS_URL + '', {
    skipNegotiation: true,
    transport: HttpTransportType.WebSockets,
    accessTokenFactory: () => {
      const token = JSON.parse(JSON.parse(localStorage.getItem('persist:root') || '')?.auth)?.token || ''
      return token
    },
  })
  .build()

export const signal = signalMiddleware({
  connection,
  shouldConnectionStartImmediately: false,
  callbacks: withCallbacks()
    .add('ReceiveRelationshipNotification', (relationship: IRelationship) => (dispatch) => {
      console.log('-----------------Invitation received-----------------', relationship)
      dispatch(getTotalUnseenInvitations())
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
      (message: { posterId: string; postId: number; reaction: IReaction }) =>
        (dispatch: Dispatch, getState: () => IState) => {
          console.log('-----------------Reaction to post message received-----------------', message)
          const state: IState = getState()

          // If the poster is the current user, and the reacting user isn't the same user as the current user (a user reacting to his own post) then we add a reaction notification
          if (
            message.posterId === state.auth.parsedToken?.nameid &&
            message.reaction.userId !== state.auth.parsedToken?.nameid
          ) {
            dispatch(addPostReactionNotification(message.reaction))
          }

          // check if post exists in store:
          const post = state.posts.feedPosts.find((p) => p.post.id === message.postId)
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
