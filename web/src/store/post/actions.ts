import { Dispatch } from 'redux'
import axios from 'axios'
import { toast } from 'react-toastify'
import moment from 'moment'

import {
  SET_FEED_POSTS,
  ADD_FEED_POST,
  ADD_FEED_POST_COMMENT,
  SET_MORE_COMMENTS_LOADING,
  ADD_LOADED_POST_COMMENTS,
  SET_POST_REACT_LOADING,
  ADD_POST_REACTION,
  REMOVE_POST_REACTION,
} from './actionTypes'

import { IState } from 'store'
import { IHttpResponse } from 'types/interfaces/IHttpResponse'
import { IErrorResponse } from 'types/interfaces/IErrorResponse'
import { IPostState } from './initialState'
import { IPost } from 'types/interfaces/IPost'
import { IComment } from 'types/interfaces/IComment'
import { ReactionEnum } from 'types/enumerations/ReactionEnum'
import { IParsedToken } from 'types/interfaces/IParsedToken'
import { IReaction } from 'types/interfaces/IReaction'

export const setFeedPosts = (feedPosts: IPostState[]) => ({
  type: SET_FEED_POSTS,
  payload: feedPosts,
})

export const addFeedPost = (post: IPostState) => ({ type: ADD_FEED_POST, payload: post })

export const addFeedPostComment = (postId: number, comment: IComment) => ({
  type: ADD_FEED_POST_COMMENT,
  payload: { postId, comment },
})

export const setMoreCommentsLoading = (postId: number, loading: boolean) => ({
  type: SET_MORE_COMMENTS_LOADING,
  payload: {
    postId,
    loading,
  },
})

export const addLoadedPostComments = (postId: number, comments: IComment[]) => ({
  type: ADD_LOADED_POST_COMMENTS,
  payload: { postId, comments },
})

export const setPostReactLoading = (postId: number, loading: boolean) => ({
  type: SET_POST_REACT_LOADING,
  payload: { postId, loading },
})

export const addPostReaction = (postId: number, reaction: IReaction) => ({
  type: ADD_POST_REACTION,
  payload: { postId, reaction },
})

export const removePostReaction = (postId: number, reactionId: number) => ({
  type: REMOVE_POST_REACTION,
  payload: { postId, reactionId },
})

export const getFeedPosts =
  (page: number, amount: number) => (dispatch: Dispatch, getState: () => IState) => {
    const token: string | undefined = getState().auth.token

    axios
      .request({
        method: 'GET',
        url: process.env.REACT_APP_API + '/post/getFeedPosts/' + page + '/' + amount,
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((response: IHttpResponse<IPost[]>) => {
        if (response.data.data && Array.isArray(response.data.data)) {
          dispatch(
            setFeedPosts(
              response.data.data.map((post) => ({
                post,
                loading: false,
              }))
            )
          )
        }
      })
      .catch((e: IErrorResponse<any>) => {
        e.response.data.messages.forEach((m) => toast.error(m))
      })
      .finally(() => {})
  }

export const createPost =
  (content: string, pictures: string[]) => (dispatch: Dispatch, getState: () => IState) => {
    const token: string | undefined = getState().auth.token

    const toasterId = toast.loading('Posting...')

    axios
      .request({
        method: 'POST',
        url: process.env.REACT_APP_API + '/post',
        headers: {
          Authorization: 'Bearer ' + token,
        },
        data: {
          content,
          submittedAt: moment(Date.now()).format(process.env.REACT_APP_DATETIME_FORMAT).toString(),
          pictures,
        },
      })
      .then((response: IHttpResponse<IPost>) => {
        if (response.data.success) {
          dispatch(
            addFeedPost({
              loading: false,
              post: response.data.data,
            })
          )
        }
      })
      .catch((e: IErrorResponse<any>) => {
        e.response.data.messages.forEach((m) => toast.error(m))
      })
      .finally(() => {
        toast.update(toasterId, { isLoading: false, autoClose: 3000 })
      })
  }

export const createComment =
  (postId: number, content: string) => (dispatch: Dispatch, getState: () => IState) => {
    const token: string | undefined = getState().auth.token

    if (!postId || !token) return

    const toasterId = toast.loading('Posting comment...')

    axios
      .request({
        method: 'POST',
        url: process.env.REACT_APP_API + '/comment',
        headers: {
          Authorization: 'Bearer ' + token,
        },
        data: {
          content,
          postId,
          submittedAt: moment(Date.now()).format(process.env.REACT_APP_DATETIME_FORMAT).toString(),
        },
      })
      .then((response: IHttpResponse<IComment>) => {
        dispatch(addFeedPostComment(postId, response.data.data))
        toast.success('👌')
        toast.update(toasterId, { isLoading: false, autoClose: 3000 })
      })
      .catch((error: IErrorResponse<IComment>) => {
        error.response.data.messages.forEach((m) => toast.error(m))
        toast.update(toasterId, { isLoading: false, autoClose: 3000 })
      })
      .finally(() => {})
  }

export const loadMoreComments =
  (postId: number | undefined) => (dispatch: Dispatch, getState: () => IState) => {
    const token: string | undefined = getState().auth.token

    if (!postId && postId !== 0) return

    dispatch(setMoreCommentsLoading(postId, true))

    axios
      .request({
        method: 'POST',
        url: process.env.REACT_APP_API + '/comment/loadMoreComments',
        headers: {
          Authorization: 'Bearer ' + token,
        },
        data: {
          postId,
          amountAlreadyLoaded:
            getState().posts.feedPosts.find((p) => p?.post.id === postId)?.post.comments.length || 0,
          amountToLoad: 10,
        },
      })
      .then((response: IHttpResponse<IComment[]>) => {
        dispatch(addLoadedPostComments(postId, response.data.data))
      })
      .catch((e) => {})
      .finally(() => dispatch(setMoreCommentsLoading(postId, false)))
  }

export const reactToPost =
  (post: IPost, type: ReactionEnum) => (dispatch: Dispatch, getState: () => IState) => {
    const token: string | undefined = getState().auth.token
    const parsedToken: IParsedToken | undefined = getState().auth.parsedToken

    if (post?.userId === parsedToken?.nameid) return toast.error("You can't react to your own post.")

    if ((!post?.id && post?.id !== 0) || !parsedToken) return

    // check if the user's current reaction to the post is the same as the selected one
    const reaction: IReaction | undefined = getState()
      .posts.feedPosts.find((p) => p.post.id === post?.id)
      ?.post.reactions.find((r) => r.userId === parsedToken.nameid && r.type === type)

    const method = reaction ? 'DELETE' : 'POST'
    const url = reaction ? '/reaction/deleteReactionToPost' : '/reaction/reactToPost'

    dispatch(setPostReactLoading(post.id, true))

    axios
      .request({
        method,
        url: process.env.REACT_APP_API + url,
        headers: {
          Authorization: 'Bearer ' + token,
        },
        data: {
          postId: post?.id,
          userId: parsedToken.nameid,
          type,
          submittedAt: moment(Date.now()).format(process.env.REACT_APP_DATETIME_FORMAT).toString(),
        },
      })
      .then((response: IHttpResponse<IReaction>) => {
        if (post.id) {
          if (reaction) dispatch(removePostReaction(post.id, reaction.id))
          else dispatch(addPostReaction(post.id, response.data.data))
        }
      })
      .catch((e) => {})
      .finally(() => {
        if (post?.id) dispatch(setPostReactLoading(post?.id, false))
      })
  }
