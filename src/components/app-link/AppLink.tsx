import React from 'react'
import styled, { css } from 'styled-components'
import { BrandColors, UIBackgroundColors } from 'components/UIColors'
import { Link } from 'react-router-dom'

type AppLinkOwnProps = {
  href: string,
  colorless?: boolean,
  highlightOnHover?: boolean,
  replace?: boolean,
}


type LinkProps = {
  $colorless?: boolean,
  $hoverGray?: boolean,
}

const CommonLink = styled.a<LinkProps>`
  color: ${props => props.$colorless ? 'inherit' : BrandColors['100']};
  font-weight: 500;
  cursor: pointer;
  position: relative;
  z-index: 1;

  &:hover {
    color: ${BrandColors['100']};
  }

  ${props => props.$hoverGray ? css`
    @media (min-width: 768px) {
      &:hover {
        cursor: pointer;
        color: ${BrandColors['100']};

        &:after {
          position: absolute;
          content: '';
          left: -3px;
          right: -3px;
          top: -2px;
          bottom: -2px;
          border-radius: 2px;
          z-index: -1;
          background-color: ${UIBackgroundColors.gray4};
        }
      }
    }
  ` : undefined}
`

const RouteLink = styled(Link)<LinkProps>`
  color: ${props => props.$colorless ? 'inherit' : BrandColors['100']};
  font-weight: 500;
  cursor: pointer;
  position: relative;
  z-index: 1;

  &:hover {
    color: ${BrandColors['100']};
  }

  ${props => props.$hoverGray ? css`
    @media (min-width: 768px) {
      &:hover {
        cursor: pointer;
        color: ${BrandColors['100']};

        &:after {
          position: absolute;
          content: '';
          left: -3px;
          right: -3px;
          top: -2px;
          bottom: -2px;
          border-radius: 2px;
          z-index: -1;
          background-color: ${UIBackgroundColors.gray4};
        }
      }
    }
  ` : undefined}
`

type AppLinkProps = AppLinkOwnProps & Omit<React.HTMLProps<HTMLAnchorElement>, 'as' | 'ref'>

export function AppLink(props: AppLinkProps) {

  const { href, colorless, highlightOnHover, ...rest } = props
  const url = new URL(href, window.location.origin)
  const hasExtension = url.pathname && url.pathname.indexOf('.') !== -1
  const httpProtocol = url.protocol === 'http:' || url.protocol === 'https:'

  if (!httpProtocol) {
    return <CommonLink $colorless={colorless} $hoverGray={highlightOnHover} href={href} {...rest} />
  }
  if (rest.download || hasExtension || (url.hostname && url.hostname !== window.location.hostname)) {
    return <CommonLink
      $colorless={colorless}
      $hoverGray={highlightOnHover}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      {...rest}
    />
  }
  return <RouteLink
    $colorless={colorless}
    $hoverGray={highlightOnHover}
    to={url.href.replace(url.origin, '')}
    {...rest}
  />
}
