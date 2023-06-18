import React from 'react'
import { Provider } from 'react-redux'
import store from 'store'
import { BrowserRouter } from 'react-router-dom'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { NotificationsProvider } from 'components/ui-notification/UINotificationContext'
import { UINotificationStore } from 'components/ui-notification/UINotificationsStore'
import { UIPortalProvider } from 'components/UIPortal'

import '../assets/styles/reset.css'
import '../assets/styles/global.css'
import { App } from 'pages/App'

export const AppContainer: React.FC = React.memo(() => {
  return (
    <HelmetProvider>
      <UIPortalProvider id={'root'}>
        <Provider store={store}>
          <BrowserRouter>
            <Helmet
              defaultTitle="Metamask integration frontend"
            />
            <NotificationsProvider>
              <UINotificationStore />
              <App />
            </NotificationsProvider>
          </BrowserRouter>
        </Provider>
      </UIPortalProvider>
    </HelmetProvider>
  )
})
