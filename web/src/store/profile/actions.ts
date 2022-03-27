import { Dispatch } from 'redux'
import axios from 'axios'

import { SET_PROFILE_PICTURE, SET_UPDATE_PROFILE_LOADING, SET_USER } from './actionTypes'

import { IParsedToken } from 'types/interfaces/IParsedToken'
import { IState } from 'store'
import { IHttpResponse } from 'types/interfaces/IHttpResponse'
import { IUser } from 'types/interfaces/IUser'
import { toast } from 'react-toastify'
import { IErrorResponse } from 'types/interfaces/IErrorResponse'

export const setUser = (user: IUser) => ({ type: SET_USER, payload: user })

export const setProfilePicture = (profilePicture: string | undefined) => ({
  type: SET_PROFILE_PICTURE,
  payload: profilePicture,
})

export const setUpdateProfileLoading = (updateProfileLoading: boolean) => ({
  type: SET_UPDATE_PROFILE_LOADING,
  payload: updateProfileLoading,
})

export const getProfilePicture = () => (dispatch: Dispatch, getState: () => IState) => {
  const parsedToken: IParsedToken | undefined = getState().auth.parsedToken

  if (!parsedToken?.nameid) return

  axios
    .request({
      method: 'GET',
      url: process.env.REACT_APP_API + '/user/GetUserProfilePicture/' + parsedToken?.nameid,
    })
    .then((response: IHttpResponse<string>) => {
      if (response.data.data) {
        dispatch(
          setProfilePicture(
            process.env.REACT_APP_STATIC_FILES_URL + '/uploads/profilePictures/' + response.data.data
          )
        )
      }
    })
}

export const updateProfile =
  (values: { firstName?: string; lastName?: string; age?: number }) =>
  (dispatch: Dispatch, getState: () => IState) => {
    const parsedToken: IParsedToken | undefined = getState().auth.parsedToken

    if (!parsedToken?.nameid) return

    if (
      !values.firstName ||
      values.firstName.trim() === '' ||
      !values.lastName ||
      values.lastName.trim() === ''
    )
      return

    dispatch(setUpdateProfileLoading(true))

    const toastId = toast.loading('Updating profile...')

    axios
      .request({
        method: 'PUT',
        url: process.env.REACT_APP_API + '/user/update',
        data: {
          id: parsedToken.nameid,
          firstName: values.firstName,
          lastName: values.lastName,
          age: values.age,
        },
      })
      .then((response: IHttpResponse<IUser>) => {
        if (response.data.data) {
          toast.success('Personal information has been updated')
          dispatch(setUser(response.data.data))
        }
      })
      .catch((e: IErrorResponse<any>) => {
        e.response.data.messages.forEach((message) => toast.error(message))
      })
      .finally(() => {
        toast.update(toastId, { isLoading: false, autoClose: 3000 })
        dispatch(setUpdateProfileLoading(false))
      })
  }
