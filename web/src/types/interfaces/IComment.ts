import { IPost } from './IPost'
import { IUser } from './IUser'

export interface IComment {
  id: number
  user: IUser
  userId: string
  post: IPost
  postId: string
  content: string
  submittedAt: string
  reaction: number
}
