/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react'
import { useInterval } from 'src/hooks/useInterval'
import { getRandom } from 'src/utils/getRandom'

const DEFAULT_DURATION = 5000

export type NotificationVariant = 'success' | 'info' | 'error' | 'warning'
export type NotificationContent = string | ReactNode

export type NotificationProps = {
  variant: NotificationVariant,
  id?: number | string,
  message?: NotificationContent,
  description?: NotificationContent,
  duration?: number | null,
  timestamp?: number,
  isLeaving?: boolean,
  onClose?: (id: number | string) => void,
}

export type AddNotificationProps = Omit<NotificationProps, 'variant'>

const notificationApi = {
  notifications: [] as NotificationProps[],
  addNotification: (
    variant: NotificationVariant,
    notification: AddNotificationProps | string,
  ): void => undefined,
  setNotification: (
    variant: NotificationVariant,
    notification: AddNotificationProps | string,
  ): void => undefined,
  clearNotification: (id: number | string): void => undefined,
  clearAllNotifications: (): void => undefined,
}

export type NotificationsContextValue = typeof notificationApi

export let notificationsProviderData: typeof notificationApi

export const NotificationsContext = createContext<NotificationsContextValue>(notificationApi)

export const NotificationsProvider = ({ children }: { children?: React.ReactNode }) => {
  const [notifications, setNotifications] = useState<NotificationProps[]>(
    notificationApi.notifications,
  )

  const addNotification = useCallback(
    (variant: NotificationVariant, notification: AddNotificationProps | string) => {
      if (typeof notification !== 'string') {
        const newtNotifications = notifications.concat({
          variant,
          id: notification.id ?? getRandom(),
          timestamp: new Date().getTime(),
          isLeaving: false,
          ...notification,
        } as NotificationProps)
        setNotifications(newtNotifications)
      } else {
        const newtNotifications = notifications.concat({
          variant,
          message: notification,
          id: getRandom(),
          timestamp: new Date().getTime(),
          isLeaving: false,
        } as NotificationProps)
        setNotifications(newtNotifications)
      }
    }, [notifications],
  )

  const setNotification = useCallback(
    (variant: NotificationVariant, notification: AddNotificationProps | string) => {
      if (typeof notification !== 'string') {
        setNotifications([{
          variant,
          id: notification.id ?? getRandom(),
          timestamp: new Date().getTime(),
          isLeaving: false,
          ...notification,
        }])
      } else {
        setNotifications([{
          variant,
          message: notification,
          id: getRandom(),
          timestamp: new Date().getTime(),
          isLeaving: false,
        }])
      }
    }, [],
  )

  const clearNotification = useCallback((id: number | string) => {
    setNotifications(ns => ns.filter(notice => notice.id !== id))
  }, [setNotifications])

  const clearAllNotifications = useCallback(() => {
    setNotifications([])
  }, [])

  const handleExpireNotifications = useCallback((currentTime: number) => {
    if (notifications.length) {
      const newNotifications = notifications.map((n) => {
        const isExpired = n.timestamp! <= currentTime - (n.duration! * 1000 || DEFAULT_DURATION)
        return isExpired ? { ...n, isLeaving: true } : n
      })
      if (newNotifications.length) {
        for (const notification of newNotifications) {
          if (notification.isLeaving) {
            setNotifications(newNotifications)
          }
        }
      }
    }
  }, [notifications])

  useInterval(handleExpireNotifications, 1000)

  const providerData = useMemo(() => ({
    notifications,
    addNotification,
    setNotification,
    clearNotification,
    clearAllNotifications,
  }), [notifications, addNotification, setNotification, clearNotification, clearAllNotifications])

  notificationsProviderData = providerData

  return (
    <NotificationsContext.Provider value={providerData}>
      {children}
    </NotificationsContext.Provider>
  )
}

export const useNotification = () => useContext(NotificationsContext)
