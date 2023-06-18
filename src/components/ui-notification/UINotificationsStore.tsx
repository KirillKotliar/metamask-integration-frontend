import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import { useNotification } from './UINotificationContext'
import { UINotification } from 'components/ui-notification/UINotification'
import { UIColumn } from '../ui-blocks'
import { UITransition, UITransitionPresets } from '../UITransition'
import { device } from 'styles/style-constants'


const NotificationPortal: React.FC<{children: React.ReactNode }> = ({ children }) => {
  const modalNotification = document.getElementById('notification')
  return ReactDOM.createPortal(
    children,
    modalNotification as Element,
  )
}

export const UINotificationsContainer = styled(UIColumn)`
  position: fixed;
  top: 32px;
  right: 32px;
  z-index: 10000;

  @media (${device.mobileXL}) {
    top: 0;
    right: 0;
  }
`

export const UINotificationStore: React.FC = () => {
  const { notifications, clearNotification } = useNotification()

  if (!notifications.length) {
    return null
  }

  return (
    <NotificationPortal>
      <UINotificationsContainer>
        {notifications.map((props) => (
          <UITransition
            animateOnMount
            key={props.id}
            active={!props.isLeaving}
            transition={UITransitionPresets.SlideLeft}
            onLeft={() => clearNotification(props.id!)}
          >
            <UINotification key={props.id} onClose={clearNotification} {...props} />
          </UITransition>
        ))}
      </UINotificationsContainer>
    </NotificationPortal>
  )
}
