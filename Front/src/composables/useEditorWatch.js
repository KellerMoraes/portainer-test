// composables/useEditorWatcher.js
import { watch, onUnmounted, ref } from "vue"
import { useFerramentaStore } from "@/stores/ferramenta"

export function useEditorWatcher(onEditorUpdate) {
  const ferramentaStore = useFerramentaStore()
  const editorRef = ref(null)
  let handler

  watch(
    () => ferramentaStore.editor,
    (newEditor, oldEditor) => {
      if (oldEditor && handler) {
        oldEditor.off("selectionUpdate", handler)
        oldEditor.off("update", handler)
      }

      if (newEditor) {
        handler = ({ editor }) => onEditorUpdate(editor)
        editorRef.value = newEditor
        onEditorUpdate(newEditor) // inicial
        newEditor.on("selectionUpdate", handler)
        newEditor.on("update", handler)
      }
    },
    { immediate: true }
  )

  onUnmounted(() => {
    if (editorRef.value && handler) {
      editorRef.value.off("selectionUpdate", handler)
      editorRef.value.off("update", handler)
    }
  })

  return { editorRef }
}
