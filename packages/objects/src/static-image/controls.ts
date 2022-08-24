// @ts-nocheck
import { fabric } from "fabric"

export function drawCircleIcon(
  ctx: CanvasRenderingContext2D,
  left: number,
  top: number,
  __styleOverride: string[],
  fabricObject: fabric.Object
) {
  ctx.save()
  ctx.translate(left, top)
  ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle!))
  ctx.beginPath()
  ctx.lineCap = "round"
  ctx.lineWidth = 3
  ctx.shadowBlur = 2
  ctx.shadowColor = "black"
  ctx.arc(0, 0, 5.5, 0, 2 * Math.PI)
  ctx.fillStyle = "#ffffff"
  ctx.fill()
  ctx.restore()
}

export function drawTopRightIcon(
  ctx: CanvasRenderingContext2D,
  left: number,
  top: number,
  __styleOverride: string[],
  fabricObject: fabric.Object
) {
  ctx.save()
  ctx.translate(left, top)
  ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle!))
  ctx.beginPath()
  ctx.lineCap = "round"
  ctx.lineWidth = 3
  ctx.shadowBlur = 2
  ctx.shadowColor = "black"
  ctx.moveTo(0, 0)
  ctx.lineTo(0.5, 12)
  ctx.moveTo(0, 0)
  ctx.lineTo(-12, 0)
  ctx.strokeStyle = "#ffffff"
  ctx.stroke()
  ctx.restore()
}

export function drawTopLeftIcon(
  ctx: CanvasRenderingContext2D,
  left: number,
  top: number,
  __styleOverride: string[],
  fabricObject: fabric.Object
) {
  ctx.save()
  ctx.translate(left, top)
  ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle!))
  ctx.beginPath()
  ctx.lineCap = "round"
  ctx.lineWidth = 3
  ctx.shadowBlur = 2
  ctx.shadowColor = "black"
  ctx.moveTo(0, 0)
  ctx.lineTo(0.5, 12)
  ctx.moveTo(0, 0)
  ctx.lineTo(12, 0)
  ctx.strokeStyle = "#ffffff"
  ctx.stroke()
  ctx.restore()
}

export function drawBottomLeftIcon(
  ctx: CanvasRenderingContext2D,
  left: number,
  top: number,
  __styleOverride: string[],
  fabricObject: fabric.Object
) {
  ctx.save()
  ctx.translate(left, top)
  ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle!))
  ctx.beginPath()
  ctx.lineCap = "round"
  ctx.lineWidth = 3
  ctx.shadowBlur = 2
  ctx.shadowColor = "black"
  ctx.moveTo(0, 0)
  ctx.lineTo(0, -12)
  ctx.moveTo(0, 0)
  ctx.lineTo(12, 0)
  ctx.strokeStyle = "#ffffff"
  ctx.stroke()
  ctx.restore()
}

export function drawBottomRightIcon(
  ctx: CanvasRenderingContext2D,
  left: number,
  top: number,
  __styleOverride: string[],
  fabricObject: fabric.Object
) {
  ctx.save()
  ctx.translate(left, top)
  ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle!))
  ctx.beginPath()
  ctx.lineCap = "round"
  ctx.lineWidth = 3
  ctx.shadowBlur = 2
  ctx.shadowColor = "black"
  ctx.moveTo(0, 0)
  ctx.lineTo(0, -12)
  ctx.moveTo(0, 0)
  ctx.lineTo(-12, 0)
  ctx.strokeStyle = "#ffffff"
  ctx.stroke()
  ctx.restore()
}

export function drawVerticalLineIcon(
  ctx: CanvasRenderingContext2D,
  left: number,
  top: number,
  __styleOverride: string[],
  fabricObject: fabric.Object
) {
  const size = 24
  ctx.save()
  ctx.translate(left, top)
  ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle!))
  ctx.beginPath()
  ctx.lineCap = "round"
  ctx.lineWidth = 3
  ctx.shadowBlur = 2
  ctx.shadowColor = "black"
  ctx.moveTo(-0.5, -size / 4)
  ctx.lineTo(-0.5, -size / 4 + size / 2)
  ctx.strokeStyle = "#ffffff"
  ctx.stroke()
  ctx.restore()
}

export function drawHorizontalLineIcon(
  ctx: CanvasRenderingContext2D,
  left: number,
  top: number,
  __styleOverride: string[],
  fabricObject: fabric.Object
) {
  const size = 24
  ctx.save()
  ctx.translate(left, top)
  ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle!))
  ctx.beginPath()
  ctx.lineCap = "round"
  ctx.lineWidth = 3
  ctx.shadowBlur = 2
  ctx.shadowColor = "black"
  ctx.moveTo(-size / 4, -0.5)
  ctx.lineTo(-size / 4 + size / 2, -0.5)
  ctx.strokeStyle = "#ffffff"
  ctx.stroke()
  ctx.restore()
}

export const controlPositionIcons = {
  tl: drawTopLeftIcon,
  t: drawHorizontalLineIcon,
  tr: drawTopRightIcon,
  r: drawVerticalLineIcon,
  br: drawBottomRightIcon,
  b: drawHorizontalLineIcon,
  bl: drawBottomLeftIcon,
  l: drawVerticalLineIcon,
}
