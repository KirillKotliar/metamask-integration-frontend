import {
  AuthActions,
  AuthTokensPair,
  LOGOUT,
  SET_API_AUTHORIZED,
  SET_AUTH_TOKENS,
  SET_PROFILE,
  SET_PROFILE_LOADING,
} from 'store/auth/auth-types'
import { Profile } from 'types/api'

export const setAuthTokens = (payload: AuthTokensPair): AuthActions => ({
  type: SET_AUTH_TOKENS,
  payload,
})

export const logout = (): AuthActions => ({
  type: LOGOUT,
})

export const setAPIAuthorized = (payload: boolean): AuthActions => ({
  type: SET_API_AUTHORIZED,
  payload,
})

export const setProfile = (payload: Profile): AuthActions => ({
  type: SET_PROFILE,
  payload,
})

export const setProfileLoading = (payload: boolean): AuthActions => ({
  type: SET_PROFILE_LOADING,
  payload,
})

