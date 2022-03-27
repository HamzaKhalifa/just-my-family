import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import Button from 'components/button'
import Input from 'components/input'

import useStyles from './styles'
import { IState } from 'store'
import { updateProfile } from 'store/profile/actions'
import { IUserState } from 'store/profile/initialState'

const ProfileForm = () => {
  const updateProfileLoading: boolean = useSelector<IState, boolean>(
    (state) => state.profile.updateProfileLoading
  )
  const user: IUserState | undefined = useSelector<IState, IUserState | undefined>(
    (state) => state.profile.user
  )

  const styles = useStyles()
  const dispatch = useDispatch()
  const formik = useFormik<{ firstName?: string; lastName?: string; age?: number }>({
    initialValues: {
      firstName: user?.user?.firstName,
      lastName: user?.user?.lastName,
      age: user?.user?.age,
    },
    validationSchema: Yup.object().shape({
      firstName: Yup.string().required('Firstname is required'),
      lastName: Yup.string().required('Lastname is required'),
      age: Yup.number(),
    }),
    onSubmit: (values) => {
      dispatch(updateProfile(values))
    },
  })

  const handleSubmit = (e: any) => {
    e.preventDefault()
    formik.handleSubmit()
  }

  return (
    <form className={styles.profileForm} onSubmit={handleSubmit}>
      <Input style={{ marginBottom: '30px' }} placeholder="Firstname" formik={formik} name="firstName" />
      <Input style={{ marginBottom: '30px' }} placeholder="Lastname" formik={formik} name="lastName" />
      <Input style={{ marginBottom: '30px' }} placeholder="Age" type="number" formik={formik} name="age" />
      <Button type="submit" text="Submit" loading={updateProfileLoading} />
    </form>
  )
}

export default React.memo(ProfileForm)
