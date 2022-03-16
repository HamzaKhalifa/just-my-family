import { IMessage } from './IMessage'

export interface IRoom {
  id?: number
  messages?: IMessage[]
  numberOfUnseenMessages?: number
  totalMessages?: number
}
