import React, { useCallback, useEffect, useState } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { SignIn } from 'pages/Auth/SignIn'
import { SignUp } from 'pages/Auth/SignUp'
import { ProfilePage } from 'pages/Profile/Profile'
import { useDebouncedCallback } from 'use-debounce'
import { APIService } from 'api/APIService'
import { storage } from 'utils/storage'
import { logout, setAuthTokens } from 'store/auth/auth-actions'
import { useDispatch, useSelector } from 'react-redux'
import { AuthTokensPair } from 'store/auth/auth-types'
import { getIsAuthenticated, getIsProfileLoading } from 'store/auth/auth-selectors'
import { ScreenPlaceholder } from 'components/screen-placeholder/ScreenPlaceholder'
import { UISpinner } from 'components/UISpinner'

export const App: React.FC = () => {
  const isAuthenticated = useSelector(getIsAuthenticated)
  const isProfileLoading = useSelector(getIsProfileLoading)
  const [isAuthWakingUp, setAuthWakingUp] = useState(true)
  const dispatch = useDispatch()

  const restoreAuth = useDebouncedCallback(useCallback(async () => {
    const tokens = storage.getItem<AuthTokensPair>('auth')
    if (!tokens) {
      setAuthWakingUp(false)
      return
    }
    try {
      const newTokens = await APIService.auth.wakeUp(tokens.accessToken)
      dispatch(setAuthTokens(newTokens))
    } catch (e) {
      if ((e as Error).message !== 'Request aborted') {
        storage.removeItem('auth')
        dispatch(logout())
      }
    }
    setAuthWakingUp(false)
  }, [dispatch]), 500)

  useEffect(() => {
    restoreAuth()
  }, [restoreAuth, isAuthenticated])

  if (isAuthWakingUp || isProfileLoading) {
    return (
      <ScreenPlaceholder>
        <UISpinner />
      </ScreenPlaceholder>
    )
  }

  if (isAuthenticated) {
    return (
      <Routes>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path={'*'} element={<Navigate to={'/profile'} replace />} />
      </Routes>
    )
  }

  return (
    <Routes>
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path={'*'} element={<Navigate to={'/sign-in'} replace />} />
    </Routes>
  )
}
