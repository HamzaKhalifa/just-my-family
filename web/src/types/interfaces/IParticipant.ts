import { IRoom } from './IRoom'
import { IUser } from './IUser'

interface IParticipant {
  id: number
  user: IUser
  userId: string
  room: IRoom
  roomId: number
}

export default IParticipant
