import styled, { css } from 'styled-components'
import { device, fontSizes, fontWeight, palette } from 'styles/style-constants'
import { BrandColors, UIBackgroundColors, UIBorderColors, UIShadowColors } from 'components/UIColors'

type DimensionsProps = {
  readonly w?: number | string,
  readonly h?: number | string,
  readonly m?: number | string,
  readonly mx?: number | string,
  readonly my?: number | string,
  readonly mt?: number | string,
  readonly mb?: number | string,
  readonly ml?: number | string,
  readonly mr?: number | string,
  readonly p?: number | string,
  readonly px?: number | string,
  readonly py?: number | string,
  readonly pt?: number | string,
  readonly pb?: number | string,
  readonly pl?: number | string,
  readonly pr?: number | string,
  readonly mbLast?: number | string,
  readonly mtFirst?: number | string,
  readonly flexBasis?: number | string,
  readonly flexGrow?: number | boolean | string,
  readonly flexShrink?: number | boolean | string,
  readonly alignSelf?: 'flex-start' | 'flex-end' | 'center' | 'baseline',
  readonly maxWidth?: number | string,

  readonly mobileW?: number | string,
  readonly mobileH?: number | string,
  readonly mobileM?: number | string,
  readonly mobileMx?: number | string,
  readonly mobileMy?: number | string,
  readonly mobileMt?: number | string,
  readonly mobileMb?: number | string,
  readonly mobileMl?: number | string,
  readonly mobileMr?: number | string,
  readonly mobileP?: number | string,
  readonly mobilePx?: number | string,
  readonly mobilePy?: number | string,
  readonly mobilePt?: number | string,
  readonly mobilePb?: number | string,
  readonly mobilePl?: number | string,
  readonly mobilePr?: number | string,
  readonly mobileFlexBasis?: number | string,
  readonly mobileFlexGrow?: number | boolean | string,
  readonly mobileFlexShrink?: number | boolean | string,
  readonly mobileAlignSelf?: 'flex-start' | 'flex-end' | 'center' | 'baseline',
  readonly mobileHide?: boolean,
}

type FontProps = {
  readonly textSize?: 'small' | 'normal' | 'big' | number,
  readonly textWeight?: 'normal' | 'medium' | 'bold' | 'semi-bold',
  readonly textColor?: 'default' | 'link' | 'error' | 'secondary' | 'green' | 'theme' | string,
  readonly textAlign?: 'left' | 'right' | 'center',
  readonly uppercase?: boolean,
  readonly lowercase?: boolean,
  readonly lineHeight?: number | string,
  readonly ellipsis?: boolean,
  readonly breakWords?: boolean,
  readonly disabled?: boolean,
  readonly textWrap?: boolean | string,
  readonly whiteSpace?: 'inherit' | 'normal' | 'nowrap' | 'pre' | 'pre-wrap' | 'pre-line' | 'break-space',
  readonly clickable?: boolean,

  readonly mobileTextSize?: 'small' | 'normal' | 'big' | number,
  readonly mobileTextWeight?: 'normal' | 'medium' | 'bold',
  readonly mobileTextColor?: 'default' | 'link' | 'error' | 'secondary' | 'green' | string,
  readonly mobileTextAlign?: 'left' | 'right' | 'center',
  readonly mobileUppercase?: boolean,
  readonly mobileLowercase?: boolean,
  readonly mobileLineHeight?: number | string,
  readonly mobileEllipsis?: boolean,
  readonly mobileTextWrap?: boolean | string,
}

type FlexProps = {
  readonly align?: 'flex-start' | 'flex-end' | 'center' | 'baseline',
  readonly alignContent?: 'flex-start' | 'flex-end' | 'center' | 'baseline',
  readonly justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly',
  readonly flexWrap?: 'wrap' | 'nowrap' | 'wrap-reverse',
  readonly direction?: 'row' | 'column',
  readonly gapY?: number | string,
  readonly gapX?: number | string,
  readonly gap?: number | string,

  readonly mobileAlign?: 'flex-start' | 'flex-end' | 'center' | 'baseline',
  readonly mobileJustify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly',
  readonly mobileAlignContent?: 'flex-start' | 'flex-end' | 'center' | 'baseline',
  readonly mobileFlexWrap?: 'wrap' | 'nowrap' | 'wrap-reverse',
  readonly mobileDirection?: 'row' | 'column',
  readonly mobileGapY?: number | string,
  readonly mobileGapX?: number | string,
  readonly mobileGap?: number | string,
}

type PositionProps = {
  readonly position?: 'absolute' | 'relative' | 'fixed' | 'sticky',
}

type BorderProps = {
  readonly elevation?: boolean,
  readonly border?: 'standart', // TODO: define border presets
  readonly borderRadius?: number | 'standart',

  readonly mobileElevation?: boolean,
  readonly mobileBorder?: 'standart', // TODO: define border presets
  readonly mobileBorderRadius?: number | 'standart',
}

type FillProps = {
  readonly fill?: boolean | string,

  readonly mobileFill?: boolean | string,
}

const sizes: Record<string, number> = {
  small: fontSizes.small,
  normal: fontSizes.normal,
  big: fontSizes.big,
}

const weights: Record<string, string> = {
  normal: fontWeight.regular,
  medium: fontWeight.medium,
  'semi-bold': fontWeight['semi bold'],
  bold: fontWeight.bold,
}

const colors: Record<string, string> = {
  default: palette.text,
  link: BrandColors.dark,
  error: palette.error,
  warn: palette.warn,
  secondary: palette.gray,
  green: palette.green,
  greenDark: palette.greenDark,
}

const borderPresets = {
  standart: `1px solid ${UIBorderColors.base}`,
}

const makePx = (item: number | string | undefined): (string | undefined) => {
  if (typeof item === 'undefined' || typeof item === 'string') {
    return item
  }
  if (item === 0) {
    return '0'
  }
  return `${item}px`
}

const makeBorderRadius = (item: BorderProps['borderRadius']) => {
  if (item === 'standart') {
    return makePx(4)
  }
  return makePx(item)
}

const mergeOffsets = (x?: number | string, y?: number | string, all?: number | string): (string | undefined) => {
  if (typeof x === 'undefined' && typeof y === 'undefined' && typeof all === 'undefined') {
    return undefined
  }
  return `${makePx(y ?? all ?? 0)} ${makePx(x ?? all ?? 0)}`
}

const resolveBorder = (item: BorderProps['border']) => {
  return (item && borderPresets[item]) ? borderPresets[item] : item
}

const resolveColor = (color: string, themeColor: string) => {
  if (color === 'theme') {
    return themeColor
  }
  return colors[color] ? colors[color] : color
}

const resolveTextSize = (size: number | string | undefined) => {
  if (typeof size === 'undefined') {
    return size
  }
  if (typeof size === 'number') {
    return makePx(size)
  }
  if (sizes[size]) {
    return makePx(sizes[size])
  }
  return size
}

const resolveFill = (fill: FillProps['fill']) => {
  if (typeof fill === 'boolean') {
    return fill ? UIBackgroundColors.base : 'transparent'
  }
  return fill
}

const resolveTextWrap = (wrap: FontProps['textWrap']) => {
  if (typeof wrap === 'boolean') {
    return wrap ? 'normal' : 'nowrap'
  }
  return wrap
}

const fill = css<FillProps>`
  background-color: ${props => resolveFill(props.fill)};
  @media (${device.tablet}) {
    background-color: ${props => resolveFill(props.mobileFill)};
  }
`

const borders = css<BorderProps>`
  box-shadow: ${props => props.elevation ? `0px 8px 12px ${UIShadowColors.elevation}` : undefined};
  border-radius: ${props => makeBorderRadius(props.borderRadius)};
  border: ${props => props.border ? resolveBorder(props.border) : undefined};

  @media (${device.tablet}) {
    box-shadow: ${props => props.mobileElevation ? `0px 8px 12px ${UIShadowColors.elevation}` : undefined};
    border-radius: ${props => makeBorderRadius(props.mobileBorderRadius)};
    border: ${props => props.mobileBorder ? resolveBorder(props.mobileBorder) : undefined};
  }
`

const dimensions = css<DimensionsProps>`
  width: ${props => makePx(props.w)};
  height: ${props => makePx(props.h)};

  max-width: ${props => makePx(props.maxWidth)};

  margin: ${props => mergeOffsets(props.mx, props.my, props.m)};
  margin-top: ${props => makePx(props.mt)};
  margin-bottom: ${props => makePx(props.mb)};
  margin-left: ${props => makePx(props.ml)};
  margin-right: ${props => makePx(props.mr)};

  padding: ${props => mergeOffsets(props.px, props.py, props.p)};
  padding-top: ${props => makePx(props.pt)};
  padding-bottom: ${props => makePx(props.pb)};
  padding-left: ${props => makePx(props.pl)};
  padding-right: ${props => makePx(props.pr)};

  flex-basis: ${props => makePx(props.flexBasis)};
  flex-grow: ${props => (props.flexGrow !== undefined ? Number(props.flexGrow) : undefined)};
  flex-shrink: ${props => (props.flexShrink !== undefined ? Number(props.flexShrink) : undefined)};
  align-self: ${props => props.alignSelf};

  &:last-child {
    margin-bottom: ${props => makePx(props.mbLast)};
  }

  &:first-child {
    margin-top: ${props => makePx(props.mtFirst)};
  }

  @media (${device.tablet}) {
    display: ${props => props.mobileHide ? 'none' : undefined};

    width: ${props => makePx(props.mobileW)};
    height: ${props => makePx(props.mobileH)};

    margin: ${props => mergeOffsets(props.mobileMx, props.mobileMy, props.mobileM)};
    margin-top: ${props => makePx(props.mobileMt)};
    margin-bottom: ${props => makePx(props.mobileMb)};
    margin-left: ${props => makePx(props.mobileMl)};
    margin-right: ${props => makePx(props.mobileMr)};

    padding: ${props => mergeOffsets(props.mobilePx, props.mobilePy, props.mobileP)};
    padding-top: ${props => makePx(props.mobilePt)};
    padding-bottom: ${props => makePx(props.mobilePb)};
    padding-left: ${props => makePx(props.mobilePl)};
    padding-right: ${props => makePx(props.mobilePr)};

    flex-basis: ${props => makePx(props.mobileFlexBasis)};
    flex-grow: ${props => (props.mobileFlexGrow !== undefined ? Number(props.mobileFlexGrow) : undefined)};
    flex-shrink: ${props => (props.mobileFlexShrink !== undefined ? Number(props.mobileFlexShrink) : undefined)};
    align-self: ${props => props.mobileAlignSelf};
  }
`

const flex = css<FlexProps>`
  flex-direction: ${props => props.direction ? props.direction : undefined};
  align-items: ${props => props.align};
  align-content: ${props => props.alignContent};
  justify-content: ${props => props.justify};
  flex-wrap: ${props => props.flexWrap};
  margin-left: ${props => props.gapX !== undefined ? makePx(-(props.gapX)) : undefined};
  margin-top: ${props => props.gapY !== undefined ? makePx(-(props.gapY)) : undefined};

  & > * {
    margin-top: ${props => props.gapY !== undefined ? makePx(props.gapY) : undefined};
    margin-left: ${props => props.gapX !== undefined ? makePx(props.gapX) : undefined};
  }

  @media (${device.tablet}) {
    flex-direction: ${props => props.mobileDirection ? props.mobileDirection : undefined};
    align-items: ${props => props.mobileAlign};
    align-content: ${props => props.mobileAlignContent};
    justify-content: ${props => props.mobileJustify};
    flex-wrap: ${props => props.mobileFlexWrap};
    margin-left: ${props => props.mobileGapX !== undefined ? makePx(-(props.mobileGapX)) : undefined};
    margin-top: ${props => props.mobileGapY !== undefined ? makePx(-(props.mobileGapY)) : undefined};
    & > * {
      margin-top: ${props => props.mobileGapY !== undefined ? makePx(props.mobileGapY) : undefined};
      margin-left: ${props => props.mobileGapX !== undefined ? makePx(props.mobileGapX) : undefined};
    }
  }
`

const font = css<FontProps>`
  font-size: ${props => resolveTextSize(props.textSize)};
  font-weight: ${props => (props.textWeight ? weights[props.textWeight] : undefined)};
  color: ${props => (props.textColor ? (resolveColor(props.textColor, BrandColors['100'])) : undefined)};
  text-align: ${props => props.textAlign};
  text-transform: ${props => props.uppercase ? 'uppercase' : undefined};
  text-transform: ${props => props.lowercase ? 'lowercase' : undefined};
  line-height: ${props => makePx(props.lineHeight)};
  white-space: ${props => props.ellipsis ? 'nowrap' : resolveTextWrap(props.textWrap)};
  text-overflow: ${props => props.ellipsis ? 'ellipsis' : undefined};
  overflow: ${props => props.ellipsis ? 'hidden' : undefined};
  word-break: ${props => props.breakWords ? 'break-word' : undefined};
  white-space: ${props => props.whiteSpace ?? undefined};

  & > a {
    text-decoration: none;
  }

  @media (${device.tablet}) {
    font-size: ${props => resolveTextSize(props.mobileTextSize)};
    font-weight: ${props => (props.mobileTextWeight ? weights[props.mobileTextWeight] : undefined)};
    color: ${props => (props.mobileTextColor ? (resolveColor(props.mobileTextColor, BrandColors['100'])) : undefined)};
    text-align: ${props => props.mobileTextAlign};
    text-transform: ${props => props.mobileUppercase ? 'uppercase' : undefined};
    text-transform: ${props => props.mobileLowercase ? 'lowercase' : undefined};
    line-height: ${props => makePx(props.mobileLineHeight)};
    white-space: ${props => props.mobileEllipsis ? 'nowrap' : resolveTextWrap(props.textWrap)};
    text-overflow: ${props => props.mobileEllipsis ? 'ellipsis' : undefined};
    overflow: ${props => props.mobileEllipsis ? 'hidden' : undefined};
  }
`

const clickable = css<{ onClick?: (...args: any[]) => void, disabled?: boolean, clickable?: boolean }>`
  cursor: ${props => ((props.onClick || props.clickable) && !props.disabled ? 'pointer' : undefined)};
`

const position = css<PositionProps>`
  position: ${props => props.position};
`

export type UIBlockProps = DimensionsProps & FontProps & PositionProps & BorderProps & FillProps

const excludedProps: Array<string | number> = ['fill', 'elevation', 'size']

const propsFilter = {
  shouldForwardProp: (prop: string | number, defaultValidatorFn: (prop: string | number) => boolean) => {
    return defaultValidatorFn(prop) && !excludedProps.includes(prop)
  },
}

export const UIBlock = styled.div.withConfig(propsFilter)<UIBlockProps>`
  display: block;
  line-height: 1.2em;
  ${dimensions}
  ${font}
  ${clickable}
  ${position}
  ${borders}
  ${fill}
`

export type UITextProps = DimensionsProps & FontProps

export const UIText = styled.span.withConfig(propsFilter)<UITextProps>`
  display: inline;
  line-height: 1.2em;
  ${dimensions}
  ${font}
  ${clickable}
`

export type UIFlexProps = DimensionsProps & FlexProps & FontProps & BorderProps & FillProps & PositionProps

export const UIFlex = styled.div.withConfig(propsFilter)<UIFlexProps>`
  display: flex;
  line-height: 1.2em;
  ${flex}
  ${dimensions}
  ${font}
  ${clickable}
  ${borders}
  ${fill}
`

export const UIRow = styled.div.withConfig(propsFilter)<UIFlexProps>`
  display: flex;
  flex-direction: row;
  line-height: 1.2em;
  ${flex}
  ${dimensions}
  ${font}
  ${clickable}
  ${position}
  ${borders}
  ${fill}
`

export const UIColumn = styled.div.withConfig(propsFilter)<UIFlexProps>`
  display: flex;
  flex-direction: column;
  ${flex}
  ${dimensions}
  ${font}
  ${clickable}
  ${borders}
  ${fill}
`
