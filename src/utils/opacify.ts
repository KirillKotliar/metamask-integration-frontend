export const hexToRGB = (hexCode: string) => {
  let hex = hexCode.replace('#', '')

  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`
  }

  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)
  return `rgb(${r},${g},${b})`
}

export const RGBToHsl = (rgb: string) => {
  const convertedRgb = rgb.substring(4, rgb.length - 1)
    .replace(/ /g, '')
    .split(',')

  let r = Number(convertedRgb[0])
  let g = Number(convertedRgb[1])
  let b = Number(convertedRgb[2])

  r /= 255
  g /= 255
  b /= 255

  const max = Math.max(r, g, b); const min = Math.min(r, g, b)
  let h = 0
  let s: number
  const l = (max + min) / 2

  if (max === min) {
    h = s = 0
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break
      case g: h = (b - r) / d + 2; break
      case b: h = (r - g) / d + 4; break
    }

    h /= 6
  }

  // s = s * 100
  // s = Math.round(s)
  // l = l * 100
  // l = Math.round(l)
  // h = Math.round(360 * h)
  // return 'hsl(' + h + ', ' + s + '%, ' + l + '%)'

  return [h,s,l]
}

export const RGBToDarkHsl = (rgb: string) => {
  const hsl = RGBToHsl(rgb)

  const h = Math.round(360 * hsl[0])
  let s = hsl[1] * 100
  s = Math.round(s)
  let l = hsl[2] * 100
  l = Math.round(l / 1.5)

  return 'hsl(' + h + ', ' + s + '%, ' + l + '%)'
}

export const opacify = (hexCode: string, opacity = 1) => {
  let hex = hexCode.replace('#', '')

  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`
  }

  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)

  return `rgba(${r},${g},${b},${opacity})`
}

export const opacifyRGB = (rgb: string, opacity = 1) => {
  return rgb
    .replace('rgb', 'rgba')
    .replace(')', `, ${opacity})`)
}
