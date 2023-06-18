import { AuthActions, AuthState } from 'store/auth/auth-types'

const initialState: AuthState = {
  tokens: null,
  APIAuthorized: false,
  profile: null,
  profileLoading: false,
}

export const authReducer = (state = initialState, action: AuthActions): AuthState => {
  switch (action.type) {
    case 'LOGOUT':
      return {
        tokens: null,
        APIAuthorized: false,
        profile: null,
        profileLoading: false,
      }
    case 'SET_AUTH_TOKENS':
      return {
        ...state,
        tokens: action.payload,
      }
    case 'SET_API_AUTHORIZED':
      return {
        ...state,
        APIAuthorized: action.payload,
      }
    case 'SET_PROFILE':
      return {
        ...state,
        profile: action.payload,
      }
    case 'SET_PROFILE_LOADING':
      return {
        ...state,
        profileLoading: action.payload,
      }
    default:
      return state
  }
}
