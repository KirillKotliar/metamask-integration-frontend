import { APIServiceConsumer } from '../APIServiceConsumer'
import { Profile } from 'types/api'

export class ProfileAPIService extends APIServiceConsumer {
  fetch = (): Promise<Profile> => {
    return this.get<Profile>('/profile')
  }
}
