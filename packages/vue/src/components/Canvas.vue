<script lang="ts" setup>
import { onMounted, onUnmounted } from "vue"
import { Editor } from "@layerhub-io/core"
import { useEditorState } from "./state"
import ResizeObserver from "resize-observer-polyfill"

interface Shadow {
  offsetX: number
  offsetY: number
  blur: number
  color: string
}

interface Config {
  background?: string
  shadow?: Shadow
  clipToFrame?: boolean
  frameMargin?: number
}

let container: HTMLDivElement
let resizeObserver: ResizeObserver

const editorState = useEditorState()
const { config = {} } = defineProps<{ config: Config }>()

onMounted(() => {
  container = document.getElementById("editor-container") as HTMLDivElement
  const { clientHeight, clientWidth } = container

  const editor = new Editor({
    id: "layerhub_io_canvas",
    // @ts-ignore
    state: {
      setActiveObject: (o) => {
        editorState.activeObject = o
      },
      setContextMenuRequest: (o) => {
        editorState.contextMenuRequest = o
      },
      setZoomRatio: (o) => {
        editorState.zoomRatio = o
      },
      setObjects: (o) => {
        editorState.objects = o
      },
      setEditor: (o) => {
        editorState.editor = o
      },
      setFrame: (o) => {
        editorState.frame = o
      },
    },
    config: {
      ...config,
      size: {
        width: clientWidth,
        height: clientHeight,
      },
    },
  })

  resizeObserver = new ResizeObserver((entries) => {
    const { width = clientWidth, height = clientHeight } = (entries[0] && entries[0].contentRect) || {}
    editor.canvas.resize({
      width,
      height,
    })
  })
})

onUnmounted(() => {
  if (resizeObserver && container) {
    if (container) {
      resizeObserver.unobserve(container)
    }
  }
})
</script>
<template>
  <div id="editor-container" style="flex: 1; position: relative">
    <div style="position: absolute; width: 100%; height: 100%; overflow: hidden">
      <canvas id="layerhub_io_canvas"></canvas>
    </div>
  </div>
</template>
