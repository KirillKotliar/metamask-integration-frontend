import React from 'react'
import styled from 'styled-components'

const LayoutContainer = styled.div`
`

const LayoutHeader = styled.div`
  position: relative;
`

const LayoutTitle = styled.div`
  font-weight: bold;
  font-size: 32px;
  line-height: 1.5em;
  margin-top: 16px;
  text-align: center;
  padding-top: 100px;
`

const LayoutBody = styled.div`
  position: relative;
`

type LayoutAuthProps = {
  children?: React.ReactNode,
  title: string,
}

export const Layout: React.FC<LayoutAuthProps> = (props) => {
  const { children, title } = props

  return (
    <LayoutContainer>
      <LayoutHeader>
        <LayoutTitle>
          {title}
        </LayoutTitle>
      </LayoutHeader>
      <LayoutBody>
        {children}
      </LayoutBody>
    </LayoutContainer>
  )
}
