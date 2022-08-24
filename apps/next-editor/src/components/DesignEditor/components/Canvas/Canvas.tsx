import { Canvas } from "@layerhub-io/react"

export default function () {
  return (
    <div style={{ flex: 1, display: "flex", padding: "1px" }}>
      <Canvas
        config={{
          background: "#ecf0f1",
          shadow: {
            blur: 2,
            color: "#bdc3c7",
            offsetX: 0,
            offsetY: 0,
          },
        }}
      />
    </div>
  )
}
