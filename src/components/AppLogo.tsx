import React from 'react'
import styled from 'styled-components'
import { ReactComponent as LogoSvg } from 'img/logo.svg'

const Logo = styled.div`
  @media (max-width: 767px) {
    svg {
      width: 80px;
      height: 16px;
    }
  }
`

export const AppLogo: React.FC = () => {
  return (
    <Logo>
      <LogoSvg />
    </Logo>
  )
}
