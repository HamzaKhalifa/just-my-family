import { IAction } from 'store'
import { SET_FEED_POSTS, ADD_FEED_POST } from './actionTypes'

import initialState, { IPostsState, IPostState } from './initialState'

const setFeedPosts = (state: IPostsState, action: IAction<IPostState[]>): IPostsState => {
  return {
    ...state,
    feedPosts: action.payload,
  }
}

const addFeedPost = (state: IPostsState, action: IAction<IPostState>) => {
  return {
    ...state,
    feedPosts: [action.payload, ...state.feedPosts],
  }
}

const actionHandler: any = {
  [SET_FEED_POSTS]: setFeedPosts,
  [ADD_FEED_POST]: addFeedPost,
}

const reducer = (state: IPostsState = initialState, action: IAction<any>) => {
  const handler = actionHandler[action.type]

  return handler ? handler(state, action) : state
}

export default reducer
