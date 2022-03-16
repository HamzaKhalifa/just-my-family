import { IAction } from 'store'
import { SET_TOKEN, SET_PARSED_TOKEN } from './actionTypes'

import initialState, { IAuthState } from './initialState'

const setToken = (state: IAuthState, action: IAction<any>) => {
  return {
    ...state,
    token: action.payload,
  }
}

const setParsedToken = (state: IAuthState, action: IAction<any>) => {
  return {
    ...state,
    parsedToken: action.payload,
  }
}

const actionHandler: any = {
  [SET_TOKEN]: setToken,
  [SET_PARSED_TOKEN]: setParsedToken,
}

const reducer = (state: IAuthState = initialState, action: IAction<any>) => {
  const handler = actionHandler[action.type]

  return handler ? handler(state, action) : state
}

export default reducer
