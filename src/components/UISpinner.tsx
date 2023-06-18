import React from 'react'
import styled, { keyframes } from 'styled-components'
import { BrandColors } from 'components/UIColors'

const UISpinnerRotate = keyframes`
  to {
    transform: rotate(405deg)
  }
`

const UISpinnerMove = keyframes`
  to {
    opacity: 1
  }
`

const UISpinnerContainer = styled.div`
  position: relative;
  width: 32px;
  height: 32px;
  display: inline-block;
  font-size: 0;
  line-height: 0;
  transform: rotate(45deg);
  animation: ${UISpinnerRotate} 1.2s infinite linear;
`

const UISpinnerDot = styled.i`
  position: absolute;
  background-color: ${BrandColors['100']};
  width: 45%;
  height: 45%;
  transform: scale(.75);
  transform-origin: 50% 50%;
  border-radius: 50%;
  opacity: .3;
  animation: ${UISpinnerMove} 1s infinite linear alternate;

  &:nth-child(1) {
    top: 0;
    left: 0;
    animation-delay: .4s;
  }

  &:nth-child(2) {
    top: 0;
    right: 0;
    animation-delay: .8s;
  }

  &:nth-child(3) {
    bottom: 0;
    right: 0;
    animation-delay: 1.2s;
  }

  &:nth-child(4) {
    bottom: 0;
    left: 0;
  }
`

export type UISpinnerProps = {
  color?: string,
  size?: number,
}

export const UISpinner: React.FC<UISpinnerProps> = React.memo((props) => {
  const { size = 32, color } = props
  return (
    <UISpinnerContainer style={{ width: size, height: size }}>
      <UISpinnerDot style={{ backgroundColor: color }} />
      <UISpinnerDot style={{ backgroundColor: color }} />
      <UISpinnerDot style={{ backgroundColor: color }} />
      <UISpinnerDot style={{ backgroundColor: color }} />
    </UISpinnerContainer>
  )
})
