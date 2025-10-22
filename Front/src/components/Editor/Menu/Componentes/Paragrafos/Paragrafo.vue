<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <EditorBaseComponenteItem v-model="dados">
    <template
      v-if="dados"
      #edicao
    >
      <p
        :id="dados[$cms('id')] ?? ''"
      >
        <EditorBaseConteudoEditavel v-if="dados" :config="Config"
          v-model="dados"
        />
      </p>
    </template>
  </EditorBaseComponenteItem>
</template>
<script setup>
let dados = defineModel()
import Document from '@tiptap/extension-document'
import TextAlign from '@tiptap/extension-text-align'
import { $cms } from '@/helpers/cmsProviderHelper';

// const DocParagraphOnly = Document.extend({ content: 'paragraph' })
const Config = [TextAlign.configure({
          types: ['paragraph'],
        }),]
</script>
