import React from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'

import { BiSearchAlt } from 'react-icons/bi'
import { MdPermIdentity } from 'react-icons/md'

import Button from 'components/button'
import Input from 'components/input'
import Loader from 'components/loader'

import useStyles from './styles'
import { IHttpResponse } from 'types/interfaces/IHttpResponse'
import { IState } from 'store'
import { IUser } from 'types/interfaces/IUser'
import { RelationshipEnum } from 'types/enumerations/RelationshipEnum'

interface IAddUserButton {
  setSelectedUser?: any
  selectedUser?: IUser
}

const AddUserButton = (props: IAddUserButton) => {
  const [searchedUsers, setSearchedUsers] = React.useState<IUser[]>([])
  const [loading, setLoading] = React.useState<boolean>(false)

  const token: string | undefined = useSelector<IState, string | undefined>((state) => state.auth.token)

  const styles = useStyles()
  const searchRef = React.useRef()

  const handleSearch = () => {
    const searchText = (searchRef?.current as any).value
    if (!searchText || searchText.length < 2) return setSearchedUsers([])

    setLoading(true)
    axios
      .request({
        url: process.env.REACT_APP_API + '/user/search/' + searchText,
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((response: IHttpResponse<any>) => {
        setSearchedUsers([
          ...response.data.data.map((user: IUser) => ({
            ...user,
            relationship: RelationshipEnum.Unset,
          })),
        ])

        // If the selected use doesn't exist in the new list, then we unselect him
        if (!response.data.data.find((user: IUser) => user.email === props.selectedUser?.email)) {
          props.setSelectedUser(undefined)
        }
      })
      .catch((error) => {
        error.response?.data.messages?.forEach((message: string) => toast(message))
        props.setSelectedUser([])
      })
      .finally(() => {
        setLoading(false)
      })
  }
  const handleToggleSelectUser = (user: IUser | undefined) => {
    props.setSelectedUser(user)
  }

  return (
    <>
      <Input
        ref={searchRef}
        debounce
        onChange={handleSearch}
        PrefixIcon={BiSearchAlt}
        placeholder="Search Family Member"
        style={{ marginBottom: '20px' }}
      />

      <div className={styles.searchResult}>
        {loading && <Loader />}

        {searchedUsers.map((user, index) => (
          <Button
            filled={props.selectedUser?.email === user.email}
            key={index}
            PrefixIcon={MdPermIdentity}
            onClick={() => handleToggleSelectUser(user)}
            text={(user.firstName ?? '') + ' ' + (user.lastName ?? '')}
            style={{ marginBottom: '10px' }}
          />
        ))}

        {/* If the components is no longer rendered, then we show the selected user */}
        {searchedUsers.length === 0 && props.selectedUser && (
          <Button
            filled={Boolean(props.selectedUser?.email)}
            PrefixIcon={MdPermIdentity}
            onClick={() => handleToggleSelectUser(props.selectedUser)}
            text={(props.selectedUser?.firstName ?? '') + ' ' + (props.selectedUser?.lastName ?? '')}
            style={{ marginBottom: '10px' }}
          />
        )}
      </div>
    </>
  )
}

export default React.memo(AddUserButton)
