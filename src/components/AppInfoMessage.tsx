import React from 'react'
import styled from 'styled-components'
import { UIRow } from './ui-blocks'
import { ReactComponent as IconWarn } from 'icons/warning-24.svg'
import { ReactComponent as IconInfo } from 'icons/notifications/notification-info.svg'
import { ReactComponent as IconCheck } from 'icons/check-24.svg'
import { UIIcon } from './UIIcon'
import { UITextColors } from './UIColors'

const IconContainer = styled.div`
  @media (max-width: 767px) {
    display: none;
  }
`

const Content = styled(UIRow).attrs({
  align: 'center',
  ml: 8,
})`
  @media (max-width: 767px) {
    margin-left: 0;
  }
`

type AppInfoMessageProps = {
  type: 'done' | 'info' | 'warn',
  message?: string | React.ReactNode,
  children?: React.ReactNode,
}

export const AppInfoMessage: React.FC<AppInfoMessageProps> = (props) => {
  const { type, children } = props
  return (
    <UIRow align={'center'}>
      <IconContainer>
        {type === 'info' && <UIIcon icon={IconInfo} size={32} />}
        {type === 'warn' && <UIIcon icon={IconWarn} size={32} fill={UITextColors.warn} />}
        {type === 'done' && <UIIcon icon={IconCheck} size={32} fill={UITextColors.green} />}
      </IconContainer>
      <Content>{children!}</Content>
    </UIRow>
  )
}
