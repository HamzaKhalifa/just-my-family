import React from 'react'

import * as Yup from 'yup'
import { useFormik } from 'formik'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'

import Input from 'components/input'
import Button from 'components/button'
import withAuthLayout from 'hoc/with-auth-layout'

import { AiTwotoneMail } from 'react-icons/ai'
import { MdPassword } from 'react-icons/md'
import { AiOutlineLogin } from 'react-icons/ai'

import useStyles from './styles'

import { setParsedToken, setToken } from 'store/auth/actions'
import { setUser } from 'store/profile/actions'
import { IHttpResponse } from 'types/interfaces/IHttpResponse'
import parseToken from 'utils/parseToken'
import { IErrorResponse } from 'types/interfaces/IErrorResponse'
import { IParsedToken } from 'types/interfaces/IParsedToken'
import { IUser } from 'types/interfaces/IUser'

const Login = () => {
  const [loading, setLoading] = React.useState(false)

  const styles = useStyles()
  const dispatch = useDispatch()

  const formik = useFormik<{
    email: string
    password: string
  }>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().required('Email is required').email('Invalid email'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: (values) => {
      setLoading(true)
      const loginToastId = toast.loading('Logging in...')
      axios
        .request({
          url: process.env.REACT_APP_API + '/auth/login',
          method: 'POST',
          data: {
            email: values.email,
            password: values.password,
          },
        })
        .then((response: IHttpResponse<{ token: string; user: IUser }>) => {
          if (response.data.success) {
            toast('Welcome back ' + parseToken(response.data.data.token).name + ' 👌')
            dispatch(setToken(response.data.data.token))
            const parsedToken: IParsedToken = parseToken(response.data.data.token)
            dispatch(setParsedToken(parsedToken))
            dispatch(setUser(response.data.data.user))
          }
        })
        .catch((error: IErrorResponse<any>) => {
          error.response?.data.messages?.forEach((message: string) => toast.error(message))
          if (!error.response) toast.error('A problem occured')
        })
        .finally(() => {
          setLoading(false)
          toast.update(loginToastId, { isLoading: false, autoClose: 3000 })
        })
    },
  })

  return (
    <div className={styles.loginContainer}>
      <h1 className={styles.greetingsText}>Hello!</h1>
      <span className={styles.loginText}>Login to your account</span>
      <form autoComplete="off" className={styles.form} onSubmit={formik.handleSubmit}>
        <Input PrefixIcon={AiTwotoneMail} formik={formik} name="email" placeholder="Email" />
        <Input
          PrefixIcon={MdPassword}
          formik={formik}
          name="password"
          placeholder="Password"
          type="password"
        />
        <Button filled PrefixIcon={AiOutlineLogin} type="submit" text="Login" loading={loading} />
      </form>

      <Link className={styles.registerLink} to="/register">
        Don't have an account?
        <span className={styles.registerText}>Register Here</span>
      </Link>

      <Link className={styles.resetPasswordLink} to="/sendResetPasswordEmail">
        Forgot your password?
        <span className={styles.restPasswordText}>Reset Password Here</span>
      </Link>
    </div>
  )
}

export default withAuthLayout(React.memo(Login))
