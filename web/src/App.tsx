import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from 'react-jss'
import { PersistGate } from 'redux-persist/integration/react'

import Core from 'components/core'
import Register from 'pages/register'
import Login from 'pages/login'
import SendResetPassworEmail from 'pages/send-reset-password-email'
import ResetPassword from 'pages/reset-password'
import Dashboard from 'pages/dashboard'

import theme from './theme'

import store, { persistor } from 'store'

import 'react-toastify/dist/ReactToastify.css'
import React from 'react'

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <Core />

          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/*" element={<Dashboard />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/sendResetPasswordEmail" element={<SendResetPassworEmail />} />
              <Route path="/resetPassword" element={<ResetPassword />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  )
}

export default App
