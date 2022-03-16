import { IAction } from 'store'
import { SET_PROFILE_PICTURE } from './actionTypes'

import initialState, { IProfileState } from './initialState'

const setProfilePicture = (state: IProfileState, action: IAction<string>): IProfileState => {
  return {
    ...state,
    profilePicture: action.payload,
  }
}

const actionHandler: any = {
  [SET_PROFILE_PICTURE]: setProfilePicture,
}

const reducer = (state: IProfileState = initialState, action: IAction<any>) => {
  const handler = actionHandler[action.type]

  return handler ? handler(state, action) : state
}

export default reducer
