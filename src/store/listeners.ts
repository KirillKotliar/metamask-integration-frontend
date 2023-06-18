import { Store } from 'redux'
import { StoreObserver } from 'utils/store-observer/StoreObserver'
import { getAuthTokens, getIsAuthenticated } from 'store/auth/auth-selectors'
import { SelectorValue } from 'utils/store-observer/StoreListener'
import { APIService } from 'api/APIService'
import { setProfile, setProfileLoading } from 'store/auth/auth-actions'
import { AuthTokensPair } from 'store/auth/auth-types'
import { storage } from 'utils/storage'

const logout = () => {
  storage.removeItem('auth')
  APIService.unauthorize()
}

export const listen = (store: Store): void => {
  const storeObserver = new StoreObserver(store)

  storeObserver.listen(
    [getAuthTokens],
    (tokens: SelectorValue<Nullable<AuthTokensPair>>) => {
      if (tokens.current && !tokens.prev) {
        APIService.authorize(tokens.current)
      }
      if (tokens.current) {
        storage.setItem('auth', tokens.current)
      }
    },
    true,
  )

  storeObserver.listen(
    [getIsAuthenticated],
    async (isAuthenticated: SelectorValue<boolean>) => {
      if (isAuthenticated.current) {
        store.dispatch(setProfileLoading(true))
        const profile = await APIService.profile.fetch()
        store.dispatch(setProfile(profile))
        store.dispatch(setProfileLoading(false))
      } else {
        logout()
      }
    })
}
