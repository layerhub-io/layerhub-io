import { computed, inject, provide, reactive } from "vue"
import type { EditorState, Editor } from "@layerhub-io/core"

export const initStore = () => {
  const editorState = reactive<Partial<EditorState>>({
    editor: null,
    zoomRatio: 1,
    activeObject: null,
    objects: [],
    frame: {
      width: 1920,
      height: 1080,
    },
    contextMenuRequest: null,
  })

  const setEditor = (editor: Editor) => {
    editorState.editor = editor
  }

  const getEditor = computed(() => editorState.editor)

  provide("editorState", editorState)
  provide("setEditor", setEditor)
  provide("getEditor", getEditor)
  provide(
    "editor",
    computed(() => editorState.editor)
  )
}

export const useEditorState = () => inject<EditorState>("editorState") as EditorState

export const useEditor = (): Editor => {
  const editor = inject<any>("getEditor", null, true) as Editor
  return editor as Editor
}

export const useEditorInstance = (): Editor => {
  const editorState = inject<EditorState>("editorState") as EditorState
  // @ts-ignore
  return computed(() => editorState.editor)
}

export const useZoomRatio = () => {
  const editorState = inject<EditorState>("editorState") as EditorState
  return computed(() => editorState.zoomRatio)
}

export const useActiveObject = () => {
  const editorState = inject<EditorState>("editorState") as EditorState
  return computed(() => editorState.activeObject)
}

export const useContextMenuRequest = () => {
  const editorState = inject<EditorState>("editorState") as EditorState
  return computed(() => editorState.contextMenuRequest)
}

export const useEditorObjects = () => {
  const editorState = inject<EditorState>("editorState") as EditorState
  return computed(() => editorState.objects)
}

export const useFrame = () => {
  const editorState = inject<EditorState>("editorState") as EditorState
  return computed(() => editorState.frame)
}
