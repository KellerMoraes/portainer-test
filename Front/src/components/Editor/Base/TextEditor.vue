<template>
  <EditorContent @dblclick="toggleEditorEditable"  :editor="editor" />
</template>

<script setup>
import { Editor, EditorContent } from '@tiptap/vue-3'
import { $cms } from '@/helpers/cmsProviderHelper';
import { useFerramentaStore } from '@/stores/ferramenta'
const editor = ref(null)
const model = defineModel()
const props = defineProps(['extensions'])
const ferramentaStore = useFerramentaStore()

watch(() => model.value[$cms('content')], (val) => {
  if (val && editor.value && JSON.stringify(val) !== JSON.stringify(editor.value.getJSON())) {
    editor.value.commands.setContent(val)
  }
})

onMounted(()=>{
  editor.value = new Editor({
  extensions: props.extensions,
  editable: false,
  content: model.value[$cms('content')], // inicia a partir do JSON salvo
  onUpdate: ({ editor }) => {
    model.value[$cms('content')] = editor.getJSON() // sempre salva JSON no v-model
  },
})
  
})
watch(() => ferramentaStore.itemSelecionado?.[$cms('id')], (selectedId) => {
    let selected = selectedId == model.value[$cms('id')]
    if(selected){
      if(editor.value){
        ferramentaStore.setEditor(editor.value)
      }
      ferramentaStore.setEditorConfig(props.extensions.map(obj => obj.name))
      editor.value?.commands.smartSelectAll()
      // editor.value?.chain().focus().selectAll().run()
    }else{
      editor.value?.setEditable(false)
    }
},{immediate: true})

function toggleEditorEditable(){
  editor.value?.setEditable(true)
  const endPos = editor.value.state.doc.content.size
editor.value.chain().focus().setTextSelection(endPos).run()
}
onBeforeUnmount(() => {
  if(ferramentaStore.itemSelecionado?.[$cms('id')] !== model.value?.[$cms('id')]){
    editor.value?.destroy()
    ferramentaStore.setEditor(null)
    ferramentaStore.setEditorConfig(null)
  }
})
</script>
<style lang="scss">
.tiptap.ProseMirror ul,
.tiptap.ProseMirror ol {
  list-style-position: outside; /* padrão */
  padding-left: 1.5em;          /* espaço p/ marcador */
  margin-left: 0;               /* evita deslocar demais */
}

.tiptap.ProseMirror {
  --v-theme-on-surface: initial;
  --v-theme-on-background: initial;
  color: inherit;
}

</style>