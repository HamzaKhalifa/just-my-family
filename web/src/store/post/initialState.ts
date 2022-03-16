import { IPost } from 'types/interfaces/IPost'

export interface IPostState {
  post: IPost
  loading: boolean
}

export interface IPostsState {
  posts: IPostState[]
  submitLoading: boolean
}

const initialState: IPostsState = {
  posts: [],
  submitLoading: false,
}

export default initialState
