import { IParsedToken } from 'types/interfaces/IParsedToken'
import { IUser } from 'types/interfaces/IUser'

export interface IAuthState {
  token?: string
  parsedToken?: IParsedToken
}

const initialState: IAuthState = {
  token: undefined,
  parsedToken: undefined,
}

export default initialState
