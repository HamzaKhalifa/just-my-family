import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Home from 'pages/home'
import Chat from 'pages/chat'
import Relationships from 'pages/relationships'
import Notifications from 'pages/notifications'
import withLeftMenu from 'hoc/with-left-menu'
import withProfileView from 'hoc/with-profile-view'

import useStyles from './styles'
import { IState } from 'store'

const Dashboard = () => {
  const styles = useStyles()

  const navigate = useNavigate()

  const token: any = useSelector<IState>((state) => state.auth.token)

  React.useEffect(() => {
    if (!token || token === '') {
      navigate('/login')
    }
  }, [token, navigate])

  if (!token || token === '') return null

  return (
    <div className={styles.dashboardContainer}>
      <Routes>
        <Route path="/home" element={<Home key={Date.now()} />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/relationships" element={<Relationships key={Date.now()} />} />
      </Routes>
    </div>
  )
}

export default withLeftMenu(withProfileView(Dashboard))
