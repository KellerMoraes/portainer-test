<template>
  <v-row v-show="permission >= 4">
      <v-col cols="8">
        <h5 class="tituloConfig ml-2" :class="{ disabled: !config?.some(e => e == 'textAlign') }">Alinhamento</h5>
        <v-btn-toggle variant="outlined" selected-class="btnAtivo" v-model="alignment">
          <v-btn v-for="btn in alignmentBtns" :icon="btn.icon" :disabled="!config?.some(e => e == 'textAlign')" @click="btn.toggle()" :value="btn.value" ></v-btn>
        </v-btn-toggle>
      </v-col>
      <v-col cols="4">
        <h5 class="tituloConfig ml-2" :class="{ disabled: !config?.some(e => e == 'indent') }">Indentação</h5>
        <v-btn variant="text" :disabled="!config?.some(e => e == 'indent')" size="44" @click="editorRef.chain().focus().setTextAlign().run()" ><v-icon size="30">mdi-format-indent-decrease</v-icon></v-btn>
        <v-btn variant="text" :disabled="!config?.some(e => e == 'indent')" size="44" ><v-icon size="30">mdi-format-indent-increase</v-icon></v-btn>
      </v-col>
    </v-row>
    <v-divider class="ma-6 mx-2"></v-divider>
</template>
<script setup>
import { useEditorWatcher } from "@/composables/useEditorWatch"
const permission = ref(4)
const props = defineProps(['config'])

const alignment = ref(null)
const alignmentBtns = [
          {icon: "mdi-format-align-left", value: "left", toggle: () => editorRef.value?.chain().focus().setTextAlign("left").run() },
          {icon: "mdi-format-align-center", value: "center", toggle: () => editorRef.value?.chain().focus().setTextAlign("center").run() },
          {icon: "mdi-format-align-right", value: "right", toggle: () => editorRef.value?.chain().focus().setTextAlign("right").run() },
          {icon: "mdi-format-align-justify", value: "justify", toggle: () => editorRef.value?.chain().focus().setTextAlign("justify").run() },
          ]
const { editorRef } = useEditorWatcher(checkAlignmentMarks)
function checkAlignmentMarks(editor){
  let alignments = []
  const rules = [
    { check: () => editor.isActive({ textAlign: 'left' }), value: "left" },
    { check: () => editor.isActive({ textAlign: 'center' }), value: "center" },
    { check: () => editor.isActive({ textAlign: 'right' }), value: "right" },
    { check: () => editor.isActive({ textAlign: 'justify' }), value: "justify" },
  ]
  alignments = rules.reduce((accumulator, rule) => rule.check() ? rule.value : accumulator, null) //funciona da mesma forma
  // alignments = rules.find(rule=> rule.check())?.value ?? null //mais eficaz (vou deixar o reduce por questão de mais ferramental(acostumado demais com find))

  alignment.value = alignments ?? "left"
}
</script>