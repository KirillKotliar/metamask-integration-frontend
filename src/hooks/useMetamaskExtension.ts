import { useMemo } from 'react'
import { MetaMaskSDK } from '@metamask/sdk'

export const useMetamaskExtension = () => {
  return useMemo(() => new MetaMaskSDK({ dappMetadata: { name: 'My Dapp', url: 'https://mydapp.com' } }),[])
}
