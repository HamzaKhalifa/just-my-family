import { Dispatch } from 'redux'
import axios from 'axios'
import { toast } from 'react-toastify'
import moment from 'moment'

import {
  SET_FEED_POSTS,
  ADD_FEED_POST,
  SET_FEED_POST_POSTING_COMMENT_LOADING,
  ADD_FEED_POST_COMMENT,
} from './actionTypes'

import { IState } from 'store'
import { IHttpResponse } from 'types/interfaces/IHttpResponse'
import { IErrorResponse } from 'types/interfaces/IErrorResponse'
import { IPostState } from './initialState'
import { IPost } from 'types/interfaces/IPost'
import { IComment } from 'types/interfaces/IComment'

export const setFeedPosts = (feedPosts: IPostState[]) => ({
  type: SET_FEED_POSTS,
  payload: feedPosts,
})

export const addFeedPost = (post: IPostState) => ({ type: ADD_FEED_POST, payload: post })

export const setFeedPostPostingCommentLoading = (postId: number, loading: boolean) => ({
  type: SET_FEED_POST_POSTING_COMMENT_LOADING,
  payload: { postId, loading },
})

export const addFeedPostComment = (postId: number, comment: IComment) => ({
  type: ADD_FEED_POST_COMMENT,
  payload: comment,
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
        console.log('response.data.data', response.data.data)
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
        console.log('what')
        toast.update(toasterId, { isLoading: false, autoClose: 3000 })
      })
  }

export const createComment =
  (postId: number, content: string) => (dispatch: Dispatch, getState: () => IState) => {
    const token: string | undefined = getState().auth.token

    if (!postId || !token) return

    dispatch(setFeedPostPostingCommentLoading(postId, true))

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
        toast.info('Comemnt posted')
        toast.update(toasterId, { isLoading: false, autoClose: 3000 })
      })
      .catch((error: IErrorResponse<IComment>) => {
        error.response.data.messages.forEach((m) => toast.error(m))
        toast.update(toasterId, { isLoading: false, autoClose: 3000 })
      })
      .finally(() => {
        dispatch(setFeedPostPostingCommentLoading(postId, false))
      })
  }
