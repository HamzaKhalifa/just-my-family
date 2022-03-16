import React from 'react'
import { useTheme } from 'react-jss'

import { ImMan, ImWoman, ImManWoman } from 'react-icons/im'
import { IoIosMan, IoIosWoman } from 'react-icons/io'
import { CgBoy, CgGirl } from 'react-icons/cg'

import Button from 'components/button'

import useStyles from './styles'
import { IUser } from 'types/interfaces/IUser'
import { ITheme } from 'theme'
import { RelationshipEnum } from 'types/enumerations/RelationshipEnum'
import { IUpdateRelationship } from 'types/interfaces/IRelationship'

interface ISelectRelationship {
  user?: IUser
  selectedRelationship?: IUpdateRelationship
  onRelationshipSelect?: any
  style?: any
}

const SelectRelationship = (props: ISelectRelationship) => {
  const styles = useStyles()
  const theme: ITheme = useTheme()

  return (
    <div style={{ ...(props.style ?? {}) }} className={styles.selectRelationshipContainer}>
      <Button
        filled
        text={(props.user?.firstName ?? '') + ' ' + (props.user?.lastName ?? '')}
        style={{
          marginBottom: '10px',
        }}
      />

      <Button
        text="Father"
        onClick={() => props.onRelationshipSelect(RelationshipEnum.Father)}
        filled={props.selectedRelationship?.type === RelationshipEnum.Father}
        PrefixIcon={ImMan}
        style={{
          width: '49%',
          marginBottom: '10px',
          boxShadow: 'none',
          border: '1px solid ' + theme.primaryColor,
        }}
      />
      <Button
        text="Mother"
        onClick={() => props.onRelationshipSelect(RelationshipEnum.Mother)}
        filled={props.selectedRelationship?.type === RelationshipEnum.Mother}
        PrefixIcon={ImWoman}
        style={{
          width: '49%',
          marginBottom: '10px',
          boxShadow: 'none',
          border: '1px solid ' + theme.primaryColor,
        }}
      />
      <Button
        text="Husband"
        onClick={() => props.onRelationshipSelect(RelationshipEnum.Husband)}
        filled={props.selectedRelationship?.type === RelationshipEnum.Husband}
        PrefixIcon={ImManWoman}
        style={{
          width: '49%',
          marginBottom: '10px',
          boxShadow: 'none',
          border: '1px solid ' + theme.primaryColor,
        }}
      />
      <Button
        text="Wife"
        onClick={() => props.onRelationshipSelect(RelationshipEnum.Wife)}
        filled={props.selectedRelationship?.type === RelationshipEnum.Wife}
        PrefixIcon={ImManWoman}
        style={{
          width: '49%',
          marginBottom: '10px',
          boxShadow: 'none',
          border: '1px solid ' + theme.primaryColor,
        }}
      />
      <Button
        text="Son"
        onClick={() => props.onRelationshipSelect(RelationshipEnum.Son)}
        filled={props.selectedRelationship?.type === RelationshipEnum.Son}
        PrefixIcon={CgBoy}
        style={{
          width: '49%',
          marginBottom: '10px',
          boxShadow: 'none',
          border: '1px solid ' + theme.primaryColor,
        }}
      />
      <Button
        text="Daughter"
        onClick={() => props.onRelationshipSelect(RelationshipEnum.Daughter)}
        filled={props.selectedRelationship?.type === RelationshipEnum.Daughter}
        PrefixIcon={CgGirl}
        style={{
          width: '49%',
          marginBottom: '10px',
          boxShadow: 'none',
          border: '1px solid ' + theme.primaryColor,
        }}
      />
      <Button
        text="Brother"
        onClick={() => props.onRelationshipSelect(RelationshipEnum.Brother)}
        filled={props.selectedRelationship?.type === RelationshipEnum.Brother}
        PrefixIcon={IoIosMan}
        style={{
          width: '49%',
          boxShadow: 'none',
          border: '1px solid ' + theme.primaryColor,
        }}
      />
      <Button
        text="Sister"
        onClick={() => props.onRelationshipSelect(RelationshipEnum.Sister)}
        filled={props.selectedRelationship?.type === RelationshipEnum.Sister}
        PrefixIcon={IoIosWoman}
        style={{
          width: '49%',
          boxShadow: 'none',
          border: '1px solid ' + theme.primaryColor,
        }}
      />
    </div>
  )
}

export default React.memo(SelectRelationship)
