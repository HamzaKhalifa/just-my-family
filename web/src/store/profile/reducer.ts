import { SET_PROFILE_PICTURE, SET_USER, SET_UPDATE_PROFILE_LOADING } from './actionTypes'

import { IAction } from 'store'
import { IUser } from 'types/interfaces/IUser'

import initialState, { IProfileState } from './initialState'

const setProfilePicture = (state: IProfileState, action: IAction<string>): IProfileState => {
  return {
    ...state,
    profilePicture: action.payload,
  }
}

const setUser = (state: IProfileState, action: IAction<IUser>): IProfileState => {
  return {
    ...state,
    user: {
      user: action.payload,
    },
  }
}

const setUpdateProfileLoading = (state: IProfileState, action: IAction<boolean>): IProfileState => {
  return {
    ...state,
    updateProfileLoading: action.payload,
  }
}

const actionHandler: any = {
  [SET_PROFILE_PICTURE]: setProfilePicture,
  [SET_USER]: setUser,
  [SET_UPDATE_PROFILE_LOADING]: setUpdateProfileLoading,
}

const reducer = (state: IProfileState = initialState, action: IAction<any>) => {
  const handler = actionHandler[action.type]

  return handler ? handler(state, action) : state
}

export default reducer
