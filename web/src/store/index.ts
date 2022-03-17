import { createStore, combineReducers, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
/* @ts-ignore */
import expireReducer from 'redux-persist-expire'

import authReducer from './auth/reducer'
import relationshipsReducer from './relationships/reducer'
import profileReducer from './profile/reducer'
import postsReducer from './post/reducer'

import signal from 'store/middlewares/signalRMiddleware'

import { IAuthState } from './auth/initialState'
import { IRelationshipsState } from './relationships/initialState'
import { IProfileState } from './profile/initialState'
import { IPostsState } from './post/initialState'

export interface IState {
  auth: IAuthState
  profile: IProfileState
  relationships: IRelationshipsState
  posts: IPostsState
}

export interface IAction<Payload> {
  type: string
  payload: Payload
}

const reducer = combineReducers<IState>({
  auth: authReducer,
  profile: profileReducer,
  relationships: relationshipsReducer,
  posts: postsReducer,
})

const persistedReducer = persistReducer(
  {
    key: 'root',
    storage,
    blacklist: ['relationships', 'profile', 'posts'],
    transforms: [
      // Token expires after 6 and a half days (By convention with the backend which is set to 7 days)
      expireReducer('auth', {
        persistedAtKey: 'auth',
        expireSeconds: 60 * 60 * 24 * 6.5,
        expiredState: { token: undefined },
        autoExpire: true,
      }),
    ],
  },
  reducer
)

const store = createStore(persistedReducer, applyMiddleware(signal))

export const persistor = persistStore(store)

export default store
