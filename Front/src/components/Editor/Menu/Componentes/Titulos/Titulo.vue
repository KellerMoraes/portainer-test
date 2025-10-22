<template>
  <EditorBaseComponenteItem v-model="dados">
    <template
      v-if="dados"
      #edicao
    >
      <h1
        :id="dados[$cms('id')] ?? ''"
      >
        <EditorBaseConteudoEditavel v-if="dados" :config="Config"
          v-model="dados"
        />
      </h1>
    </template>
  </EditorBaseComponenteItem>
</template>
<script setup>

import Heading from '@tiptap/extension-heading'
import Document from '@tiptap/extension-document'
import { $cms } from '@/helpers/cmsProviderHelper';
let dados = defineModel()
const DocHeadingOnly = Document.extend({ content: 'heading' })
const Config = [DocHeadingOnly, Heading.configure({ levels: [1] })]
</script>