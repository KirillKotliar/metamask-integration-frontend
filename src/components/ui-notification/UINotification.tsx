import React, { ComponentType } from 'react'
import { ReactComponent as ErrorIcon } from 'icons/notifications/notification-error.svg'
import { ReactComponent as InfoIcon } from 'icons/notifications/notification-info.svg'
import { ReactComponent as SuccessIcon } from 'icons/notifications/notification-success.svg'
import { ReactComponent as WarningIcon } from 'icons/notifications/notification-warning.svg'
import { ReactComponent as CloseIcon } from 'icons/notifications/notification-close.svg'
import styled from 'styled-components'
import { NotificationProps, NotificationVariant } from './UINotificationContext'
import { UIColumn } from '../ui-blocks'
import { UIIcon } from 'components/UIIcon'
import { UIColors, UIStateColors } from 'components/UIColors'
import { device } from 'styles/style-constants'

export const UINotificationContainer = styled.div`
  position: relative;
  max-width: 392px;
  min-width: 240px;
  background: #fff;
  padding: 16px 48px 16px 24px;
  border-radius: 5px;
  box-shadow: 0 8px 12px 0 rgba(10, 6, 6, 0.1);
  margin-bottom: 16px;
  display: flex;

  @media (${device.mobileXL}) {
    width: 100%;
    max-width: 100%;
  }

`

export const UINotificationTitle = styled.div`
  white-space: pre-wrap;
  width: 100%;
  font-weight: 500;
  font-size: 13px;
  line-height: 16px;
  padding-top: 8px;
`

export const UINotificationMessage = styled.div`
  font-size: 13px;
  line-height: 16px;
  margin-top: 16px;
  margin-bottom: 8px;
`

export const UINotificationCloseIconWrapper = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 14px;
  height: 14px;
  cursor: pointer;
  opacity: .4;
  transition: opacity .15s linear;

  &:hover {
    opacity: 1;
  }

  &:focus {
    opacity: 1;
  }
`

type IconsHashType = {
  [key in NotificationVariant]: ComponentType
}

const iconsHash: IconsHashType = {
  success: SuccessIcon,
  error: ErrorIcon,
  info: InfoIcon,
  warning: WarningIcon,
}

type IconsColorType = {
  [key in NotificationVariant]: string
}

const iconsHashColor: IconsColorType = {
  success: UIStateColors.success,
  error: UIStateColors.error,
  warning: UIStateColors.warn,
  info: UIColors.black500,
}

export const UINotification: React.FC<NotificationProps> = (props) => {
  const {
    id,
    variant,
    message,
    description,
    onClose,
  } = props

  return (
    <UINotificationContainer key={id}>
      <UIIcon icon={iconsHash[variant]} fill={iconsHashColor[variant]} />
      <UIColumn ml={16}>
        <UINotificationTitle>{message}</UINotificationTitle>
        {description && <UINotificationMessage>{description}</UINotificationMessage>}
      </UIColumn>
      <UINotificationCloseIconWrapper>
        <CloseIcon onClick={() => onClose?.(id!)} />
      </UINotificationCloseIconWrapper>
    </UINotificationContainer>
  )
}
