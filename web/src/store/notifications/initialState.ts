import { IReaction } from 'types/interfaces/IReaction'

export interface IReactionNotification {
  reaction: IReaction
}
export interface INotificationsState {
  postReactionsNotifications: IReactionNotification[]
  totalUnseenReactions: number
}

const initialState: INotificationsState = {
  postReactionsNotifications: [],
  totalUnseenReactions: 0,
}

export default initialState
