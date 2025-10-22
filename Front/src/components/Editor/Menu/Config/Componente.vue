<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-expansion-panels v-model="panel"  >
    <v-expansion-panel  v-for="(config, index) in ferramentaStore.itemSelecionado?.[$cms('configs')]"  :key="index" :value="index">
      <v-expansion-panel-title style="min-height: 50px;" class="pl-3" expand-icon="" collapse-icon="">
        <template #default="{ expanded }">
      <v-icon class="iconConfig transition" :class="{ 'rotate-90': expanded }">mdi-chevron-right</v-icon>
      <h2 class="titleConfigFont">{{ config }}</h2>
    </template>
      </v-expansion-panel-title>
      <v-expansion-panel-text class="mb-4"  >
        <component v-if="ferramentaStore.editor" :is="'Config'+config"></component>
    </v-expansion-panel-text>
    </v-expansion-panel>

  </v-expansion-panels>
  <!-- <MenuConfigComponentesCampoTexto v-if="ferramentaStore.itemSelecionado.nome == 'CampoTexto'"></MenuConfigComponentesCampoTexto> -->
</template>
<script setup>
import { $cms } from '@/helpers/cmsProviderHelper';
import { useFerramentaStore } from '@/stores/ferramenta.js';
let ferramentaStore = useFerramentaStore()
const panel = ref([0])

</script>
<style lang="scss">

</style>