import axios from 'axios'
import { toast } from 'react-toastify'
import moment from 'moment'
import { Dispatch } from 'redux'

import { IState } from 'store'
import { IErrorResponse } from 'types/interfaces/IErrorResponse'
import { IHttpResponse } from 'types/interfaces/IHttpResponse'
import { IRelationship, IUpdateRelationship } from 'types/interfaces/IRelationship'
import { IUser } from 'types/interfaces/IUser'
import { IRoomState } from 'types/interfaces/IRoomState'
import { IMessage } from 'types/interfaces/IMessage'

import {
  SET_UNSEEN_INVITATIONS_COUNT,
  SET_RELATIONSHIPS,
  SET_APPROVED_RELATIONSHIPS,
  DELETE_RELATIONSHIP,
  UPDATE_RELATIONSHIP,
  SET_LOADING,
  SET_MAIN_ROOM_ID,
  SET_ROOM_SEND_MESSAGE_LOADING,
  ADD_ROOM_MESSAGE,
  INCREMENT_NUMBER_OF_UNSEEN_MESSAGES,
  NULLIFY_NUMBER_OF_UNSEEN_MESSAGES,
  ADD_LOADED_ROOM_MESSAGES,
  SET_MORE_MESSAGES_LOADING,
} from './actionTypes'

export const setUnseenInvitationsCount = (count: number) => ({
  type: SET_UNSEEN_INVITATIONS_COUNT,
  payload: count,
})

export const setRelationships = (relationships: IRelationship[]) => ({
  type: SET_RELATIONSHIPS,
  payload: relationships,
})

export const seApprovedRelationships = (approvedRelationships: IRelationship[]) => ({
  type: SET_APPROVED_RELATIONSHIPS,
  payload: approvedRelationships,
})

export const updateRelationship = (updates: IUpdateRelationship) => ({
  type: UPDATE_RELATIONSHIP,
  payload: updates,
})

export const deleteRelationship = (id: number) => ({
  type: DELETE_RELATIONSHIP,
  payload: id,
})

export const setLoading = (loading: boolean, whichLoading: string) => ({
  type: SET_LOADING,
  payload: { loading, whichLoading },
})

export const getUnseenInvitationsCount = () => (dispatch: any, getState: () => IState) => {
  const store: IState = getState()
  const token = store.auth.token

  if (token && token !== '') {
    axios
      .request({
        method: 'GET',
        url: process.env.REACT_APP_API + '/relationship/getUnseenInvitationsCount',
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((response) => dispatch(setUnseenInvitationsCount(response.data.data)))
  }
}

export const createRelationship =
  (selectedRelationship?: IUpdateRelationship, selectedUser?: IUser, callback?: any) =>
  (dispatch: any, getState: () => IState) => {
    const store: IState = getState()
    const token = store.auth.token
    const parsedToken = store.auth.parsedToken

    dispatch(setLoading(true, 'createRelationship'))

    axios
      .request({
        method: 'POST',
        url: process.env.REACT_APP_API + '/relationship/createRelationship',
        data: {
          relationshipType: selectedRelationship?.type,
          user1Id: parsedToken?.nameid,
          user2Id: selectedUser?.id,
          relationshipInvitationSentByUserId: parsedToken?.nameid,
        },
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then(() => {
        toast.info('Relationship invitation has been sent')
        if (callback) callback()
      })
      .catch((error) => error.response?.data.messages?.forEach((message: string) => toast.error(message)))
      .finally(() => dispatch(setLoading(false, 'createRelationship')))
  }

export const getRelationships = () => (dispatch: any, getState: () => IState) => {
  const store: IState = getState()
  const token = store.auth.token

  dispatch(setLoading(true, 'relationships'))

  axios
    .request({
      method: 'GET',
      url: process.env.REACT_APP_API + '/relationship/getRelationships',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    .then((response: IHttpResponse<IRelationship[]>) => {
      if (response.data.success && Array.isArray(response.data.data)) {
        dispatch(setRelationships(response.data.data))
      }

      const newlySeenRelationships = response.data.data.filter((r) => !r.seen)

      dispatch(setRelationshipInvitationSeen(newlySeenRelationships.map((r) => r.id as number)))
    })
    .catch((error) => error.response?.data.messages?.forEach((message: string) => toast.error(message)))
    .finally(() => dispatch(setLoading(false, 'relationships')))
}

export const getApprovedRelationships = () => (dispatch: any, getState: () => IState) => {
  const store: IState = getState()
  const token = store.auth.token

  dispatch(setLoading(true, 'approvedRelationships'))

  axios
    .request({
      method: 'GET',
      url: process.env.REACT_APP_API + '/relationship/getApprovedRelationships',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    .then((response: IHttpResponse<IRelationship[]>) => {
      if (response.data.success && Array.isArray(response.data.data)) {
        dispatch(seApprovedRelationships(response.data.data))
      }
    })
    .catch((error) => error.response?.data.messages?.forEach((message: string) => toast.error(message)))
    .finally(() => dispatch(setLoading(false, 'approvedRelationships')))
}

export const approveInvitation = (id: number | undefined) => (dispatch: any, getState: () => IState) => {
  const store: IState = getState()
  const token = store.auth.token

  dispatch(setLoading(true, 'approve'))

  axios
    .request({
      method: 'PUT',
      url: process.env.REACT_APP_API + '/relationship/approve/' + id,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    .then((response: IHttpResponse<any>) => {
      if (response.data.success) {
        toast.info('Relationship Approved ❤')
        dispatch(updateRelationship({ id, approved: true }))

        let newUnseenInvitationsCount: number = getState().relationships.unseenInvitationsCount - 1
        dispatch(setUnseenInvitationsCount(Math.max(0, newUnseenInvitationsCount)))
      }
    })
    .catch((error: IErrorResponse<any>) => {
      error.response.data.messages.forEach((message: string) => toast.error(message))
    })
    .finally(() => dispatch(setLoading(false, 'approve')))
}

export const deleteInvitation =
  (id: number | undefined, updateUnseenInvitationsCount: boolean = false) =>
  (dispatch: any, getState: () => IState) => {
    if (!id) return

    const store: IState = getState()
    const token = store.auth.token

    dispatch(setLoading(true, 'delete'))

    axios
      .request({
        method: 'DELETE',
        url: process.env.REACT_APP_API + '/relationship/delete/' + id,
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((response: IHttpResponse<any>) => {
        if (response.data.success) {
          toast.info('Invitation deleted')
          dispatch(deleteRelationship(id))

          if (updateUnseenInvitationsCount) {
            let newUnseenInvitationsCount: number = getState().relationships.unseenInvitationsCount - 1
            dispatch(setUnseenInvitationsCount(Math.max(0, newUnseenInvitationsCount)))
          }
        }
      })
      .catch((error: IErrorResponse<any>) => {
        error.response.data.messages.forEach((message: string) => toast.error(message))
      })
      .finally(() => dispatch(setLoading(false, 'delete')))
  }

// ----Chat actions----

export const setMainRoomId = (roomId: number | undefined) => ({ type: SET_MAIN_ROOM_ID, payload: roomId })

export const setRoomSendMessageLoading = (roomId: number | undefined, loading: boolean) => ({
  type: SET_ROOM_SEND_MESSAGE_LOADING,
  payload: { roomId, loading },
})

export const addRoomMessage = (roomId: number | undefined, message: IMessage) => ({
  type: ADD_ROOM_MESSAGE,
  payload: { roomId, message },
})

export const incrementNumberOfUnseenMessages = (roomId: number | undefined) => ({
  type: INCREMENT_NUMBER_OF_UNSEEN_MESSAGES,
  payload: roomId,
})

export const nullifyNumberOfUnseenMessages = (roomId: number) => ({
  type: NULLIFY_NUMBER_OF_UNSEEN_MESSAGES,
  payload: roomId,
})

export const addLoadedRoomMessages = (roomId: number | undefined, messages: IMessage[]) => ({
  type: ADD_LOADED_ROOM_MESSAGES,
  payload: { roomId, messages },
})

export const setMoreMessagesLoading = (roomId: number | undefined, loading: boolean) => ({
  type: SET_MORE_MESSAGES_LOADING,
  payload: { roomId, loading },
})

export const sendMessage =
  (text: string, roomId?: number) => (dispatch: Dispatch, getState: () => IState) => {
    const room: IRoomState<IRelationship> | undefined = getState().relationships.approvedRelationships.find(
      (r) => r.room?.id === roomId
    )

    if (text === '' || !room?.room?.id?.toString()) return

    dispatch(setRoomSendMessageLoading(room.room.id, true))

    axios
      .request({
        method: 'POST',
        url: process.env.REACT_APP_API + '/message/send',
        headers: {
          Authorization: 'Bearer ' + getState().auth.token,
        },
        data: {
          text,
          roomId: room.room.id,
          sentAt: moment(Date.now()).format(process.env.REACT_APP_DATETIME_FORMAT).toString(),
          usersIds: [room?.room?.user1Id, room?.room?.user2Id],
        },
      })
      .then((response: IHttpResponse<IMessage>) => {
        dispatch(addRoomMessage(room.room?.id, response.data.data))
      })
      .catch((error: IErrorResponse<IMessage>) => {
        error.response.data.messages.forEach((message) => toast.error(message))
      })
      .finally(() => {
        dispatch(setRoomSendMessageLoading(room?.room?.id, false))
      })
  }

export const setRelationshipInvitationSeen =
  (relationshipsIds: number[]) => (dispatch: Dispatch, getState: () => IState) => {
    const token: string | undefined = getState().auth.token

    if (!token) return
    if (!relationshipsIds || relationshipsIds?.length === 0) return

    axios
      .request({
        method: 'POST',
        url: process.env.REACT_APP_API + '/relationship/setRelationshipInvitationSeen',
        headers: {
          Authorization: 'Bearer ' + token,
        },
        data: {
          relationshipsIds,
        },
      })
      .then((response: IHttpResponse<number>) => {
        console.log('unseen invitations count', response.data.data)
        dispatch(setUnseenInvitationsCount(response.data.data))
      })
  }

export const addRoomMessagesSeenBy = (roomId: number) => (dispatch: Dispatch, getState: () => IState) => {
  const token: string | undefined = getState().auth.token

  axios
    .request({
      method: 'POST',
      url: process.env.REACT_APP_API + '/message/addRoomMessagesSeenBy',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      data: {
        roomId,
      },
    })
    .then((response: IHttpResponse<number>) => {
      // If successful, then we set all messages to seen.
      if (response.data.success) dispatch(nullifyNumberOfUnseenMessages(roomId))
    })
}

export const loadMoreMessages =
  (roomId: number | undefined) => (dispatch: Dispatch, getState: () => IState) => {
    const token: string | undefined = getState().auth.token

    dispatch(setMoreMessagesLoading(roomId, true))
    axios
      .request({
        method: 'POST',
        url: process.env.REACT_APP_API + '/message/loadMoreMessages',
        headers: {
          Authorization: 'Bearer ' + token,
        },
        data: {
          roomId,
          amountAlreadyLoaded:
            getState().relationships.approvedRelationships.find((r) => r.room?.id === roomId)?.room?.messages
              ?.length || 0,
          amountToLoad: 10,
        },
      })
      .then((response: IHttpResponse<IMessage[]>) => {
        dispatch(addLoadedRoomMessages(roomId, response.data.data))
      })
      .catch((e) => {})
      .finally(() => dispatch(setMoreMessagesLoading(roomId, false)))
  }
