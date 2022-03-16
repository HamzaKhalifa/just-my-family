import React from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

import Input from 'components/input'
import Button from 'components/button'
import withAuthLayout from 'hoc/with-auth-layout'

import { MdPassword } from 'react-icons/md'
import { AiOutlineLogin, AiTwotoneMail } from 'react-icons/ai'

import useStyles from './styles'

import { IHttpResponse } from 'types/interfaces/IHttpResponse'

interface IResetPassword {
  location: any
}

const ResetPassword = (props: IResetPassword) => {
  const [loading, setLoading] = React.useState<boolean>(false)

  const styles = useStyles()
  const params = new URLSearchParams(window.location.search)
  const token = params.get('token')
  const navigate = useNavigate()

  const formik = useFormik<{
    email: string
    password: string
    passwordConfirmation: string
  }>({
    initialValues: {
      email: '',
      password: '',
      passwordConfirmation: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().required('Email is required').email('Invalid email'),
      password: Yup.string().required('Password is required').min(6, 'Minimum password length is 6'),
      passwordConfirmation: Yup.string()
        .required('Please confirm your new password')
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    }),
    onSubmit: ({ email, password }) => {
      setLoading(true)
      const resettingPasswordToastId = toast.loading('Sending password reinitialization email...')
      axios
        .request({
          method: 'POST',
          url: process.env.REACT_APP_API + '/auth/resetPassword',
          data: {
            email,
            password,
            token,
          },
        })
        .then((response: IHttpResponse<any>) => {
          if (response.data.success) {
            toast('Your password has been reset 👌')
            navigate('/login')
          }
        })
        .catch((error) => error.response?.data.messages?.forEach((message: string) => toast.error(message)))
        .finally(() => {
          setLoading(false)
          toast.update(resettingPasswordToastId, {
            isLoading: false,
            autoClose: 3000,
          })
        })
    },
  })

  return (
    <div className={styles.loginContainer}>
      <h1 className={styles.greetingsText}>Forgot your password?</h1>
      <span className={styles.loginText}>No worries we'll help you with what we can do</span>

      <form autoComplete="off" className={styles.form} onSubmit={formik.handleSubmit}>
        <Input PrefixIcon={AiTwotoneMail} formik={formik} name="email" placeholder="Email" type="email" />
        <Input
          PrefixIcon={MdPassword}
          formik={formik}
          name="password"
          placeholder="New Password"
          type="password"
        />
        <Input
          PrefixIcon={MdPassword}
          formik={formik}
          name="passwordConfirmation"
          placeholder="New Password"
          type="password"
        />
        <Button filled PrefixIcon={AiOutlineLogin} type="submit" text="Reset Password" loading={loading} />
      </form>

      <Link className={styles.registerLink} to="/register">
        Don't have an account?
        <span className={styles.registerText}>Register Here</span>
      </Link>

      <Link className={styles.forgotPasswordLink} to="/login">
        Remember your password?
        <span className={styles.forgotPasswordText}>Login Here</span>
      </Link>
    </div>
  )
}

export default withAuthLayout(React.memo(ResetPassword))
