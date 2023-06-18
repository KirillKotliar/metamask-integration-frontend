import React, { FormEvent, useCallback, useState } from 'react'
import { Layout } from 'components/layout/Layout'
import { UIBlock, UIColumn } from 'components/ui-blocks/UiBlocks'
import { UIButton } from 'components/UIButton'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useMetamaskExtension } from 'src/hooks/useMetamaskExtension'
import { APIService } from 'api/APIService'
import { setAuthTokens } from 'store/auth/auth-actions'
import { AppLink } from 'components/app-link/AppLink'

export const SignIn: React.FC = () => {
  const [isSubmitting, setSubmitting] = useState(false)
  const dispatch = useDispatch()
  const nav = useNavigate()

  const metmask = useMetamaskExtension()
  const isExtensionConnected = !!metmask.getProvider()

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault()
    try {
      setSubmitting(true)
      const tokens = await APIService.auth.signInWithMetamask()
      dispatch(setAuthTokens(tokens))
      nav('/profile')
    }
    finally {
      setSubmitting(false)
    }
  }, [dispatch, nav])

  return (
    <Layout title={'Sign in'}>
      <UIColumn mt={64} align={'center'}>
        <UIColumn as={'form'} align={'center'} onSubmit={handleSubmit}>
          <UIColumn w={380}>
            {isExtensionConnected ?
              <UIButton variant={'contained'} fullWidth type={'submit'} disabled={isSubmitting}>
                  Sign in with metamask
              </UIButton>
              : <UIButton variant={'contained'} fullWidth type={'submit'} disabled>
                  Metamask extension is not found
              </UIButton>
            }

          </UIColumn>
        </UIColumn>
        <UIBlock textAlign={'center'} my={32}>
          or
        </UIBlock>
        <UIBlock>
          <AppLink href={'/sign-up'}>
            Sign up
          </AppLink>
        </UIBlock>
      </UIColumn>
    </Layout>
  )
}
