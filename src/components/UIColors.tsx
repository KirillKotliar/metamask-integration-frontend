import { opacifyRGB } from 'utils/opacify'

export const UIColors = {
  white: 'rgb(255,255,255)',
  black: 'rgb(0,0,0)',

  black500: 'rgb(10,6,6)', // text

  gray50: 'rgb(248,251,250)',
  gray100: 'rgb(246,246,246)',
  gray200: 'rgb(235,239,238)', // #EBEFEE input bg
  gray300: 'rgb(224,224,224)', // #E0E0E0 palette.grayLightest, background.grayLightest
  gray400: 'rgb(209,209,209)', // #D1D1D1 palette.grayLight, background.grayLight
  gray500: 'rgb(196,196,196)', // #C4C4C4
  gray600: 'rgb(141,141,141)', // #8D8D8D, palette.gray, background.gray
  gray700: 'rgb(82,82,82)', // #525252 palette.grayDark

  green50: 'rgb(242,247,245)',
  green100: 'rgb(78, 206, 61)',
  green200: 'rgb(0, 163, 119)',
  green300: 'rgb(0,168,122)', // #00A87A // green
  green400: 'rgb(0,128,90)', // #00805E // greenDark
  green500: 'rgb(10,35,27)',

  yellow50: 'rgb(255,248,230)',
  yellow75: 'rgb(255,242,212)', // #fff2d4
  yellow100: 'rgb(248,183,0)',
  yellow200: 'rgb(222,144,0)', // #DE9000 // warn
  yellow300: 'rgb(168,123,0)',
  yellow400: 'rgb(168,123,0)',
  yellow500: 'rgb(59,48,17)',

  red50: 'rgb(255,229,231)',
  red100: 'rgb(240,34,43)', // #F0222B // error
  red200: 'rgb(186,0,13)',
  red300: 'rgb(157,11,18)',
  red400: 'rgb(72,5,8)',
}

export const UIShadowColors = {
  elevation: opacifyRGB(UIColors.black500, .1),
}

export const UIStateColors = {
  success: UIColors.green300,
  error: UIColors.red100,
  warn: UIColors.yellow100,
}

export const UITextColors = {
  base: UIColors.black500,
  baseContrast: UIColors.white,

  green: UIColors.green300,
  greenDark: UIColors.green400,

  gray: UIColors.gray700,
  grayLight: UIColors.gray600,

  error: UIColors.red100,
  warn: UIColors.yellow200,
}

export const UIBackgroundColors = {
  black: UIColors.black,
  base: UIColors.white,
  gray0: UIColors.gray50,
  gray1: UIColors.gray100,
  gray2: UIColors.gray200,
  gray3: UIColors.gray300,
  gray4: UIColors.gray400,
  errorAccent: UIColors.red100,
  error: UIColors.red50,
  warn: UIColors.yellow50,
  warnAccent: UIColors.yellow100,
  green: UIColors.green50,
  greenAccent: UIColors.green300,
  overlay: opacifyRGB(UIColors.black500, .54),
  lightYellow: UIColors.yellow75,
}

export const UIBorderColors = {
  base: UIColors.black500,
  focus: UIColors.gray200,
  error: UIColors.red100,
  warn: UIColors.yellow200,
  green: UIColors.green300,
}

export const BrandColors = {
  '000': 'var(--brand-color000, rgba(0, 168, 122, 0))',
  '005': 'var(--brand-color005, rgba(0, 168, 122, .05))',
  '010': 'var(--brand-color010, rgba(0, 168, 122, .1))',
  '015': 'var(--brand-color015, rgba(0, 168, 122, .15))',
  '020': 'var(--brand-color020, rgba(0, 168, 122, .2))',
  '025': 'var(--brand-color025, rgba(0, 168, 122, .25))',
  '030': 'var(--brand-color030, rgba(0, 168, 122, .3))',
  '035': 'var(--brand-color035, rgba(0, 168, 122, .35))',
  '040': 'var(--brand-color040, rgba(0, 168, 122, .4))',
  '045': 'var(--brand-color045, rgba(0, 168, 122, .45))',
  '050': 'var(--brand-color050, rgba(0, 168, 122, .5))',
  '055': 'var(--brand-color055, rgba(0, 168, 122, .55))',
  '060': 'var(--brand-color060, rgba(0, 168, 122, .6))',
  '065': 'var(--brand-color065, rgba(0, 168, 122, .65))',
  '070': 'var(--brand-color070, rgba(0, 168, 122, .7))',
  '075': 'var(--brand-color075, rgba(0, 168, 122, .75))',
  '080': 'var(--brand-color080, rgba(0, 168, 122, .8))',
  '085': 'var(--brand-color085, rgba(0, 168, 122, .85))',
  '090': 'var(--brand-color090, rgba(0, 168, 122, .9))',
  '095': 'var(--brand-color095, rgba(0, 168, 122, .95))',
  '100': 'var(--brand-color100, rgba(0, 168, 122, 1))',
  'dark': 'var(--brand-color-dark, rgb(0,128,90))',
}
