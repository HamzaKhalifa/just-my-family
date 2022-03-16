import { IRelationship } from 'types/interfaces/IRelationship'
import { IRoomState } from 'types/interfaces/IRoomState'

export interface IRelationshipsState {
  unseenInvitationsCount: number
  relationships: IRelationship[]
  approvedRelationships: IRoomState<IRelationship>[]
  loadings: {
    createRelationship: boolean
    relationships: boolean
    approvedRelationships: boolean
    delete: boolean
    approve: boolean
  }
  mainRoomId?: number
}

const initialState: IRelationshipsState = {
  unseenInvitationsCount: 0,
  relationships: [],
  approvedRelationships: [],
  loadings: {
    createRelationship: false,
    relationships: false,
    approvedRelationships: false,
    delete: false,
    approve: false,
  },
  mainRoomId: undefined,
}

export default initialState
