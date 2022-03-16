import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import useStyles from './styles'

import { IState } from 'store'

const withAuthLayout = (Component: any) => (props: any) => {
  const token: any = useSelector<IState>((state) => state.auth.token)

  const styles = useStyles()
  const navigate = useNavigate()

  React.useEffect(() => {
    if (token && token !== '') {
      navigate('/dashboard/home')
    }
  }, [token, navigate])

  if (token) return null

  return (
    <div className={styles.container}>
      <div className={styles.authLayoutContainer}>
        <div className={styles.left}>
          <Component {...props} />
        </div>
        <div className={styles.right}>
          <h1 className={styles.welcomeTitle}>Welcome!</h1>
          <span className={styles.welcomeText}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis libero sit, commodi tempore,
            saepe hic fugiat, delectus culpa similique impedit fuga iure ad nihil! Hic aspernatur totam
            blanditiis nemo unde.
          </span>
        </div>
      </div>
    </div>
  )
}

export default withAuthLayout
