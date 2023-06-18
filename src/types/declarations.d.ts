// modules
declare module '*.scss' {
  const content: { [className: string]: string }
  export default content
}

declare module '*.pdf' {
  const content: string
  export default content
}

declare module '*.csv' {
  const content: string
  export default content
}

declare module '*.xls' {
  const content: string
  export default content
}

declare module '*.jpg' {
  const content: string
  export default content
}

declare module '*.jpeg' {
  const content: string
  export default content
}

declare module '*.gif' {
  const content: string
  export default content
}

declare module '*.bmp' {
  const content: string
  export default content
}

declare module '*.ttf' {
  const content: string
  export default content
}

declare module '*.woff' {
  const content: string
  export default content
}

declare module '*.png' {
  const content: string
  export default content
}

declare module '*.svg' {
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>

  const src: string
  export default src
}

declare module '*.md' {
  const content: string
  export default content
}
