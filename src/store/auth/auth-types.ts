import { Profile } from 'types/api'

export type AuthTokensPair = {
  accessToken: string,
  refreshToken: string,
}

export type AuthState = {
  tokens: AuthTokensPair | null,
  APIAuthorized: boolean,
  profile: Profile | null,
  profileLoading: boolean,
}

export const SET_AUTH_TOKENS = 'SET_AUTH_TOKENS'
export const LOGOUT = 'LOGOUT'
export const SET_API_AUTHORIZED = 'SET_API_AUTHORIZED'
export const SET_PROFILE = 'SET_PROFILE'
export const SET_PROFILE_LOADING = 'SET_PROFILE_LOADING'

type SetTokensAction = {
  type: typeof SET_AUTH_TOKENS,
  payload: AuthTokensPair,
}

type SetAPIAuthorziedAction = {
  type: typeof SET_API_AUTHORIZED,
  payload: boolean,
}

type SetProfileAction = {
  type: typeof SET_PROFILE,
  payload: Profile,
}

export type LogoutAction = {
  type: typeof LOGOUT,
}

type SetProfileLoadingAction = {
  type: typeof SET_PROFILE_LOADING,
  payload: boolean,
}

export type AuthActions =
  SetTokensAction |
  LogoutAction |
  SetAPIAuthorziedAction |
  SetProfileAction |
  SetProfileLoadingAction

