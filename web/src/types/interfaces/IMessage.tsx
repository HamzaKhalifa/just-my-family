import { IUser } from './IUser'
import { IRoom } from './IRoom'

export interface IMessage {
  id: number
  text: string
  sender: IUser
  senderId: string
  room: IRoom
  roomId: number
  sentAt: string
  seenByUsers?: IUser[]
}
