<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <v-expansion-panels>
      <v-expansion-panel :value="1">
       <v-expansion-panel-title style="min-height: 50px;" class="pl-3" expand-icon="" collapse-icon="">
        <template #default="{ expanded }">
      <v-icon class="iconConfig transition" :class="{ 'rotate-90': expanded }">mdi-chevron-right</v-icon>
      <h2 class="titleConfigFont">Configuração</h2>
    </template>
      </v-expansion-panel-title>
      <v-card class="pa-5 pb-5">
       <v-text-field label="Nome" variant="outlined" v-model="ferramentaStore.itemSelecionado.sp.nome">
       </v-text-field>
      </v-card>
      <v-card class="pa-2 pb-5">
       Imagem:
      </v-card>
      <v-card class="pa-2 pb-5">
       Visibilidade:
      </v-card>
  </v-expansion-panel>
    </v-expansion-panels>
    <!-- <MenuConfigComponentesCampoTexto v-if="ferramentaStore.itemSelecionado.nome == 'CampoTexto'"></MenuConfigComponentesCampoTexto> -->
  </template>
  <script setup>
  import { useFerramentaStore } from '@/stores/ferramenta.js';
    import { useEditorStore } from '@/stores/editor.js';
import { $cms } from '@/helpers/cmsProviderHelper';
    let editorStore = useEditorStore()
    let ferramentaStore = useFerramentaStore()
    watch(() => ferramentaStore.itemSelecionado?.sp.nome, (novoNome) => {
  const board = editorStore.canvas.boards.find(p => p[$cms('id')] === ferramentaStore.itemSelecionado?.boardId)
  const subpaginaOriginal = board.subpaginas.find(p => p[$cms('id')] === ferramentaStore.itemSelecionado?.sp?.id)
  console.log(subpaginaOriginal)
  if (subpaginaOriginal) {
    subpaginaOriginal.nome = novoNome;
  }
});
  </script>