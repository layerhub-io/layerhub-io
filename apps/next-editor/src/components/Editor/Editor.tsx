import React from "react"
import { Canvas } from "@layerhub-io/react"
export default function () {
  return (
    <Canvas
      config={{
        background: "#ecf0f1",
        frameMargin: 100,
        shadow: {
          blur: 5,
          color: "#bdc3c7",
          offsetX: 0,
          offsetY: 0,
        },
      }}
    />
  )
}
