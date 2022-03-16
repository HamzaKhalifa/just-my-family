import IParticipant from './IParticipant'
import { IRoom } from './IRoom'

export interface IMultiParticipantsRoom extends IRoom {
  name?: string
  participants?: IParticipant[]
}
