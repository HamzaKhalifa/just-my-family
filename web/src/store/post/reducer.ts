import { IAction } from 'store'
import { IComment } from 'types/interfaces/IComment'
import {
  SET_FEED_POSTS,
  ADD_FEED_POST,
  SET_FEED_POST_POSTING_COMMENT_LOADING,
  ADD_FEED_POST_COMMENT,
} from './actionTypes'

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

const setFeedPostPostingCommentLoading = (
  state: IPostsState,
  action: IAction<{ postId: number; loading: boolean }>
) => {
  return {
    ...state,
    feedPosts: state.feedPosts.map((post) => ({
      ...post,
      postingCommentLoading:
        post.post?.id === action.payload.postId ? action.payload.loading : post.postingCommentLoading,
    })),
  }
}

const addFeedPostComment = (
  state: IPostsState,
  action: IAction<{ postId: number; comment: IComment }>
): IPostsState => {
  return {
    ...state,
    feedPosts: state.feedPosts.map((post) =>
      post.post.id === action.payload.postId
        ? {
            ...post,
            post: {
              ...post.post,
              comments: [...post.post?.comments, action.payload.comment],
              numberOfComments: (post.post.numberOfComments || 0) + 1,
            },
          }
        : post
    ),
  }
}

const actionHandler: any = {
  [SET_FEED_POSTS]: setFeedPosts,
  [ADD_FEED_POST]: addFeedPost,
  [SET_FEED_POST_POSTING_COMMENT_LOADING]: setFeedPostPostingCommentLoading,
  [ADD_FEED_POST_COMMENT]: addFeedPostComment,
}

const reducer = (state: IPostsState = initialState, action: IAction<any>) => {
  const handler = actionHandler[action.type]

  return handler ? handler(state, action) : state
}

export default reducer
