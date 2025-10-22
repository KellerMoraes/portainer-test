<template>
  <v-row v-show="permission >= 4">
      <v-col cols="6">
        <h5 class="tituloConfig ml-2" :class="{ disabled: !editorRef.getAttributes('textStyle').color }">Cor do texto</h5>
        <v-btn variant="flat" size="30" class="mx-1" :class="{ selectedBorder: editorRef.isActive('textStyle', { color: '#003D7C' }) }" @click="editorRef.chain().focus().setColor('#003D7C').run()" color="#003D7C" ></v-btn>
        <v-btn variant="flat" size="30" class="mx-1" :class="{ selectedBorder: editorRef.isActive('textStyle', { color: '#FFB30C' }) }" @click="editorRef.chain().focus().setColor('#FFB30C').run()" color="#FFB30C" ></v-btn>
        <v-btn variant="flat" size="30" class="mx-1" :class="{ selectedBorder: editorRef.isActive('textStyle', { color: '#4FC3F7' }) }" @click="editorRef.chain().focus().setColor('#4FC3F7').run()" color="#4FC3F7" ></v-btn>
        
      </v-col>
      <v-col cols="6">
        <h5 class="tituloConfig ml-2" :class="{ disabled: !editorRef.getAttributes('textStyle').color }">Cor do fundo</h5>
        <v-btn variant="flat" size="35" class="mx-1" :class="{ selectedBorder: editorRef.isActive('textStyle', { backgroundColor: '#FFFFFF' }) }" @click="editorRef.chain().focus().setBackgroundColor('#FFFFFF').run()" color="#FFFFFF" ></v-btn>
        <v-btn variant="flat" size="35" class="mx-1" :class="{ selectedBorder: editorRef.isActive('textStyle', { backgroundColor: '#C9C9C9' }) }" @click="editorRef.chain().focus().setBackgroundColor('#C9C9C9').run()" color="#C9C9C9" ></v-btn>
        <v-btn variant="flat" size="35" class="mx-1" :class="{ selectedBorder: editorRef.isActive('textStyle', { backgroundColor: '#515151' }) }" @click="editorRef.chain().focus().setBackgroundColor('#515151').run()" color="#515151" ></v-btn>
      </v-col>
    </v-row>
</template>
<script setup>
import { useEditorWatcher } from "@/composables/useEditorWatch"
const permission = ref(4)
const props = defineProps(['config'])
const color = ref(null)
const { editorRef } = useEditorWatcher(checkColorMarks)

function checkColorMarks(editor){
  let colorSelected = null
    const rules = [
    { check: () => editor.isActive('textStyle', { color: '#003D7C' }), value: "#003D7C" },
    { check: () => editor.isActive('textStyle', { color: '#FFB30C' }), value: "#FFB30C" },
    { check: () => editor.isActive('textStyle', { color: '#4FC3F7' }), value: "#4FC3F7" },
  ]
  // colorSelected = rules.reduce((accumulator, rule) => rule.check() ? rule.value : accumulator, null) //funciona da mesma forma
  // // alignments = rules.find(rule=> rule.check())?.value ?? null //mais eficaz (vou deixar o reduce por questão de mais ferramental(acostumado demais com find))

  // color.value = colorSelected ?? "left"
}
</script>
<style lang="scss">
.selectedBorder {
  position: relative;
}

.selectedBorder::before {
  content: "";
  position: absolute;
  top: -3px;    /* distância da borda do botão */
  left: -3px;
  right: -3px;
  bottom: -3px;
  border: 1px solid white; /* ou black */
  border-radius: 5px;      /* maior que o botão */
  pointer-events: none;     /* não bloqueia clique */
}

</style>