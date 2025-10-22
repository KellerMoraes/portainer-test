<!-- eslint-disable vue/multi-word-component-names -->
<template>
     <EditorBaseComponenteItem v-model="dados" :path="path">
    <template
      v-if="dados"
      #edicao
    >
      <v-card-title class="text-primary" @dblclick="habilitarEditavel(dados.conteudo,1)">
        <EditorBaseConteudoEditavel
              v-model:conteudo="dados.conteudo"
              v-model:editavel="editaveis[1]"
            />
      </v-card-title>
      <Draggable 
    :list="dados[$cms('container')]"
      :item-key="$cms('id')"
      tag="VContainer"
      class="container-space"
      :group="{ name: 'componentes' }"
      @end="itemMoved" 
      @sort="itemSort($event, path)" 
      @remove="itemRemove($event, path)" 
      @add="itemAdd($event, path)"
      >
      <!-- porque eu tinha colocado o path em array([path]) aqui?? irei descobrir... -->
      <template #item="{ element, index }">
        <component 
          :is="'Comp' + element.nome" 
          :key="element[$cms('id')]"
          v-model="dados[$cms('container')][index]" 
          :path="[
  ...path,
  {
    tipo: element.tipo,
    index,
    id: element[$cms('id')]
  }
]"
        />
      </template>
    </Draggable>
    
    </template>
    
  </EditorBaseComponenteItem>
  </template>
  <script setup>
  import { $cms } from '@/helpers/cmsProviderHelper';
  import { useEditorStore } from '@/stores/editor.js';
  import Draggable from "vuedraggable";
  import { itemAdd, itemRemove, itemSort, itemMoved } from "@/command/command";
  let dados = defineModel()
  let editaveis = ref([false])
  const editorStore = useEditorStore()
  const props = defineProps(
  {
    path: 
    {
    type: Array,
    required: true
  }
})
onMounted(()=>{
    console.log(props.path)
})
  function habilitarEditavel(valor,i) {
        editaveis.value[i] = true
        editorStore.campoSelecionado = valor
      }
  </script>
  <style>
  .editavelHabilitado{
    border: 2px black solid;
    border-radius: 5px;
  }
  .editavelDesabilitado{
    border: none;
  }
  .tituloCard{
      font-family: Roboto;
      font-size: 24px;
      margin-bottom: 10px;
      text-align: center;
  }
  .container-space{
    background-color: rgb(248, 248, 248);
    height: 100%;
    min-height: 200px;
    border: 1px rgb(204, 204, 204) solid;
    border-radius: 4px;
  }
  </style>
  