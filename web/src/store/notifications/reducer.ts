import { IAction } from 'store'

import initialState, { INotificationsState, IReactionNotification } from './initialState'
import { IReaction } from 'types/interfaces/IReaction'
import {
  ADD_POST_REACTION_NOTIFICATION,
  SET_TOTAL_UNSEEN_REACTIONS,
  SET_POST_REACTION_NOTIFICATIONS,
} from './actionTypes'

const addPostReactionNotification = (
  state: INotificationsState,
  action: IAction<IReaction>
): INotificationsState => {
  const newReactor: boolean = !Boolean(
    state.postReactionsNotifications.find((r) => r.reaction.id === action.payload.id)
  )
  let newPostReactionsNotifications: IReactionNotification[] = [...state.postReactionsNotifications]
  if (newReactor) newPostReactionsNotifications.push({ reaction: action.payload })
  else
    newPostReactionsNotifications = newPostReactionsNotifications.map((rn) =>
      rn.reaction.id === action.payload.id ? { reaction: action.payload } : rn
    )
  return {
    ...state,
    postReactionsNotifications: newPostReactionsNotifications,
    totalUnseenReactions: state.totalUnseenReactions + 1,
  }
}

const setTotalUnseenReactions = (
  state: INotificationsState,
  action: IAction<number>
): INotificationsState => {
  return {
    ...state,
    totalUnseenReactions: action.payload,
  }
}

const setPostReactionNotifications = (
  state: INotificationsState,
  action: IAction<IReaction[]>
): INotificationsState => {
  return {
    ...state,
    postReactionsNotifications: action.payload.map((reaction) => ({
      reaction,
    })),
  }
}

const actionHandler: any = {
  [ADD_POST_REACTION_NOTIFICATION]: addPostReactionNotification,
  [SET_TOTAL_UNSEEN_REACTIONS]: setTotalUnseenReactions,
  [SET_POST_REACTION_NOTIFICATIONS]: setPostReactionNotifications,
}

const reducer = (state: INotificationsState = initialState, action: IAction<any>) => {
  const handler = actionHandler[action.type]

  return handler ? handler(state, action) : state
}

export default reducer
