import React from "react"
import { styled } from "baseui"
import { Theme } from "baseui/theme"
import { Canvas } from "@layerhub-io/react"
import Navbar from "./components/Navbar"
import { editorFonts } from "~/constants/fonts"

const Container = styled<{}, "div", Theme>("div", ({ $theme }) => ({
  width: "100vw",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  background: $theme.colors.white,
  fontFamily: "Uber Move Text",
}))

const loadFonts = () => {
  const promisesList = editorFonts.map((font) => {
    // @ts-ignore
    return new FontFace(font.name, `url(${font.url})`, font.options).load().catch((err) => err)
  })
  Promise.all(promisesList)
    .then((res) => {
      res.forEach((uniqueFont) => {
        if (uniqueFont && uniqueFont.family) {
          document.fonts.add(uniqueFont)
        }
      })
    })
    .catch((err) => console.log({ err }))
}

export default function () {
  React.useEffect(() => {
    loadFonts()
  }, [])

  return (
    <Container>
      <Navbar />
      <Canvas
        config={{
          background: "#ecf0f1",
          frameMargin: 100,
          shadow: {
            blur: 5,
            color: "#e74c3c",
            offsetX: 0,
            offsetY: 0,
          },
        }}
      />
    </Container>
  )
}
