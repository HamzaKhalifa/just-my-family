import { RelationshipEnum } from 'types/enumerations/RelationshipEnum'
import { IRoom } from './IRoom'
import { IUser } from './IUser'

export interface IRelationship extends IRoom {
  type: RelationshipEnum
  user1: IUser
  user1Id: string
  user2: IUser
  user2Id: string
  senderUser: boolean
  senderUserId: string
  approved: boolean
  seen?: boolean
}

export interface IUpdateRelationship extends Partial<IRelationship> {}
