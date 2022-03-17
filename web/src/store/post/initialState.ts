import { IPost } from 'types/interfaces/IPost'

export interface IPostState {
  post: IPost
  loading: boolean
}

export interface IPostsState {
  feedPosts: IPostState[]
  submitLoading: boolean
}

const initialState: IPostsState = {
  feedPosts: [],
  submitLoading: false,
}

export default initialState
