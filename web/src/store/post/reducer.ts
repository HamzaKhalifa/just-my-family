import { IAction } from 'store'
import { IComment } from 'types/interfaces/IComment'
import { IReaction } from 'types/interfaces/IReaction'
import {
  SET_FEED_POSTS,
  ADD_FEED_POST,
  ADD_FEED_POST_COMMENT,
  SET_MORE_COMMENTS_LOADING,
  ADD_LOADED_POST_COMMENTS,
  SET_POST_REACT_LOADING,
  ADD_POST_REACTION,
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

const setMoreCommentsLoading = (
  state: IPostsState,
  action: IAction<{ postId: number; loading: boolean }>
) => {
  return {
    ...state,
    feedPosts: state.feedPosts.map((post) => ({
      ...post,
      moreCommentsLoading:
        post.post?.id === action.payload.postId ? action.payload.loading : post.moreCommentsLoading,
    })),
  }
}

const addLoadedPostComments = (
  state: IPostsState,
  action: IAction<{ postId: number; comments: IComment[] }>
): IPostsState => {
  return {
    ...state,
    feedPosts: state.feedPosts.map((post) => {
      if (post.post.id === action.payload.postId) {
        return {
          ...post,
          post: {
            ...post.post,
            comments: [...post.post.comments, ...action.payload.comments],
          },
        }
      }
      return post
    }),
  }
}

const setPostReactLoading = (state: IPostsState, action: IAction<{ postId: number; loading: boolean }>) => {
  return {
    ...state,
    feedPosts: state.feedPosts.map((post) => ({
      ...post,
      reactLoading: post.post?.id === action.payload.postId ? action.payload.loading : post.reactLoading,
    })),
  }
}

const addPostReaction = (state: IPostsState, action: IAction<{ postId: number; reaction: IReaction }>) => {
  return {
    ...state,
    feedPosts: state.feedPosts.map((post) => {
      if (post.post.id === action.payload.postId) {
        const alreadyExistingReaction = post.post.reactions.find((r) => r.id === action.payload.reaction.id)
        let newReactions = []
        if (alreadyExistingReaction)
          newReactions = post.post.reactions.map((r) =>
            r.id === alreadyExistingReaction.id ? action.payload.reaction : r
          )
        else newReactions = [...post.post.reactions, action.payload.reaction]

        return {
          ...post,
          post: {
            ...post.post,
            reactions: newReactions,
          },
        }
      }
      return post
    }),
  }
}

const actionHandler: any = {
  [SET_FEED_POSTS]: setFeedPosts,
  [ADD_FEED_POST]: addFeedPost,
  [ADD_FEED_POST_COMMENT]: addFeedPostComment,
  [SET_MORE_COMMENTS_LOADING]: setMoreCommentsLoading,
  [ADD_LOADED_POST_COMMENTS]: addLoadedPostComments,
  [SET_POST_REACT_LOADING]: setPostReactLoading,
  [ADD_POST_REACTION]: addPostReaction,
}

const reducer = (state: IPostsState = initialState, action: IAction<any>) => {
  const handler = actionHandler[action.type]

  return handler ? handler(state, action) : state
}

export default reducer
