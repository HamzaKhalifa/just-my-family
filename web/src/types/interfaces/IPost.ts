import { IComment } from './IComment'
import { IUser } from './IUser'

export interface IPost {
  id?: number
  content: string
  pictures?: string[]
  submittedAt: string
  userId?: string
  user: IUser
  comments: IComment[]
}
