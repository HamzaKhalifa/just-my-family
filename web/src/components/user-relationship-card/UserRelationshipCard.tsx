import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import UserProfilePicture from 'components/user-profile-picture'
import ButtonWithConfirmationModal from 'components/button-with-confirmation-modal'

import { FcApprove, FcDisapprove } from 'react-icons/fc'

import { approveInvitation, deleteInvitation } from 'store/relationships/actions'

import useStyles from './styles'
import { IUser } from 'types/interfaces/IUser'
import { IRelationship } from 'types/interfaces/IRelationship'
import { relationshipEnumToText } from 'types/enumerations/RelationshipEnum'
import { IParsedToken } from 'types/interfaces/IParsedToken'
import { IState } from 'store'
import { InvitationStatusEnum, invitationStatusEnumToText } from 'types/enumerations/InvitationStatusEnum'
import { SizeEnum } from 'components/user-profile-picture/UserProfilePicture'

interface IUserCard {
  user: IUser
  relationship: IRelationship
}

const UserRelationshipCard = (props: IUserCard) => {
  const parsedToken: IParsedToken | undefined = useSelector<IState, IParsedToken | undefined>(
    (state) => state.auth.parsedToken
  )
  const approveLoading: boolean = useSelector<IState, boolean>(
    (state) => state.relationships.loadings.approve
  )
  const deleteLoading: boolean = useSelector<IState, boolean>((state) => state.relationships.loadings.delete)

  const styles = useStyles()
  const dispatch = useDispatch()

  const status: InvitationStatusEnum = props.relationship.approved
    ? InvitationStatusEnum.Approved
    : parsedToken?.nameid === props.relationship.senderUserId
    ? InvitationStatusEnum.Pending
    : InvitationStatusEnum.Received

  const handleCancelInvitation = () => dispatch(deleteInvitation(props.relationship.id))

  const handleDeleteInvitation = () => dispatch(deleteInvitation(props.relationship.id, true))

  const handleApproveInvitation = () => dispatch(approveInvitation(props.relationship.id))

  return (
    <div className={styles.userCardContainer}>
      <div className={styles.left}>
        <UserProfilePicture
          size={SizeEnum.Big}
          profilePictureName={props.user.profilePictureName as string}
        />
        <div className={styles.nameAndRelationshipType}>
          <span className={styles.status}>{invitationStatusEnumToText(status)} from:</span>
          <span className={styles.name}>
            {(props.user.firstName || '') + ' ' + (props.user.lastName || '')}
          </span>
          <span className={styles.relationship}>
            {parsedToken?.nameid === props.relationship.senderUserId
              ? relationshipEnumToText(props.relationship?.type)
              : 'You are a ' + relationshipEnumToText(props.relationship?.type) + ' to this person'}
          </span>
        </div>
      </div>

      <div className={styles.right}>
        {status === InvitationStatusEnum.Pending && (
          <ButtonWithConfirmationModal
            buttonText="Cancel"
            buttonIcon={FcDisapprove}
            onConfirm={handleCancelInvitation}
            confirmationText="Are you sure you want to cancel this invitation?"
            confirmationButtonText={"Yes, this isn't my " + relationshipEnumToText(props.relationship?.type)}
            cancelButtonText="Cancel"
            buttonLoading={deleteLoading}
          />
        )}
        {status === InvitationStatusEnum.Received && (
          <ButtonWithConfirmationModal
            buttonText="Approve"
            buttonIcon={FcApprove}
            onConfirm={handleApproveInvitation}
            confirmationText="Are you sure you want to approve this relationship?"
            confirmationButtonText={
              'Yes, I am a ' + relationshipEnumToText(props.relationship?.type) + ' to this person'
            }
            cancelButtonText="Cancel"
            buttonLoading={approveLoading}
          />
        )}
        {status === InvitationStatusEnum.Received && <br />}

        {status === InvitationStatusEnum.Received && (
          <ButtonWithConfirmationModal
            buttonText="Reject"
            buttonIcon={FcDisapprove}
            onConfirm={handleDeleteInvitation}
            confirmationText="Are you sure you want to reject this relationship?"
            confirmationButtonText={
              "Yes, I'm not a " + relationshipEnumToText(props.relationship?.type) + ' to this person'
            }
            cancelButtonText="Cancel"
            buttonLoading={deleteLoading}
          />
        )}

        {status === InvitationStatusEnum.Approved && (
          <ButtonWithConfirmationModal
            buttonText="Delete"
            buttonIcon={FcDisapprove}
            onConfirm={handleDeleteInvitation}
            confirmationText="Are you sure you want to break off this relationship?"
            confirmationButtonText={'Yes delete'}
            cancelButtonText="Cancel"
            buttonLoading={deleteLoading}
          />
        )}
      </div>
    </div>
  )
}

export default React.memo(UserRelationshipCard)
