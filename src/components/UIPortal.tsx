import React from 'react'
import ReactDOM from 'react-dom'

export const UIPortalContext = React.createContext('root')

type UIPortalPropviderProps = {
  id: string,
  children?: React.ReactNode,
}

export const UIPortalProvider: React.FC<UIPortalPropviderProps> = (props) => {

  const { id, children } = props

  return (
    <UIPortalContext.Provider value={id}>
      {children}
    </UIPortalContext.Provider>
  )

}

type UIPortalProps = {
  id: string,
  disabled?: boolean,
  children?: React.ReactNode,
}

export const UIPortal: React.FC<UIPortalProps> = (props) => {
  const { id, disabled, children } = props

  if (disabled) {
    return <>{children}</>
  }

  return ReactDOM.createPortal(
    children,
    document.getElementById(id)!,
  )
}
