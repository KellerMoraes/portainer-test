<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-expansion-panels class="mb-2"
    v-model="panel"
    multiple
    variant="accordion"
  >
    <v-expansion-panel :value="1">
      <v-expansion-panel-title style="min-height: 50px;">
        <h3>Banner Página</h3>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <div style="min-height: 60px;" class="d-flex flex-column justify-center align-center">
        <v-btn class="mt-2 mb-3"
          variant="outlined"
          :color="paginaStore.pagina.atributos['imagem'].mostrar ? 'primary' : ''"
          :prepend-icon="paginaStore.pagina.atributos['imagem'].mostrar ? 'mdi-checkbox-marked' : 'mdi-checkbox-blank-outline'"
          @click="paginaStore.pagina.atributos['imagem'].mostrar = !paginaStore.pagina.atributos['imagem'].mostrar"
        >
          Mostrar Imagem
        </v-btn>
        <v-row>

<v-col
v-if="paginaStore.pagina.atributos['imagem'].mostrar"
md="12"
cols="12"
>
<v-btn-group
  class="d-flex justify-center"
  divided
  variant="outlined"
  style="transition: 0.5s; height: 100%;"
>
  <v-btn
    height="90"
    width="120"
    size="x-large"
    prepend-icon="mdi-monitor"
    :color="paginaStore.pagina.atributos['imagem'].desktop ? 'primary' : ''"
    stacked
    :variant="paginaStore.pagina.atributos['imagem'].desktop ? 'tonal' : 'outlined'"
    @click="paginaStore.pagina.atributos['imagem'].desktop = 'https://www.ufn.edu.br/Arquivos/vue/Destaque/70f52ca8-732b-419a-b0d4-ce21b812bb89.jpg'"
  >
    <small>Desktop</small>
  </v-btn>
  <v-btn
  
    height="90"
    width="120"
    prepend-icon="mdi-cellphone"
    size="x-large"
    stacked
    :color="paginaStore.pagina.atributos['imagem'].mobile ? 'primary' : ''"
    :variant="paginaStore.pagina.atributos['imagem'].mobile ? 'tonal' : 'outlined'"
    @click="paginaStore.pagina.atributos['imagem'].mobile = 'https://www.ufn.edu.br/Arquivos/vue/Destaque/db1e7bc5-8951-481a-84e2-f1d489783ebb.jpg'"
  >
    <small>Mobile</small>
  </v-btn>
</v-btn-group>
</v-col>
</v-row>
</div>
      </v-expansion-panel-text>
    </v-expansion-panel>
    <v-expansion-panel :value="2">
      <v-expansion-panel-title style="min-height: 50px;">
        <h3>Subpáginas</h3>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <div style="min-height: 60px;" class="d-flex flex-column justify-center align-center">
        <v-btn class="mt-2 mb-3"
          variant="outlined"
          :color="paginaStore.pagina.atributos['imagem'].mostrar ? 'primary' : ''"
          :prepend-icon="paginaStore.pagina.atributos['imagem'].mostrar ? 'mdi-checkbox-marked' : 'mdi-checkbox-blank-outline'"
          @click="paginaStore.pagina.atributos['imagem'].mostrar = !paginaStore.pagina.atributos['imagem'].mostrar"
        >
          Exibir Breadcrumb
        </v-btn>
      </div>
        <Draggable
    style="position: relative; transition: all 0.2s ease-out;"
    :list="paginaStore[$cms('page')]?.[$cms('content')]"
    :item-key="idKey"
    @end="mudarVisibilidadeSubpagina()"
    handle=".handleSubPagina"
    :group="{ name: 'subpaginas' }"
  >
    <template #item="{ element,index }">
      <div :key="element[idKey]" style="position: relative;" class="d-flex justify-center align-center">
          <v-tooltip location="top">
            <template #activator="{ props }">
              <v-icon v-if="index == 0"  size="23" style="position: absolute; left: 8px;" v-bind="props">
                mdi-eye-off
              </v-icon>
              <v-btn v-else variant="plain" @click="mudarVisibilidadeSubpagina(element[idKey])" size="40" style="position: absolute; left: 0;" v-bind="props" :icon="element.atributos['visibilidade'].valor == 'block' ? 'mdi-eye-off' : 'mdi-eye'">
              </v-btn>
            </template>
            <span v-if="index == 0">Primeira subpágina <br> não pode ser invisivel</span>
            <span v-else>{{element.atributos['visibilidade'].valor == 'block' ? 'Desabilitar' : 'Habilitar'}}</span>
          </v-tooltip>


          <v-card height="50px" width="70%" :color="element.atributos['visibilidade'].valor == 'block' ? 'success' : 'black'" class="pa-1 ml-5 ma-1">
            <v-text-field v-model="element.nome"
            variant="solo-filled" flat density="compact"
            />
          </v-card>
          <div style="height: 50px; cursor: pointer;" class="d-flex align-center handleSubPagina">
            <v-icon size="40">mdi-drag-vertical</v-icon>
          </div>
        </div>
    </template>
  </Draggable>
  <v-tooltip location="bottom">
            <template #activator="{ props }">
              <div class="d-flex justify-end mx-7 my-2">
    <v-btn v-bind="props" variant="text" size="40" icon="mdi-plus-circle"  style="font-size: 18px;"></v-btn>
  </div>
</template>
<span>Nova subpágina</span>
          </v-tooltip>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
  
</template>
<script setup>
// import {  computed } from 'vue';
import { usePaginaStore } from '@/stores/pagina.js';
import { storeToRefs } from 'pinia';
import Draggable from "vuedraggable";
import useCms from '@/composables/useCms';
// VARIAVEIS TEMPLATE
const $cms = useCms();
const idKey = $cms('id')
// VARIAVEIS TEMPLATE
const panel = ref([1, 2, 3])
let paginaStore = usePaginaStore()
const { pagina } = storeToRefs(paginaStore)
// let subpagina = computed(() => { 
//   return paginaStore.p
// })
function mudarVisibilidadeSubpagina(id){
  paginaStore[$cms('page')][$cms('content')][0].atributos['visibilidade'].valor = 'block'
  if(id){
    let subPagina = paginaStore[$cms('page')]?.[$cms('content')].find((item)=>{return item[idKey] == id})
    subPagina.atributos['visibilidade'].valor == 'none' ? subPagina.atributos['visibilidade'].valor = 'block' : subPagina.atributos['visibilidade'].valor = 'none'
  }
}


</script>
<style>
.Titulos{
  background-color: rgb(107, 107, 107);
  color: white;
  padding: 4px;
  width: 100%;
  text-align: center;
}
</style>