import { RootState } from 'store'

export const getIsAuthenticated = (state: RootState) => state.auth.tokens !== null
export const getAuthTokens = (state: RootState) => state.auth.tokens
export const getAPIAuthorized = (state: RootState) => state.auth.APIAuthorized
// authenticated and profile is not loaded and API is not authorized
export const getIsMainInitializing = (state: RootState) => {
  return getIsAuthenticated(state) && getAPIAuthorized(state)
}
export const getProfile = (state: RootState) => state.auth.profile
export const getIsProfileLoading = (state: RootState) => state.auth.profileLoading

