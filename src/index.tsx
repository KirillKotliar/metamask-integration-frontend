import React from 'react'
import { createRoot } from 'react-dom/client'
import { AppContainer } from 'pages/AppContainer'
import pack from '../package.json'
import { AppConfig } from 'types/common'
declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Window {
    appConfig: AppConfig,
  }
}


const appHeight = () => {
  const doc = document.documentElement
  doc.style.setProperty('--app-height', `${window.innerHeight}px`)
}
window.addEventListener('resize', appHeight)
appHeight()

window.fetch('/app.config.json?t=' + Date.now())
  .then(r => {
    return r.json()
  })
  .then((dynamicAppConfig) => {
    const config = {
      'VERSION': pack.version,
    }
    window.appConfig = Object.assign(dynamicAppConfig, config)
  })
  .catch(() => {
    const configError = document.createElement('div')
    configError.textContent = 'app.config.json is not found or has wrong json format. Please add the correct app.config.json to the dist directory'
    document.getElementById('root')!
      .appendChild(configError)
  })
  .then(() => {
    createRoot(document.getElementById('root')!).render(<AppContainer />)
  })
