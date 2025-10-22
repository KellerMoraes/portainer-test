<template>
  <v-row v-show="permission >= 4">
      <v-col cols="12">
        <h5 class="tituloConfig ml-2" :class="{ disabled: !config?.some(e => e == 'textTransform') }">Decoração</h5>
        <v-btn-toggle variant="outlined" selected-class="btnAtivo" v-model="decoration">
          <v-btn v-for="btn in decorationBtns" :icon="btn.icon" :disabled="!config?.some(e => e == 'textTransform')" @click="btn.toggle()" :value="btn.value" ></v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>
  <v-row v-show="permission >= 4">
      <v-col cols="12">
        <h5 class="tituloConfig ml-2" :class="{ disabled: checkConfigMark('starterKit', 'subscript' , 'superscript') }">Decoração de texto</h5>
        <v-btn-toggle variant="outlined" selected-class="btnAtivo" v-model="textFormat">
          <v-btn v-for="btn in textFormatBtns" :icon="btn.icon" :disabled="!config?.some(e => e == btn.value)" @click="btn.toggle()" :value="btn.value" ></v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>
  <v-row v-show="permission >= 4">
      <v-col cols="12">
        <h5 class="tituloConfig ml-2" :class="{ disabled: !config?.some(e => e == 'starterKit') }">Lista</h5>
        <v-btn-toggle variant="outlined" selected-class="btnAtivo" v-model="table">
          <v-btn v-for="btn in tableBtns" :icon="btn.icon" :disabled="!config?.some(e => e == 'starterKit')" @click="btn.toggle()" :value="btn.value" ></v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>
</template>
<script setup>
const permission = ref(4)
const props = defineProps(['config'])
import { useEditorWatcher } from "@/composables/useEditorWatch"

const textFormat = ref([])
const decoration = ref([])
const table = ref([])
const { editorRef } = useEditorWatcher(checkDecorationMarks)
const textFormatBtns = [
          {icon: "mdi-format-underline", value: "underline", toggle: () => editorRef.value?.chain().focus().toggleUnderline().run() },
          {icon: "mdi-format-strikethrough", value: "strike", toggle: () => editorRef.value?.chain().focus().toggleStrike().run() },
          {icon: "mdi-format-subscript", value: "subscript", toggle: () => editorRef.value?.chain().focus().toggleSubscript().run() },
          {icon: "mdi-format-superscript", value: "superscript", toggle: () => editorRef.value?.chain().focus().toggleSuperscript().run() },
          ]
const decorationBtns = [
          {icon: "mdi-format-letter-case-upper", value: "uppercase",toggle: () => editorRef.value?.chain().focus().toggleTransform('uppercase').run() },
          {icon: "mdi-format-letter-case-lower", value: "lowercase",toggle: () => editorRef.value?.chain().focus().toggleTransform('lowercase').run() },
          {icon: "mdi-format-letter-starts-with", value: "capitalize",toggle: () => editorRef.value?.chain().focus().toggleTransform('capitalize').run() },
          ]
const tableBtns = [
          {icon: "mdi-format-list-bulleted", value: "bulletedList", toggle: () => bulletedList() },
          {icon: "mdi-format-list-numbered", value: "orderedList", toggle: () => editorRef.value?.chain().focus().toggleOrderedList().run() },
          ]

          function bulletedList(){
            editorRef.value?.chain().focus().toggleBulletList().run()
            applyMarksToListItems(editorRef.value)
          }
function checkDecorationMarks(editor){
  const rulesDecoration = [
    { check: () => editor.isActive('textTransform', { type: 'uppercase' }), value: "uppercase" },
    { check: () => editor.isActive('textTransform', { type: 'lowercase' }), value: "lowercase" },
    { check: () => editor.isActive('textTransform', { type: 'capitalize' }), value: "capitalize" },
  ]
  const rulesDecorationText = [
      { check: () => editor.isActive('subscript'), value: "subscript" },
      { check: () => editor.isActive('superscript'), value: "superscript" },
      { check: () => editor.isActive('strike'), value: "strike" },
      { check: () => editor.isActive('underline'), value: "underline" },
  ]
  const rulesTable = [
    { check: () => editor.isActive('orderedList'), value: "orderedList" },
    { check: () => editor.isActive('bulletList'), value: "bulletedList" },
  ]


  let d = [...rulesDecoration.filter(r => r.check()).map(r => r.value)]
  let textF = [...rulesDecorationText.filter(r => r.check()).map(r => r.value)]
  let t = [...rulesTable.filter(r => r.check()).map(r => r.value)]
  decoration.value = d
  textFormat.value = textF
  table.value = t

}
function checkConfigMark(...marks) {
    if(props.disabled){return true}
    return !props.config?.some(e => marks.includes(e))
}
function numblist() {
//   const { doc } = editorRef.value.state
// editorRef.value.commands.setTextSelection({ from: 1, to: doc.content.size - 1 })
  // editorRef.value?.chain().focus().toggleOrderedList().run()
  console.log(editorRef.value.state.selection)
  editorRef.value?.chain().focus().toggleOrderedList().run()
}
function applyMarksToListItems(editor) {
  const { state, view } = editor
  const { tr, selection } = state
  const { from, to } = selection

  state.doc.nodesBetween(from, to, (node, pos) => {
    // checa se é um LI
    if (node.type.name === 'listItem' && node.content.childCount === 1) {
      const firstChild = node.content.firstChild
      console.log(node)
      console.log(firstChild)
      if (firstChild.type.name === 'paragraph') {
        // pega os marks do parágrafo
        const marks = firstChild.marks

        // cria attrs para o LI baseado nos marks
        const attrs = { ...node.attrs }
        marks.forEach(mark => {
          if (mark.type.name === 'textStyle') {
            if (mark.attrs.color) attrs.color = mark.attrs.color
            if (mark.attrs.fontSize) attrs.fontSize = mark.attrs.fontSize
            if (mark.attrs.fontWeight) attrs.fontWeight = mark.attrs.fontWeight
            if (mark.attrs.fontStyle) attrs.fontStyle = mark.attrs.fontStyle
          }
        })

        // atualiza o LI com os attrs (o bullet agora herda o estilo)
        tr.setNodeMarkup(pos, undefined, attrs)
      }
    }
  })

  view.dispatch(tr)
}
</script>