import axios, { AxiosInstance } from 'axios'
import { AuthTokensPair } from 'store/auth/auth-types'
import { ApiTokenRefresher } from '@wavesenterprise/api-token-refresher'
import store from 'store'
import { logout, setAPIAuthorized, setAuthTokens } from 'store/auth/auth-actions'
import { showNotificationFromAPIError } from 'utils/showNotificationFromAPIError'
import { APIService } from 'api/APIService'
import { APIError } from 'api/APIError'

export class APIAuthProvider {

  private axios: AxiosInstance = axios

  authorize(tokens: AuthTokensPair): void {
    const tokenRefresher = new ApiTokenRefresher({
      authorization: {
        access_token: tokens.accessToken,
        refresh_token: tokens.refreshToken,
      },
      maxAttemptsToRefreshToken: 1,
      sleepAfterError: 0,
      refreshCallback: async (token) => {
        try {
          const { accessToken, refreshToken } = await APIService.auth.refresh(token)
          store.dispatch(setAuthTokens({
            accessToken,
            refreshToken,
          }))
          return {
            access_token: accessToken,
            refresh_token: refreshToken,
          }
        } catch (e) {
          showNotificationFromAPIError(e as APIError)
          store.dispatch(logout())
          throw e
        }
      },
    })
    const { axios: axois2 } = tokenRefresher.init()
    this.axios = axois2
    store.dispatch(setAPIAuthorized(true))
  }

  unauthorize(): void {
    this.axios = axios
    store.dispatch(setAPIAuthorized(false))
  }

  getClient() {
    return this.axios
  }

}
