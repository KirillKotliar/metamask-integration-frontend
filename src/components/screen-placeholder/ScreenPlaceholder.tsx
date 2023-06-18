import styled from 'styled-components'
import { device } from 'styles/style-constants'

export const ScreenPlaceholder = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (${device.mobileXL}) {
    height: var(--app-height);
  }
`
