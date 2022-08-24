import { Dimension, RotationControlPosition } from "./common"

export interface EditorConfig {
  id: string
  clipToFrame: boolean
  scrollLimit: number
  propertiesToInclude?: string[]
  shortcuts?: boolean
  guidelines?: boolean
  shadow: any
  frameMargin: number
  background: string
  size: Dimension
  controlsPosition: ControlsPosition
}

export interface ControlsPosition {
  rotation: RotationControlPosition
}
