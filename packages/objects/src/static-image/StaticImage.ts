// @ts-nocheck
import { fabric } from "fabric"
import { controlPositionIcons } from "./controls"

export enum ControlPositions {
  TOP_LEFT = "tl",
  TOP = "t",
  TOP_RIGHT = "tr",
  RIGHT = "r",
  BOTTOM_RIGHT = "br",
  BOTTOM = "b",
  BOTTOM_LEFT = "bl",
  LEFT = "l",
}

export class StaticImageObject extends fabric.Image {
  static type = "StaticImage"
  public _editingMode = false
  __editingImage = null
  cornerLengthEditing = 5

  /**
   * Color of the corner stroke in editing mode.
   */
  cornerStrokeColorEditing = "black"

  /**
   * Size of the corner stroke in editing mode.
   */
  cornerSizeEditing = 2

  registerEditingEvents(this: fabric.Image) {
    // this.on("mousedblclick", () => {
    //   if (!this._editingMode) {
    //     return this.enterEditingMode()
    //   } else {
    //     this.exitEditingMode()
    //   }
    // })
    // this.on("deselected", () => {
    //   this.exitEditingMode()
    // })
  }

  enterEditingMode(this: fabric.Image) {
    if (this.selectable && this.canvas) {
      this._editingMode = true
      this.clone((image: fabric.Image) => {
        image.clipPath = undefined
        const element = image.getElement()
        const { top = 0, left = 0, cropX = 0, cropY = 0, scaleX = 1, scaleY = 1 } = image
        image.set({
          top: top - cropY * scaleY,
          left: left - cropX * scaleX,
          height: element.height,
          width: element.width,
          cropX: 0,
          cropY: 0,
          opacity: 0.6,
          selectable: true,
          evented: false,
          excludeFromExport: true,
        })
        this.__editingImage = image
        this.canvas!.add(this.__editingImage)
        // this.on('moving', (this.__editingOnMoving = this.__editingOnMoving.bind(this)))
        this.controls = this.__editingControls()
        // this.fire('enter:editing', { target: this })
        this.canvas?.requestRenderAll()
      })
    }
  }

  exitEditingMode(this: fabric.Image) {
    if (this.selectable && this.canvas) {
      this._editingMode = false
      if (this.__editingImage) {
        this.canvas.remove(this.__editingImage)
        this.__editingImage = null
      }
      this.off("moving", this.__editingOnMoving)
      this.controls = fabric.Object.prototype.controls
      this.fire("exit:editing", { target: this })
      this.canvas?.requestRenderAll()
    }
  }
  // @ts-ignore
  __editingControls(this: fabric.Image) {
    const controls = Object.values(ControlPositions)
    return controls.map(this.__createEditingControl.bind(this))
  }

  __createEditingControl(this: fabric.Image, position: ControlPositions) {
    const cursor = position.replace("t", "s").replace("l", "e").replace("b", "n").replace("r", "w")

    return new fabric.Control({
      cursorStyle: cursor + "-resize",
      actionName: `edit_${this.type}`,
      render: controlPositionIcons[position],
      positionHandler: this.__editingControlPositionHandler.bind(this, position),
      actionHandler: this.__editingActionHandlerWrapper(position),
    })
  }

  __editingActionHandlerWrapper(this: fabric.Image, position: ControlPositions) {
    return (_event: MouseEvent, _transform: any, x: number, y: number) => {
      this.__editingSetCrop(position, x, y, true)
      return true
    }
  }
  // @ts-ignore
  __editingOnMoving(this: fabric.Image, event: fabric.IEvent) {
    if (this._editingMode && event.pointer) {
      this.__editingSetCrop(ControlPositions.TOP_LEFT, this.left!, this.top!)
    }
  }

  __editingSetCrop(this: fabric.Image, position: ControlPositions, x: number, y: number, resize: boolean = false) {
    if (this.__editingImage) {
      const { top = 0, left = 0, width = 0, height = 0, scaleX = 1, scaleY = 1 } = this.__editingImage

      if (position.includes("t")) {
        const maxTop = top + height * scaleY - (resize ? 0 : this.getScaledHeight())
        const minTop = Math.min(y, maxTop, this.top! + this.getScaledHeight())
        this.top = Math.max(minTop, top)
        const cropY = Math.min((Math.min(Math.max(y, top), this.top) - top) / scaleY, height)
        if (resize) {
          this.height = Math.max(0, Math.min(this.height! + (this.cropY! - cropY), height))
        }
        this.cropY = cropY
      } else if (position.includes("b") && resize) {
        const minHeight = Math.min((y - top) / scaleY - this.cropY!, height - this.cropY!)
        this.height = Math.max(0, minHeight)
      }
      if (position.includes("l")) {
        const maxLeft = left + width * scaleX - (resize ? 0 : this.getScaledWidth())
        const minLeft = Math.min(x, maxLeft, this.left! + this.getScaledWidth())
        this.left = Math.max(minLeft, left)
        const cropX = Math.min((Math.min(Math.max(x, left), this.left) - left) / scaleX, width)
        if (resize) {
          this.width = Math.max(0, Math.min(this.width! + (this.cropX! - cropX), width))
        }
        this.cropX = cropX
      } else if (position.includes("r") && resize) {
        const minWidth = Math.min((x - left) / scaleX - this.cropX!, width - this.cropX!)
        this.width = Math.max(0, minWidth)
      }
    }
  }

  __editingControlPositionHandler(this: fabric.Image, position: ControlPositions) {
    const xMultiplier = position.includes("l") ? -1 : position.length > 1 || position === "r" ? 1 : 0
    const yMultiplier = position.includes("t") ? -1 : position.length > 1 || position === "b" ? 1 : 0
    const x = (this.width! / 2) * xMultiplier
    const y = (this.height! / 2) * yMultiplier

    return fabric.util.transformPoint(
      new fabric.Point(x, y),
      fabric.util.multiplyTransformMatrices(this.canvas!.viewportTransform!, this.calcTransformMatrix())
    )
  }
  __renderEditingControl(
    this: fabric.Image,
    position: ControlPositions,
    ctx: CanvasRenderingContext2D,
    left: number,
    top: number
  ) {
    ctx.save()
    ctx.strokeStyle = this.cornerStrokeColorEditing
    ctx.lineWidth = this.cornerSizeEditing
    ctx.translate(left, top)
    if (this.angle) {
      ctx.rotate(fabric.util.degreesToRadians(this.angle))
    }
    ctx.beginPath()
    const x = position.includes("l") ? -ctx.lineWidth : position.includes("r") ? ctx.lineWidth : 0
    const y = position.includes("t") ? -ctx.lineWidth : position.includes("b") ? ctx.lineWidth : 0
    if (position === "b" || position === "t") {
      ctx.moveTo(x - this.cornerLengthEditing / 2, y)
      ctx.lineTo(x + this.cornerLengthEditing, y)
    } else if (position === "r" || position === "l") {
      ctx.moveTo(x, y - this.cornerLengthEditing / 2)
      ctx.lineTo(x, y + this.cornerLengthEditing)
    } else {
      if (position.includes("b")) {
        ctx.moveTo(x, y - this.cornerLengthEditing)
      } else if (position.includes("t")) {
        ctx.moveTo(x, y + this.cornerLengthEditing)
      }
      ctx.lineTo(x, y)
      if (position.includes("r")) {
        ctx.lineTo(x - this.cornerLengthEditing, y)
      } else if (position.includes("l")) {
        ctx.lineTo(x + this.cornerLengthEditing, y)
      }
    }
    ctx.stroke()
    ctx.restore()
  }

  //@ts-ignore
  initialize(element, options) {
    // @ts-ignore
    this.registerEditingEvents()
    //@ts-ignore
    super.initialize(element, options)
    return this
  }

  static fromObject(options: any, callback: Function) {
    fabric.util.loadImage(
      options.src,
      function (img) {
        // @ts-ignore
        return callback && callback(new fabric.StaticImage(img, options))
      },
      null,
      // @ts-ignore
      { crossOrigin: "anonymous" }
    )
  }

  toObject(propertiesToInclude = []) {
    return super.toObject(propertiesToInclude)
  }
  toJSON(propertiesToInclude = []) {
    return super.toObject(propertiesToInclude)
  }
}

fabric.StaticImage = fabric.util.createClass(StaticImageObject, {
  type: StaticImageObject.type,
})
fabric.StaticImage.fromObject = StaticImageObject.fromObject

export interface StaticImageOptions extends fabric.IImageOptions {
  id: string
  name?: string
  description?: string
  subtype: string
  src: string
}

declare module "fabric" {
  namespace fabric {
    class StaticImage extends StaticImageObject {
      registerEditingEvents: () => void
      constructor(element: any, options: any)
    }

    interface IUtil {
      isTouchEvent(event: Event): boolean
      getPointer(event: Event, a?: any): Point
    }
    interface Image {
      enterEditingMode(): void
      exitEditingMode(): void
      _editingMode: boolean
      __editingImage: Image | null
      __editingOnMoving: (event: IEvent) => void
      cornerLengthEditing: number
      cornerSizeEditing: number
      cornerStrokeColorEditing: string
      __editingControls(): { [key: string]: Control }
      __editingControlPositionHandler(position: ControlPositions): Point
      __editingSetCrop(position: ControlPositions, x: number, y: number, resize?: boolean): void
      __createEditingControl(position: ControlPositions): Control
      __editingActionHandlerWrapper(position: ControlPositions): Control["actionHandler"]
    }
  }
}
