<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <EditorBaseComponenteItem v-model="dados">
      <template
        v-if="dados"
        #edicao
      >
      <component :is="'Campo'+dados.atributos.definicoes.tipo" v-model="dados"></component>
      </template>
    </EditorBaseComponenteItem>
  </template>
  <script setup>
import { useFerramentaStore } from '@/stores/ferramenta';
  const ferramentaStore = useFerramentaStore()
  let dados = defineModel()
  console.log(dados)
  </script>
  