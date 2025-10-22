<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div v-click-outside="{
      handler: ()=>{ editorStore.recursoSelecionado = false },
      closeConditional: ()=>{return editorStore.recursoSelecionado !== false}
    }">
     <!-- MENU DOS COMPONENTES -->

  <v-navigation-drawer
  style="top: 65px; "
    v-model="drawer"
    permanent
    width="70"
  >
 <div style="height: 65px;" class="d-flex justify-center align-center">

      <v-icon color="primary" size="32">
        mdi-vector-square
      </v-icon>
  
    </div>

    <v-divider />
    <v-sheet width="100%" class="d-flex flex-column justify-center align-center py-2" >
     

        <v-btn v-for="recurso in recursos" @click="selecionar(recurso)"  :variant="recurso.Nome == editorStore.recursoSelecionado ? 'tonal' : 'plain'" size="43" :key="recurso.Nome">
          <v-icon size="30">
            {{ recurso.Icone }}
          </v-icon>
          
        </v-btn>
        <v-dialog max-width="900">
  <template v-slot:activator="{ props: activatorProps }">
    <v-btn v-bind="activatorProps" style="position: absolute; bottom: 9%;" class="mr-1" rounded :variant="'text'" size="38"  >
      <v-icon size="24">
        mdi-cog
      </v-icon>
    </v-btn>
  </template>
  <template v-slot:default="{ isActive }">
    <v-app-bar style="left: 0; width: 100%;">
      <v-app-bar-title>
        Configurações
      </v-app-bar-title>
      <template v-slot:append>
          <v-btn icon="mdi-close" @click="isActive.value = false"></v-btn>
        </template>
    </v-app-bar>
    <!-- <v-card>
      <v-card-title class="pr-5 pl-3  pt-5 pb-1">
            </v-card-title>
            <v-card-subtitle class="pr-5 pl-4  py-2" style="font-size: 24px; font-family: Poppins;">
  
    </v-card-subtitle>
    <v-card-text class="pa-5 pl-2 pt-0"> -->

      <EditorSystemConfigSystemEditor></EditorSystemConfigSystemEditor>
    <!-- </v-card-text>
    </v-card> -->
  </template>
</v-dialog>
      </v-sheet>
  </v-navigation-drawer>
  <!-- MENU DOS COMPONENTES -->
  <!-- COMPONENTES DO MENU SELECIONADO -->
  <v-navigation-drawer
  style="top: 65px; "
    :width="xlAndUp ? 300 : 180"
    permanent
    :class="{elementCreateDrag: draggingElement}"
    :model-value="!!editorStore.recursoSelecionado"
    >
    <!-- !! <- faz retornar true ou false aquele valor em especifico e não o valor em si (para isso a model não pode ser v-model (vuetify)) -->
  <div>

  <div class="d-flex justify-space-between align-center ma-2 mt-4 mb-4">

    <span class="titulo">{{ editorStore.recursoSelecionado.Nome  }}</span>
    <v-btn
    @click="fecharComponentes()"
    icon
    class="btnTitulo"
    variant="text"
    size="x-small"
    >
    <v-icon size="large">
      mdi-close
    </v-icon>
  </v-btn>
</div>
<div class="d-flex justify-space-between align-center ma-1 mx-2">

  <v-text-field 
  append-inner-icon="mdi-magnify"
  density="compact"
  label="Pesquisar"
  variant="outlined"
  hide-details
  single-line
  ></v-text-field>
</div>
<div v-for="elemento in editorStore.recursoSelecionado.Itens" :key="elemento.Nome"  class="mt-4">

  <span class="subtitulo">{{ elemento.Nome }}</span>
    <Draggable
    v-if="editorStore.opcaoComponenteSelecionado"
    :list="elemento.Componentes"
    class="listaDeComponentes v-sheet d-flex flex-wrap ma-2"
    tag="div"
    :move="onMove"
    :clone="clonar"
    @start="startDrag"
    @end="endDrag"
    :sort="false"

    :item-key="idKey"
    :group="{ name: elemento.Grupo, pull: 'clone', put: false, }"
    >
    <template #item="{ element }">
          <v-card color="#f5f5f5" width="85px" height="105px" flat style="border: 1px black solid; cursor: grab" class="mx-1 my-1 ">
            <v-card-title class="text-center pb-0">
              <v-icon size="40">{{ element.icone }}</v-icon>
            </v-card-title>
            <v-card-text style="height: 28px;" class="pa-1">
              <div class="text-center">{{ element.nome }}</div>
            </v-card-text>
            <div class="d-flex justify-center">
              <v-icon size="32" class="d-flex justify-center" color="#d9d9d9">mdi-drag-horizontal</v-icon>
            </div>
          </v-card>
       
        </template>
      </Draggable>
</div>

  </div>
  
  </v-navigation-drawer>

</div>

</template>
<!-- COMPONENTES DO MENU SELECIONADO -->
<script setup>

import { ref } from "vue";
import Draggable from "vuedraggable";
import { useDisplay } from 'vuetify'
import { useEditorStore } from '@/stores/editor.js';
import _ from 'lodash'
import { Recursos } from "@/model/Recursos";
import { criarElemento } from "@/model/Elementos";
import { useUserConfigStore } from '@/stores/userConfigs';
// VARIAVEIS TEMPLATE
import useCms from '@/composables/useCms';
import ConfigSystemEditor from "../System/ConfigSystemEditor.vue";
const userConfigsStore = useUserConfigStore()
const $cms = useCms();
const idKey = $cms('id')
// VARIAVEIS TEMPLATE
let editorStore = useEditorStore()
const { xlAndUp } = useDisplay()
let drawer = ref(true)
let draggingElement = ref(false)
let recursos = Recursos

function fecharComponentes() {
  editorStore.recursoSelecionado = false
}
function clonar(item) {
  return criarElemento(item.tipo,{icon: item.icone , group: item.grupo})
  
}
function onMove(evt) {
  if(evt.to.classList.contains('quickAccessGroup') && userConfigsStore.quickAcessElements.find((item)=>{return item.nome == evt.draggedContext.element.nome})){
        return false
    }
  

}
function startDrag(e) {
  draggingElement.value = true
}
function endDrag(e) {
  draggingElement.value = false
}
function selecionar(recurso) {
  editorStore.selecionarRecurso(recurso)
  }

</script>
<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
.listaDeComponentes > div:first-child {
  margin: 10px;
  border-radius: 5px;
}
.listaDeComponentes .componente-item:hover{
    opacity: 0.7;
    cursor: pointer;
  }
.listaDeComponentes .v-card * :not(.v-icon) {
  font-size: 14px !important;
}
.elementCreateDrag{
  opacity: 0.1;
  pointer-events: none;
}
.titulo{
  font-family: "Inter", sans-serif;
  font-weight: 600;
  font-size: 16px;
display: inline-block;
padding: 4px;
}
.btnTitulo{
  margin-top: 5px;
}
.subtitulo{
  font-family: "Inter", sans-serif;
  font-weight: 600;
  font-size: 14px;
  display: inline-block;
  
  margin-left: 10px;

}
</style>