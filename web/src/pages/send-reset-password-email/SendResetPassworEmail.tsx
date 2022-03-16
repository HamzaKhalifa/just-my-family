import React from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

import Input from 'components/input'
import Button from 'components/button'
import withAuthLayout from 'hoc/with-auth-layout'

import { AiTwotoneMail } from 'react-icons/ai'
import { AiOutlineLogin } from 'react-icons/ai'

import useStyles from './styles'

import { IHttpResponse } from 'types/interfaces/IHttpResponse'

const ResetPassword = () => {
  const [loading, setLoading] = React.useState<boolean>(false)

  const styles = useStyles()

  const formik = useFormik<{ email: string }>({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().required('Email is required').email('Invalid email'),
    }),
    onSubmit: ({ email }) => {
      setLoading(true)
      const resettingPasswordToastId = toast.loading('Sending password reinitialization email...')
      axios
        .request({
          url: process.env.REACT_APP_API + '/auth/sendResetPasswordEmail/' + email,
          method: 'GET',
        })
        .then((response: IHttpResponse<any>) => {
          if (response.data.success) {
            toast('A password reinitialization email has been sent 👌')
          }
        })
        .catch((error) => error.response?.data.messages?.forEach((message: string) => toast(message)))
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
        <Input PrefixIcon={AiTwotoneMail} formik={formik} name="email" placeholder="Email" />
        <Button
          filled
          PrefixIcon={AiOutlineLogin}
          type="submit"
          text="Send Password Reinitialization Email"
          loading={loading}
        />
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
