export interface IRoomState<T> {
  room?: T
  loading?: boolean
  sendMessageLoading?: boolean
  moreMessagesLoading?: boolean
}
