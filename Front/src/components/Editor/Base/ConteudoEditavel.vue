<template>
  <!-- caso o texto não possa ser editado (garantir drag segurando no texto) -->
  <!-- <div v-if="ferramentaStore?.itemSelecionado?.[$cms('id')] !== model[$cms('id')]" v-html="generateHTML()"></div>  -->
  <!-- else -->
   <!-- && ferramentaStore?.itemSelecionado?.[$cms('id')] == model[$cms('id')]" -->
  <EditorBaseTextEditor v-if="model"
         v-model="model" :extensions="extensionFilter()">
         </EditorBaseTextEditor>
</template>
<script setup>
import { StarterKit } from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Strike from '@tiptap/extension-strike'
import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'

import { FontWeight, TextTransform,SmartSelectAll } from "@/helpers/richtext"
import { TextStyleKit, Color  } from '@tiptap/extension-text-style'


const model = defineModel()
const props = defineProps(['config','extensionException'])
// extensions vai ser todos os estilos mais comum para todos os elementos de texto, 

  function extensionFilter(){
        // extension map remover alguma exceção props.extensionException
        if(props.extensionException){
                return extensions.filter(()=>{})
        }
     return extensions
  }

const extensions = 
  [
    ...props.config,
    StarterKit,
    Subscript,
    Superscript,
    Underline,
    Strike,
    FontWeight,
    TextTransform,
    SmartSelectAll,
    TextStyleKit //pacote com, BackgroundColor, Color ,FontFamily ,FontSize ,LineHeight
  ]
//   function generateHTML(){
// const tempEditor = new Editor({
//   extensions: extensions,
//   editable: false,
//   content: model.value[$cms('content')], // seu objeto JSON do tiptap
// })
// html.value = tempEditor.getHTML()
// tempEditor.destroy()
// return html.value
//   }
</script>
<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Roboto:ital,wght@0,100..900;1,100..900&family=Staatliches&display=swap');
</style>