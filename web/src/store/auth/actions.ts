import { SET_TOKEN, SET_PARSED_TOKEN } from './actionTypes'

import { IParsedToken } from 'types/interfaces/IParsedToken'

export const setToken = (token?: string) => ({ type: SET_TOKEN, payload: token })

export const setParsedToken = (parsedToken?: IParsedToken) => ({
  type: SET_PARSED_TOKEN,
  payload: parsedToken,
})

export const logout = () => (dispatch: any) => {
  dispatch(setToken(undefined))
  dispatch(setParsedToken(undefined))
}
