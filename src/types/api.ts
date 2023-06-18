export type AuthTokensDTO = {
  accessToken: string,
  refreshToken: string,
}

export type SignInRequest = {
  hash: string,
  signature: string,
  nonce: string,
}

export type SignUpRequest = SignInRequest & {
  username: string,
}

export type Profile = {
  id: string,
  username: string,
  ethAddress: string,
  createdAt: string,
}

