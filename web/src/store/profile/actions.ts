import { Dispatch } from 'redux'
import axios from 'axios'

import { SET_PROFILE_PICTURE } from './actionTypes'

import { IParsedToken } from 'types/interfaces/IParsedToken'
import { IState } from 'store'
import { IHttpResponse } from 'types/interfaces/IHttpResponse'

export const setProfilePicture = (profilePicture: string | undefined) => ({
  type: SET_PROFILE_PICTURE,
  payload: profilePicture,
})

export const getProfilePicture = () => (dispatch: Dispatch, getState: () => IState) => {
  const parsedToken: IParsedToken | undefined = getState().auth.parsedToken

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
        setProfilePicture(
          process.env.REACT_APP_STATIC_FILES_URL + '/uploads/profilePictures/' + response.data.data
        )
      }
    })
}
