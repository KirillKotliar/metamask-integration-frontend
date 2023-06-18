import { APIAuthProvider } from 'api/APIAuthProvider'
import { AuthAPIService } from 'api/services/AuthAPIService'
import { ProfileAPIService } from 'api/services/ProfileAPIService'
import { AuthTokensPair } from 'store/auth/auth-types'
export class APIService {

  static readonly authProvider = new APIAuthProvider()

  static readonly auth = new AuthAPIService()

  static readonly profile = new ProfileAPIService()


  static getClient() {
    return APIService.authProvider.getClient()
  }

  static authorize(tokens: AuthTokensPair) {
    return APIService.authProvider.authorize(tokens)
  }

  static unauthorize() {
    return APIService.authProvider.unauthorize()
  }

}
