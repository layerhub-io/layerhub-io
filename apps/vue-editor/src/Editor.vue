<script setup lang="ts">
import { Canvas, name, useActiveObject, useEditorObjects, useEditorState } from "@layerhub-io/vue"
import { watch, reactive } from "vue"

const editorState = useEditorState()
const activeObject = useActiveObject()
const objects = useEditorObjects()

const handleAddText = () => {
  const editor = editorState.editor
  if (editor) {
    editor.objects.add({
      type: "StaticText",
      width: 240,
      text: "Hello editor",
    })
  }
}

watch(activeObject, (next, prev) => {
  console.log({ next, prev })
})

watch(objects, (next, prev) => {
  console.log({ next, prev })
})
</script>

<template>
  <div
    :style="{
      height: '100vh',
      width: '100vw',
      display: 'flex',
      flexDirection: 'column',
    }"
  >
    <div>
      <div @click="handleAddText">Add text</div>
    </div>
    <Canvas
      :config="{
        background: '#ecf0f1',
        clipToFrame: true,
        shadow: {
          blur: 5,
          color: '#bdc3c7',
          offsetX: 0,
          offsetY: 0,
        },
      }"
    />
  </div>
</template>

<style>
body {
  margin: 0;
}
</style>
