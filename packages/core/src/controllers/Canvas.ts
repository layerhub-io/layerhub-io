import { CanvasOptions, ControllerOptions, Dimension } from "../common/interfaces"
import Base from "./Base"
import { fabric } from "fabric"

class Canvas extends Base {
  public options: CanvasOptions
  constructor(props: ControllerOptions) {
    super(props)
    this.options = {
      width: props.canvas.width as number,
      height: props.canvas.height as number,
    }
  }

  public getBoundingClientRect() {
    const canvasEl = document.getElementById("canvas")
    const position = {
      left: canvasEl?.getBoundingClientRect().left,
      top: canvasEl?.getBoundingClientRect().top,
    }
    return position
  }

  public resize({ width, height }: Dimension) {
    this.canvas.setWidth(width).setHeight(height)
    this.canvas.renderAll()
    const diffWidth = width / 2 - this.options.width / 2
    const diffHeight = height / 2 - this.options.height / 2

    this.options.width = width
    this.options.height = height

    const deltaPoint = new fabric.Point(diffWidth, diffHeight)
    this.canvas.relativePan(deltaPoint)
  }
  public requestRenderAll() {
    this.canvas.requestRenderAll()
  }
}

export default Canvas
