import { ReactionEnum } from 'types/enumerations/ReactionEnum'
import { IPost } from './IPost'
import { IUser } from './IUser'

export interface IReaction {
  id: number
  user: IUser
  userId: string
  post: IPost
  postId: number
  comment: number
  commentId: number
  type: ReactionEnum
  submittedAt: string
  seen: boolean
}
