type FontVariant = "300" | "regular" | "400" | "500" | "600" | "700" | "800"

type FontFile = Record<FontVariant, string>

export interface IFontFamily {
  id: string
  family: string
  variants: FontVariant[]
  files: FontFile[]
  subsets: string[]
  version: string
  lastModified: string
  category: string
  kind: string
}

export interface TextOptions {
  underline: boolean
  textAlign: string
  fontSize: number
  fill: string
  charSpacing: number
  lineHeight: number
  fontFamily: string
  isGroup: boolean
  isMultiple: boolean
  styles: any[]
  font: any
  activeStyle: any
}
