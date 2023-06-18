import React, { FormEvent, useCallback, useState } from 'react'
import { Layout } from 'components/layout/Layout'
import { UIBlock, UIColumn } from 'components/ui-blocks/UiBlocks'
import { UIButton } from 'components/UIButton'
import { useMetamaskExtension } from 'src/hooks/useMetamaskExtension'
import { UIInput } from 'components/UIInput'
import { APIService } from 'api/APIService'
import { setAuthTokens } from 'store/auth/auth-actions'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AppLink } from 'components/app-link/AppLink'

export const SignUp: React.FC = () => {
  const [username, setUsername] = useState('JohnWick')
  const [isSubmitting, setSubmitting] = useState(false)
  const dispatch = useDispatch()
  const nav = useNavigate()

  const metmask = useMetamaskExtension()
  const isExtensionConnected = !!metmask.getProvider()

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault()
    if (username.length === 0) {
      return
    }
    try {
      setSubmitting(true)
      const tokens = await APIService.auth.signUpWithMetamask(username)
      dispatch(setAuthTokens(tokens))
      nav('/profile')
    }
    finally {
      setSubmitting(false)
    }
  }, [username, dispatch, nav])

  return (
    <Layout title={'Sign up'}>
      <UIColumn mt={64} align={'center'}>
        <UIColumn as={'form'} align={'center'} onSubmit={handleSubmit}>
          <UIColumn w={380}>
            <UIBlock mb={16}>
              <UIInput
                placeholder={'Enter your nickname'}
                rows={6}
                value={username}
                onChangeValue={setUsername}
              />
            </UIBlock>
            <UIBlock>
              {isExtensionConnected ?
                <UIButton variant={'contained'} fullWidth type={'submit'} disabled={isSubmitting}>
                  Sign up with metamask
                </UIButton>
                : <UIButton variant={'contained'} fullWidth type={'submit'} disabled>
                  Metamask extension is not found
                </UIButton>
              }

            </UIBlock>
          </UIColumn>
        </UIColumn>
        <UIBlock textAlign={'center'} my={32}>
          or
        </UIBlock>
        <AppLink href={'/sign-in'}>
          Sign in
        </AppLink>
      </UIColumn>
    </Layout>
  )
}
