import { IUser } from 'types/interfaces/IUser'

export interface IProfileState {
  profilePicture?: string
  user?: IUserState
  updateProfileLoading: boolean
}

export interface IUserState {
  user?: IUser
}

const initialState: IProfileState = {
  profilePicture: undefined,
  user: undefined,
  updateProfileLoading: false,
}

export default initialState
