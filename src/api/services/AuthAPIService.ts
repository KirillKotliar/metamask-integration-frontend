import { APIServiceConsumer } from '../APIServiceConsumer'
import { AuthTokensDTO } from 'types/api'
import { SiweMessage } from 'siwe'
import { ethers } from 'ethers'

export class AuthAPIService extends APIServiceConsumer {

  protected getBasePath(): string {
    return window.appConfig.BACKEND_ADDRESS
  }

  async signUpWithMetamask(username: string): Promise<AuthTokensDTO> {
    const data = await this.createLoginSign()
    return this.post<AuthTokensDTO>('/sign-up', { username, ...data })
  }

  async signInWithMetamask(): Promise<AuthTokensDTO> {
    const data = await this.createLoginSign()
    return this.post<AuthTokensDTO>('/sign-in', data)
  }

  refresh(refreshToken: string): Promise<AuthTokensDTO> {
    return this.post<AuthTokensDTO>('/refresh', { token: refreshToken }, { preventErrorPopup: true })
  }

  wakeUp(accessToken: string): Promise<AuthTokensDTO> {
    return this.post('/verify', { token: accessToken })
  }

  private async createLoginSign() {
    const domain = window.location.host
    const origin = window.location.origin
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const provider = new ethers.providers.Web3Provider(window.ethereum as unknown as any)
    if (!provider) {
      throw new Error('No metamask provider found')
    }
    const signer = provider.getSigner()

    const nonce = Date.now()
    try {
      const accounts = await provider.listAccounts()
      const account = accounts[0]
      if (!account) {
        throw new Error('No metamask accounts')
      }
      const chainId = (await provider.getNetwork()).chainId

      const message = new SiweMessage({
        domain,
        address: account,
        statement: 'Sign in with Ethereum to the app.',
        uri: origin,
        version: '1',
        chainId,
        nonce: nonce.toString(),
      }).toMessage()

      const signature = await signer.signMessage(message)

      return { hash: message, signature, nonce }
    } catch (e) {
      throw e
    }
  }

}
