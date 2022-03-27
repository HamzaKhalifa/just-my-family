import { IPost } from 'types/interfaces/IPost'

export interface IPostState {
  post: IPost
  loading: boolean
  moreCommentsLoading?: boolean
  reactLoading?: boolean
}

export interface IPostsState {
  feedPosts: IPostState[]
  submitLoading: boolean
  currentPost?: IPostState
}

const initialState: IPostsState = {
  feedPosts: [],
  submitLoading: false,
  currentPost: undefined,
}

export default initialState
