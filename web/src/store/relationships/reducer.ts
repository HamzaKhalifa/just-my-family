import { IAction } from 'store'

import {
  SET_RELATIONSHIPS,
  SET_APPROVED_RELATIONSHIPS,
  SET_UNSEEN_INVITATIONS_COUNT,
  UPDATE_RELATIONSHIP,
  DELETE_RELATIONSHIP,
  SET_LOADING,
  SET_MAIN_ROOM_ID,
  SET_ROOM_SEND_MESSAGE_LOADING,
  ADD_ROOM_MESSAGE,
  INCREMENT_NUMBER_OF_UNSEEN_MESSAGES,
  NULLIFY_NUMBER_OF_UNSEEN_MESSAGES,
  ADD_LOADED_ROOM_MESSAGES,
  SET_MORE_MESSAGES_LOADING,
} from './actionTypes'

import initialState, { IRelationshipsState } from './initialState'

import { IMessage } from 'types/interfaces/IMessage'
import { IRelationship, IUpdateRelationship } from 'types/interfaces/IRelationship'

const setUnseenInvitationsCount = (state: IRelationshipsState, action: IAction<number>) => {
  return {
    ...state,
    unseenInvitationsCount: action.payload,
  }
}

const setRelationships = (state: IRelationshipsState, action: IAction<IRelationship[]>) => {
  return {
    ...state,
    relationships: action.payload,
  }
}

const setApprovedRelationships = (
  state: IRelationshipsState,
  action: IAction<IRelationship[]>
): IRelationshipsState => {
  return {
    ...state,
    approvedRelationships: action.payload.map((relationship: IRelationship) => {
      return {
        room: relationship,
        loading: false,
        sendMessageLoading: false,
      }
    }),
  }
}

const updateRelationship = (state: IRelationshipsState, action: IAction<IUpdateRelationship>) => {
  return {
    ...state,
    relationships: [
      ...state.relationships.map((r) => (r.id === action.payload.id ? { ...r, ...action.payload } : r)),
    ],
  }
}

const deleteRelationships = (state: IRelationshipsState, action: IAction<number>) => {
  return {
    ...state,
    relationships: state.relationships.filter((r) => r.id !== action.payload),
  }
}

const setLoading = (state: IRelationshipsState, action: IAction<any>) => {
  return {
    ...state,
    loadings: {
      ...state.loadings,
      [action.payload.whichLoading]: action.payload.loading,
    },
  }
}

const setMainRoomId = (state: IRelationshipsState, action: IAction<number>): IRelationshipsState => {
  return {
    ...state,
    mainRoomId: action.payload,
  }
}

const setRoomSendMessageLoading = (
  state: IRelationshipsState,
  action: IAction<{ roomId: number; loading: boolean }>
): IRelationshipsState => {
  return {
    ...state,
    approvedRelationships: state.approvedRelationships.map((r) => {
      if (r.room?.id === action.payload.roomId) {
        return { ...r, loading: action.payload.loading }
      } else return r
    }),
  }
}

const addRoomMessage = (
  state: IRelationshipsState,
  action: IAction<{ roomId: number; message: IMessage }>
): IRelationshipsState => {
  return {
    ...state,

    approvedRelationships: state.approvedRelationships.map((r) => {
      if (r.room?.id === action.payload.roomId) {
        return {
          ...r,
          room: {
            ...r.room,
            totalMessages: (r.room?.totalMessages || 0) + 1,
            messages: [...(r.room?.messages ?? []), action.payload.message],
          },
        }
      } else return r
    }),
  }
}

const incrementNumberOfUnseenMessages = (
  state: IRelationshipsState,
  action: IAction<number>
): IRelationshipsState => {
  return {
    ...state,
    approvedRelationships: state.approvedRelationships.map((r) => {
      if (r.room?.id === action.payload) {
        return {
          ...r,
          room: { ...r.room, numberOfUnseenMessages: (r.room?.numberOfUnseenMessages || 0) + 1 },
        }
      } else return r
    }),
  }
}

const nullifyNumberOfUnseenMessages = (
  state: IRelationshipsState,
  action: IAction<number>
): IRelationshipsState => {
  return {
    ...state,
    approvedRelationships: state.approvedRelationships.map((r) => {
      if (r.room?.id === action.payload) {
        return {
          ...r,
          room: { ...r.room, numberOfUnseenMessages: 0 },
        }
      } else return r
    }),
  }
}

const addLoadedRoomMessages = (
  state: IRelationshipsState,
  action: IAction<{ roomId: number; messages: IMessage[] }>
) => {
  return {
    ...state,
    approvedRelationships: state.approvedRelationships.map((r) => {
      if (r.room?.id === action.payload.roomId) {
        return {
          ...r,
          room: { ...r.room, messages: [...action.payload.messages, ...(r?.room?.messages || [])] },
        }
      } else return r
    }),
  }
}

const setMoreMessagesLoading = (
  state: IRelationshipsState,
  action: IAction<{ roomId: number; loading: boolean }>
) => {
  return {
    ...state,
    approvedRelationships: state.approvedRelationships.map((r) => {
      if (r.room?.id === action.payload.roomId) {
        return {
          ...r,
          moreMessagesLoading: action.payload.loading,
        }
      } else return r
    }),
  }
}

const actionHandler: any = {
  [SET_UNSEEN_INVITATIONS_COUNT]: setUnseenInvitationsCount,
  [SET_RELATIONSHIPS]: setRelationships,
  [SET_APPROVED_RELATIONSHIPS]: setApprovedRelationships,
  [UPDATE_RELATIONSHIP]: updateRelationship,
  [DELETE_RELATIONSHIP]: deleteRelationships,
  [SET_LOADING]: setLoading,
  [SET_MAIN_ROOM_ID]: setMainRoomId,
  [SET_ROOM_SEND_MESSAGE_LOADING]: setRoomSendMessageLoading,
  [ADD_ROOM_MESSAGE]: addRoomMessage,
  [INCREMENT_NUMBER_OF_UNSEEN_MESSAGES]: incrementNumberOfUnseenMessages,
  [NULLIFY_NUMBER_OF_UNSEEN_MESSAGES]: nullifyNumberOfUnseenMessages,
  [ADD_LOADED_ROOM_MESSAGES]: addLoadedRoomMessages,
  [SET_MORE_MESSAGES_LOADING]: setMoreMessagesLoading,
}

const reducer = (state: IRelationshipsState = initialState, action: IAction<any>) => {
  const handler = actionHandler[action.type]

  return handler ? handler(state, action) : state
}

export default reducer
