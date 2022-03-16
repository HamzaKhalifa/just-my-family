import React from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

import Input from 'components/input'
import Button from 'components/button'
import Checkbox from 'components/checkbox'
import withAuthLayout from 'hoc/with-auth-layout'

import { GiArchiveRegister } from 'react-icons/gi'

import { AiTwotoneMail } from 'react-icons/ai'
import { MdPermIdentity, MdPassword } from 'react-icons/md'

import useStyles from './styles'
import { IErrorResponse } from 'types/interfaces/IErrorResponse'

const Register = () => {
  const [loading, setLoading] = React.useState(false)

  const styles = useStyles()
  const navigate = useNavigate()

  const handleGenderChange = (gender: string) => {
    let newGender: number = 1
    switch (gender) {
      case 'male':
        newGender = 1
        break
      case 'female':
        newGender = 2
        break
      case 'other':
        newGender = 3
    }
    formik.setFieldValue('gender', newGender)
  }

  const formik = useFormik<{
    firstName: string
    lastName: string
    email: string
    password: string
    gender: number
  }>({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      gender: 1, // 1 represents male
    },
    validationSchema: Yup.object().shape({
      firstName: Yup.string().required('Firstname is required'),
      lastName: Yup.string().required('Lastname is required'),
      email: Yup.string().required('Email is required').email('Invalid email'),
      password: Yup.string().required('Password is required').min(6, 'Minimum password length is 6'),
    }),
    onSubmit: (values) => {
      setLoading(false)
      const registerToastId = toast.loading('Registering...')
      axios
        .request({
          url: process.env.REACT_APP_API + '/auth/register',
          method: 'POST',
          data: {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password,
            gender: values.gender,
          },
        })
        .then((response) => {
          if (response.data.success) {
            navigate('/login')
            toast('Registration complete')
          } else {
            response.data.messages?.forEach((message: string) => toast(message))
          }
        })
        .catch((error: IErrorResponse<any>) => {
          error.response?.data.messages.forEach((message: string) => toast.error(message))
          if (!error.response) toast.error('A problem occured')
        })
        .finally(() => {
          toast.update(registerToastId, { isLoading: false, autoClose: 3000 })
          setLoading(false)
        })
    },
  })

  return (
    <div className={styles.registerContainer}>
      <h1 className={styles.greetingsText}>Hello!</h1>
      <span className={styles.registerText}>Create a new account</span>

      <form autoComplete="off" className={styles.form} onSubmit={formik.handleSubmit}>
        <Input PrefixIcon={MdPermIdentity} formik={formik} name="firstName" placeholder="Firstname" />
        <Input PrefixIcon={MdPermIdentity} formik={formik} name="lastName" placeholder="Lastname" />
        <Input PrefixIcon={AiTwotoneMail} formik={formik} name="email" placeholder="Email" />
        <Input
          PrefixIcon={MdPassword}
          formik={formik}
          name="password"
          placeholder="Password"
          type="password"
        />
        <div className={styles.gender}>
          <span className={styles.genderLabel}>Gender:</span>
          <div className={styles.genderContainer}>
            <Checkbox
              style={{ width: '30%' }}
              label="Male"
              onChange={handleGenderChange}
              checked={formik.values.gender === 1}
              name="male"
            />
            <Checkbox
              style={{ width: '30%' }}
              label="Female"
              onChange={handleGenderChange}
              checked={formik.values.gender === 2}
              name="female"
            />
            <Checkbox
              style={{ width: '30%' }}
              label="Other"
              onChange={handleGenderChange}
              checked={formik.values.gender === 3}
              name="other"
            />
          </div>
        </div>
        <Button PrefixIcon={GiArchiveRegister} filled type="submit" text="Register" loading={loading} />
      </form>

      <Link className={styles.loginLink} to="/login">
        Already have an account?
        <span className={styles.loginText}>Login Here</span>
      </Link>
    </div>
  )
}

export default withAuthLayout(React.memo(Register))
