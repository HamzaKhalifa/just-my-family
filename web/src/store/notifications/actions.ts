import axios from 'axios'
import { toast } from 'react-toastify'

import {
  ADD_POST_REACTION_NOTIFICATION,
  SET_TOTAL_UNSEEN_REACTIONS,
  SET_POST_REACTION_NOTIFICATIONS,
} from './actionTypes'

import { IReaction } from 'types/interfaces/IReaction'
import { Dispatch } from 'redux-signalr'
import { IState } from 'store'
import { IHttpResponse } from 'types/interfaces/IHttpResponse'
import { IErrorResponse } from 'types/interfaces/IErrorResponse'

export const addPostReactionNotification = (reaction: IReaction) => ({
  type: ADD_POST_REACTION_NOTIFICATION,
  payload: reaction,
})

export const setPostReactionNotifications = (reactions: IReaction[]) => ({
  type: SET_POST_REACTION_NOTIFICATIONS,
  payload: reactions,
})

export const setTotalUnseenReactions = (total: number) => ({
  type: SET_TOTAL_UNSEEN_REACTIONS,
  payload: total,
})

export const getTotalUnseenReactions = () => (dispatch: Dispatch, getState: () => IState) => {
  const token: string | undefined = getState().auth.token

  axios
    .request({
      method: 'GET',
      url: process.env.REACT_APP_API + '/reaction/getTotalUnseenReactions',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    .then((response: IHttpResponse<number>) => {
      dispatch(setTotalUnseenReactions(response.data.data))
    })
    .catch((e) => {})
    .finally(() => {})
}

export const getPostsReactions = (loadMore?: boolean) => (dispatch: any, getState: () => IState) => {
  const token: string | undefined = getState().auth.token

  axios
    .request({
      method: 'GET',
      url:
        process.env.REACT_APP_API +
        '/reaction/getPostsReactions/' +
        (loadMore ? getState().notifications.postReactionsNotifications.length : 0) +
        '/' +
        50,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    .then((response: IHttpResponse<IReaction[]>) => {
      dispatch(setPostReactionNotifications(response.data.data))
      const reactionsIds: number[] = response.data.data.map((r) => r.id)
      if (reactionsIds.length > 0) dispatch(setReactionsToSeen(reactionsIds))
    })
    .catch((e) => {})
    .finally(() => {})
}

export const setReactionsToSeen =
  (reactionsIds: number[]) => (dispatch: Dispatch, getState: () => IState) => {
    const token: string | undefined = getState().auth.token

    axios
      .request({
        method: 'POST',
        url: process.env.REACT_APP_API + '/reaction/setReactionsToSeen',
        headers: {
          Authorization: 'Bearer ' + token,
        },
        data: {
          reactionsIds,
        },
      })
      .then((response: IHttpResponse<number>) => {
        dispatch(setTotalUnseenReactions(response.data.data))
      })
      .catch((e: IErrorResponse<any>) => {
        e.response.data.messages.forEach((m) => toast.error(m, { autoClose: 3000 }))
      })
      .finally(() => {})
  }
