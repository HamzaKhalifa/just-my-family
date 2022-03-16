import { Dispatch } from 'redux'
import axios from 'axios'
import { toast } from 'react-toastify'
import moment from 'moment'

import { SET_POSTS } from './actionTypes'

import { IState } from 'store'
import { IHttpResponse } from 'types/interfaces/IHttpResponse'
import { IErrorResponse } from 'types/interfaces/IErrorResponse'
import { IPostState } from './initialState'

export const setPosts = (posts: IPostState[]) => ({
  type: SET_POSTS,
  payload: posts,
})

export const createPost =
  (content: string, pictures: string[]) => (dispatch: Dispatch, getState: () => IState) => {
    const token: string | undefined = getState().auth.token

    const toasterId = toast.info('Posting...', { isLoading: true })

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
      .then((response: IHttpResponse<string>) => {
        if (response.data.data) {
        }
      })
      .catch((e: IErrorResponse<any>) => {
        e.response.data.messages.forEach((m) => toast.error(m))
      })
      .finally(() => {
        toast.update(toasterId, { isLoading: false, autoClose: 3000 })
      })
  }
