<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <EditorBaseComponenteItem v-model="dados">
      <template
        v-if="dados"
        #edicao
      >
        <v-btn
          :id="dados[this._cmsProps.id] ?? ''"
          :variant="dados.atributos?.definicoes?.variante ?? 'outlined'"
          :type="dados.atributos?.definicoes?.tipo ?? ''"
          @dblclick="habilitarEditavel(dados.conteudo)"
        >
          <EditorBaseConteudoEditavel
            v-model:conteudo="dados.conteudo"
            v-model:editavel="editavel"
          />
        </v-btn>
      </template>
    </EditorBaseComponenteItem>
  </template>
  <script setup>
  import { useEditorStore } from '@/stores/editor.js';
  let dados = defineModel()
  let editavel = ref(false)
  const editorStore = useEditorStore()
  function habilitarEditavel(valor) {
        editavel.value = true
        editorStore.campoSelecionado = valor
      }
  </script>
  