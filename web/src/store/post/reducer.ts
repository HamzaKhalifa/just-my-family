import { IAction } from 'store'
import { SET_POSTS } from './actionTypes'

import initialState, { IPostsState, IPostState } from './initialState'

const setPosts = (state: IPostsState, action: IAction<IPostState[]>): IPostsState => {
  return {
    ...state,
    posts: action.payload,
  }
}

const actionHandler: any = {
  [SET_POSTS]: setPosts,
}

const reducer = (state: IPostsState = initialState, action: IAction<any>) => {
  const handler = actionHandler[action.type]

  return handler ? handler(state, action) : state
}

export default reducer
