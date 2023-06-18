import { APIError } from 'api/APIError'
import { notificationsProviderData } from 'src/components/ui-notification/UINotificationContext'

export const showNotificationFromAPIError = (error: APIError): void => {
  const { addNotification } = notificationsProviderData

  addNotification('error', {
    message: error.message,
    duration: 4,
  })
}
