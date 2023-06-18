import React from 'react'
import styled, { css } from 'styled-components'
import { opacifyRGB } from 'utils/opacify'
import { BrandColors, UIBackgroundColors, UIBorderColors, UIColors, UITextColors } from 'components/UIColors'
import { device } from 'src/assets/styles/style-constants'

type ButtonVariant = 'contained' | 'outlined' | 'flat' | 'text'

type ButtonColor = 'error' | 'warn' | 'default' | 'secondary'

type ButtonSize = 'small' | 'medium' | 'big'

const UIButtonBlackLayer = styled.div`
  background-color: ${UIBackgroundColors.black};
  opacity: 0;
  z-index: 2;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  transition: border-color .12s ease, color .12s ease, background-color .12s ease, opacity .12s ease;
`

const contained = {
  error: css`
    color: ${UITextColors.baseContrast};
    background-color: ${UIBackgroundColors.errorAccent};
    border-color: ${UIBorderColors.error};
    box-shadow: 0 4px 12px ${opacifyRGB(UIBorderColors.error, .3)};

    &:hover,
    &:focus {
      background-color: ${UIColors.red300};
      border-color: ${UIColors.red300};
    }

    &[data-active="true"],
    &:active {
      background-color: ${UIColors.red400};
      border-color: ${UIColors.red400};
    }
  `,
  warn: css`
    color: ${UITextColors.baseContrast};
    background-color: ${UIBackgroundColors.warnAccent};
    border-color: ${UIBackgroundColors.warnAccent};
    box-shadow: 0 4px 12px ${opacifyRGB(UIBackgroundColors.warnAccent, .3)};

    &:hover,
    &:focus {
      background-color: ${UIColors.yellow400};
      border-color: ${UIColors.yellow400};
    }

    &[data-active="true"],
    &:active {
      background-color: ${UIColors.yellow500};
      border-color: ${UIColors.yellow500};
    }
  `,
  default: css`
    color: ${UITextColors.baseContrast};
    background-color: ${BrandColors['100']};
    border-color: ${BrandColors['100']};
    box-shadow: 0 4px 12px ${BrandColors['030']};

    &:hover,
    &:focus {
      border-color: ${opacifyRGB(UIBackgroundColors.black, .4)};

      ${UIButtonBlackLayer} {
        opacity: .4;
      }
    }

    &[data-active="true"],
    &:active {
      border-color: ${opacifyRGB(UIBackgroundColors.black, .8)};

      ${UIButtonBlackLayer} {
        opacity: .8;
      }
    }
  `,
  secondary: css`
    color: ${UITextColors.base};
    background-color: ${UIColors.gray500};
    border-color: ${UIColors.gray500};
    box-shadow: 0 4px 12px ${opacifyRGB(UIColors.gray500, .3)};

    &:hover,
    &:focus {
      color: ${UITextColors.baseContrast};
      background-color: ${UIColors.gray600};
      border-color: ${UIColors.gray600};
    }

    &[data-active="true"],
    &:active {
      color: ${UITextColors.baseContrast};
      background-color: ${UIColors.gray700};
      border-color: ${UIColors.gray700};
    }
  `,
}

const outlined = {
  error: css`
    color: ${UITextColors.error};
    background-color: ${UIBackgroundColors.base};
    border-color: ${opacifyRGB(UIBorderColors.error, .2)};

    &:hover,
    &:focus {
      border-color: ${UIBorderColors.error};
    }

    &:active {
      color: ${UITextColors.baseContrast};
      background-color: ${UIColors.red400};
      border-color: ${UIColors.red400};
    }
  `,
  warn: css`
    color: ${UITextColors.warn};
    background-color: ${UIBackgroundColors.base};
    border-color: ${opacifyRGB(UIBorderColors.warn, .2)};

    &:hover,
    &:focus {
      border-color: ${UIBorderColors.warn};
    }

    &[data-active="true"],
    &:active {
      color: ${UIBackgroundColors.base};
      background-color: ${UIColors.yellow500};
      border-color: ${UIColors.yellow500};
    }
  `,
  default: css`
    color: ${BrandColors.dark};
    background-color: ${UIBackgroundColors.base};
    border-color: ${BrandColors['020']};

    &:hover,
    &:focus {
      border-color: ${BrandColors['100']};
    }

    &[data-active="true"],
    &:active {
      color: ${UITextColors.baseContrast};
      border-color: ${opacifyRGB(UIBackgroundColors.black, .8)};

      ${UIButtonBlackLayer} {
        opacity: .8;
      }
    }
  `,
  secondary: css`
    color: ${UITextColors.grayLight};
    background-color: ${UIBackgroundColors.base};
    border-color: ${opacifyRGB(UITextColors.grayLight, .2)};

    &:hover,
    &:focus {
      border-color: ${UITextColors.grayLight};
    }

    &[data-active="true"],
    &:active {
      color: ${UITextColors.baseContrast};
      background-color: ${UIColors.gray700};
      border-color: ${UIColors.gray700};
    }
  `,
}

const flat = {
  error: css`
    color: ${UITextColors.error};
    background-color: ${UIBackgroundColors.error};
    border-color: ${UIBackgroundColors.error};

    &:hover,
    &:focus {
      border-color: ${UIBackgroundColors.errorAccent};
    }

    &[data-active="true"],
    &:active {
      color: ${UITextColors.baseContrast};
      background-color: ${UIBackgroundColors.errorAccent};
      border-color: ${UIBackgroundColors.errorAccent};
    }
  `,
  warn: css`
    color: ${UITextColors.warn};
    background-color: ${UIBackgroundColors.warn};
    border-color: ${UIBackgroundColors.warn};

    &:hover,
    &:focus {
      border-color: ${UIBackgroundColors.warnAccent};
    }

    &[data-active="true"],
    &:active {
      color: ${UITextColors.baseContrast};
      background-color: ${UIBackgroundColors.warnAccent};
      border-color: ${UIBackgroundColors.warnAccent};
    }
  `,
  default: css`
    color: ${BrandColors.dark};
    border-color: ${BrandColors['000']};
    background-color: ${BrandColors['010']};

    &:hover,
    &:focus {
      border-color: ${BrandColors['100']};
    }

    &[data-active="true"],
    &:active {
      color: ${UITextColors.baseContrast};
      background-color: ${BrandColors['100']};
      border-color: ${BrandColors['100']};
    }
  `,
  secondary: css`
    color: ${UITextColors.grayLight};
    background-color: ${UIBackgroundColors.gray1};
    border-color: ${UIBackgroundColors.gray1};

    &:hover,
    &:focus {
      border-color: ${UIBackgroundColors.gray4};
    }

    &[data-active="true"],
    &:active {
      color: ${UITextColors.baseContrast};
      background-color: ${UIColors.gray700};
      border-color: ${UIColors.gray700};
    }
  `,
}

const text = {
  error: css`
    color: ${UITextColors.error};
    background-color: transparent;
    border-color: transparent;

    &:hover,
    &:focus {
      background-color: ${UIBackgroundColors.error};
    }

    &[data-active="true"],
    &:active {
      color: ${UITextColors.baseContrast};
      background-color: ${UIColors.red400};
      border-color: ${UIColors.red400};
    }
  `,
  warn: css`
    color: ${UITextColors.warn};
    background-color: transparent;
    border-color: transparent;

    &:hover,
    &:focus {
      background-color: ${UIBackgroundColors.warn};
    }

    &[data-active="true"],
    &:active {
      color: ${UITextColors.baseContrast};
      background-color: ${UIColors.yellow500};
      border-color: ${UIColors.yellow500};
    }
  `,
  default: css`
    color: ${BrandColors.dark};
    background-color: transparent;
    border-color: transparent;

    &:hover,
    &:focus {
      background-color: ${BrandColors['010']};
    }

    &[data-active="true"],
    &:active {
      color: ${UITextColors.baseContrast};
      border-color: ${opacifyRGB(UIBackgroundColors.black, .8)};

      ${UIButtonBlackLayer} {
        opacity: .8;
      }
    }
  `,
  secondary: css`
    color: ${UITextColors.grayLight};
    background-color: transparent;
    border-color: transparent;

    &:hover,
    &:focus {
      background-color: ${UIBackgroundColors.gray1};
    }

    &[data-active="true"],
    &:active {
      color: ${UITextColors.baseContrast};
      background-color: ${UIColors.gray700};
      border-color: ${UIColors.gray700};
    }
  `,
}

const resolveVariantStyles = (props: UIButtonProps) => {
  const color = props.color ?? 'default'
  switch (props.variant) {
    case 'contained':
      return contained[color]
    case 'flat':
      return flat[color]
    case 'text':
      return text[color]
    default:
    case 'outlined':
      return outlined[color]
  }
}

const resolveSizeStyles = (props: UIButtonOwnProps) => {
  switch (props.size) {
    default:
    case 'big':
      return css`
        padding: 0 ${props.icon ? '7px' : ' 16px'};
        height: 48px;
        padding-left: ${props.addonBefore ? '8px' : undefined};
        padding-right: ${props.addonAfter ? '8px' : undefined};
      `
    case 'medium':
      return css`
        padding: 0 ${props.icon ? '0' : ' 8px'};
        height: 32px;
      `
    case 'small':
      return css`
        height: 24px;
        padding: 0 ${props.icon ? '3px' : ' 8px'};

        ${UIButtonInner} {
          font-weight: 700;
        }
      `
  }
}

const alignmentToJustify = (align?: string) => {
  switch (align) {
    case 'left':
      return 'flex-start'
    case 'right':
      return 'flex-end'
  }
  return align
}


// TODO: Move AppIcon into UI prefixes

export const UIButtonBase = styled.button.attrs<UIButtonProps>((props) => ({
  'data-active': props.isActive,
}))<UIButtonProps>`
  display: inline-flex;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: ${props => props.whiteSpace ?? 'nowrap'};
  appearance: none;
  box-sizing: border-box;
  outline: none;
  box-shadow: none;
  transition: border-color .12s ease, color .12s ease, background-color .12s ease, opacity .12s ease;
  border-radius: 2px;
  font-weight: 500;
  border: 1px solid;
  cursor: pointer;
  text-align: ${props => props.alignment ?? 'center'};
  justify-content: ${props => alignmentToJustify(props.alignment) ?? 'center'};
  width: ${props => props.fullWidth ? '100%' : undefined};

  position: relative;

  ${props => props.fullWidthMobile && css`
    @media (${device.tablet}) {
      width: 100%;
    }
  `}

  ${resolveVariantStyles};

  ${resolveSizeStyles};

  &[disabled] {
    background-color: ${props => props.variant !== 'text' ? UIBackgroundColors.gray4 : 'transparent'};
    border-color: ${props => props.variant !== 'text' ? UIBackgroundColors.gray4 : 'transparent'};
    color: ${UITextColors.gray};
    box-shadow: none;
    cursor: default;

    ${UIButtonBlackLayer} {
      background-color: ${props => props.variant !== 'text' ? UIBackgroundColors.gray4 : 'transparent'};
      border-color: ${props => props.variant !== 'text' ? UIBackgroundColors.gray4 : 'transparent'};
      color: ${UITextColors.gray};
      box-shadow: none;
      cursor: default;
    }
  }
`

const UIButtonAddonBefore = styled.div`
  margin-right: 4px;
`
const UIButtonAddonAfter = styled.div`
  margin-left: 4px;
`
const UIButtonInner = styled.div`
  z-index: 5;
  display: flex;
  align-items: center;
`

type UIButtonOwnProps = {
  variant?: ButtonVariant,
  color?: ButtonColor,
  size?: ButtonSize,
  isActive?: boolean,
  fullWidth?: boolean,
  icon?: boolean,
  addonBefore?: React.ReactNode,
  addonAfter?: React.ReactNode,
  type?: 'submit' | 'reset' | 'button',
  alignment?: 'center' | 'left' | 'right',
  fullWidthMobile?: boolean,
  whiteSpace?: 'nowrap' | 'normal',
}

export type UIButtonProps = UIButtonOwnProps & Omit<React.HTMLProps<HTMLButtonElement>, keyof UIButtonOwnProps | 'as'>

export const UIButton = React.forwardRef<HTMLButtonElement, UIButtonProps>((props, ref) => {
  const { children, addonBefore, addonAfter } = props

  return (
    <UIButtonBase {...props} ref={ref}>
      <UIButtonBlackLayer />
      {addonBefore && (
        <UIButtonAddonBefore>{addonBefore}</UIButtonAddonBefore>
      )}
      <UIButtonInner>{children}</UIButtonInner>
      {addonAfter && (
        <UIButtonAddonAfter>{addonAfter}</UIButtonAddonAfter>
      )}
    </UIButtonBase>
  )
})
