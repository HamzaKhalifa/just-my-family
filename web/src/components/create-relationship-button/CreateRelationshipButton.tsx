import React from 'react'

import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'

import { BsFillPatchPlusFill } from 'react-icons/bs'
import { FcCancel } from 'react-icons/fc'
import { GiPlayerNext } from 'react-icons/gi'
import { GrFormPreviousLink } from 'react-icons/gr'

import Button from 'components/button'
import Modal from 'components/modal'
import SearchUser from 'components/search-user'
import SelectRelationship from 'components/select-relationship'

import { createRelationship } from 'store/relationships/actions'

import useStyles from './styles'
import { IUser } from 'types/interfaces/IUser'
import { relationshipEnumToText, RelationshipEnum } from 'types/enumerations/RelationshipEnum'
import { IState } from 'store'
import { IParsedToken } from 'types/interfaces/IParsedToken'
import { IUpdateRelationship } from 'types/interfaces/IRelationship'

enum StepEnum {
  search,
  memberRelationship,
  finalConfirmation,
}

const CreateRelationshipButton = () => {
  const parsedToken: IParsedToken | undefined = useSelector<IState, IParsedToken | undefined>(
    (state) => state.auth.parsedToken
  )
  const loading: boolean = useSelector<IState, boolean>(
    (state) => state.relationships.loadings['createRelationship']
  )

  const [searchModalOpen, setSearchModalOpen] = React.useState(false)
  const [currentStep, setCurrentStep] = React.useState<StepEnum>(StepEnum.search)
  const [selectedUser, setSelectedUser] = React.useState<IUser | undefined>(undefined)
  const [selectedRelationship, setSelectedRelationship] = React.useState<IUpdateRelationship | undefined>(
    undefined
  )

  const styles = useStyles()
  const dispatch = useDispatch()

  const handleNext = () => {
    switch (currentStep) {
      case StepEnum.search: {
        if (!selectedUser) toast.error('Please select a member first')
        else setCurrentStep(StepEnum.memberRelationship)
        break
      }
      case StepEnum.memberRelationship: {
        if (!Boolean(selectedRelationship))
          toast.error('Please select your relationship with your family member')
        else setCurrentStep(StepEnum.finalConfirmation)
        break
      }
      case StepEnum.finalConfirmation: {
        dispatch(
          createRelationship(selectedRelationship, selectedUser, () => {
            setSearchModalOpen(false)
            setCurrentStep(StepEnum.search)
          })
        )
        break
      }
      default: {
        break
      }
    }
  }
  const handleSelectRelationship = (relationshipType: RelationshipEnum) => {
    setSelectedUser({ ...selectedUser })
    setSelectedRelationship({ type: relationshipType, senderUserId: parsedToken?.nameid })
  }

  return (
    <>
      <Button
        onClick={() => setSearchModalOpen(true)}
        PrefixIcon={BsFillPatchPlusFill}
        text="Add a new family member"
      />

      <Modal onClose={() => setSearchModalOpen(false)} open={searchModalOpen}>
        <form className={styles.searchModalContainer}>
          <h2 className={styles.searchModalTitle}>Add a new family member</h2>

          {currentStep === StepEnum.search && (
            <SearchUser selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
          )}

          {currentStep === StepEnum.memberRelationship && (
            <SelectRelationship
              selectedRelationship={selectedRelationship}
              onRelationshipSelect={handleSelectRelationship}
              user={selectedUser}
            />
          )}

          {currentStep === StepEnum.finalConfirmation && Boolean(selectedUser) && (
            <span className={styles.certaintyMessage}>
              Are you sure this is your {relationshipEnumToText(selectedRelationship?.type)}?
            </span>
          )}

          <div className={styles.searchModalButtons}>
            <Button
              type="button"
              PrefixIcon={FcCancel}
              onClick={() => {
                setSearchModalOpen(false)
                setCurrentStep(StepEnum.search)
              }}
              text="Cancel"
            />
            <div style={{ width: '30px' }} />
            {currentStep !== StepEnum.search && (
              <Button
                PrefixIcon={GrFormPreviousLink}
                text="Previous"
                onClick={() =>
                  setCurrentStep(
                    currentStep === StepEnum.memberRelationship
                      ? StepEnum.search
                      : StepEnum.memberRelationship
                  )
                }
              />
            )}
            {currentStep !== StepEnum.search && <div style={{ width: '30px' }} />}
            <Button
              filled
              type="button"
              PrefixIcon={GiPlayerNext}
              loading={loading}
              onClick={handleNext}
              text={currentStep === StepEnum.finalConfirmation ? 'Yes' : 'Next'}
            />
          </div>
        </form>
      </Modal>
    </>
  )
}

export default React.memo(CreateRelationshipButton)
