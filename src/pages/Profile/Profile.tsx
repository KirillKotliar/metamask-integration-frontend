import React from 'react'
import { Layout } from 'components/layout/Layout'
import { UIBlock, UIColumn } from 'components/ui-blocks/UiBlocks'
import { UIButton } from 'components/UIButton'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from 'store/auth/auth-actions'
import { getProfile } from 'store/auth/auth-selectors'
import styled from 'styled-components'

const Field = styled.div`
  font-size: 16px;
  margin-top: 16px;
`

export const ProfilePage: React.FC = () => {
  const profile = useSelector(getProfile)
  const dispatch = useDispatch()
  const nav = useNavigate()

  return (
    <Layout title={'Profile'}>
      <UIColumn mt={48} align={'center'}>
        <UIColumn mb={48}>
          <Field> Username: {profile?.username}</Field>
          <Field> Id: {profile?.id}</Field>
          <Field> Wallet address: {profile?.ethAddress}</Field>
          <Field> Created at: {profile?.createdAt}</Field>
        </UIColumn>
        <UIBlock>
          <UIButton
            variant={'contained'}
            onClick={() => {
              dispatch(logout())
              nav('/sign-in')
            }}
          >
            Logout
          </UIButton>
        </UIBlock>
      </UIColumn>
    </Layout>
  )
}
