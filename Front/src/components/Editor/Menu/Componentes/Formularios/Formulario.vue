<!-- eslint-disable vue/multi-word-component-names -->
<template>
      <v-card rounded
      :class="`mx-auto my-6 form ${ ferramentaStore.itemSelecionado[this._cmsProps.id] == dados[this._cmsProps.id] ? 'ativo' : '' } `" 
    :link="false"  >
      <v-card-item class="handHover" @click.exact="ferramentaStore.selecionarFormulario(dados)" append-icon="mdi-outlined-check" prepend-icon="mdi-list-box-outline" subtitle="Simples" title="Formulário">
      </v-card-item>

    <v-card-text class="bg-surface-light pt-4" >

      
      <v-form @submit.prevent >
        <Draggable
        :list="dados.filhos"
        tag="div"
        class="v-container v-container--fluid pr-10"
        :class="ferramentaStore?.formularioSelecionado[this._cmsProps.id] == dados[this._cmsProps.id] ? 'FormAtivo' : 'FormInativo'"
        style="transition: all 0.3s ease-out;"
        :item-key="this._cmsProps.id"
        :group="{ name: 'linhas', pull: false }"
        >
        <!-- Grupo Arrumar: o problema é que, o grupo é o "Linhas" que no caso é o mesmo de todas as linhas, lá dentro tem o grupo colunas, que carrega os componentes, 
        provavelmente vai ter que ter uma linha e coluna só para o formulario para poder suportar os inputs, e evitar que as linhas normais suportem também -->
        <template #item="{ element,index}">
          <component
          v-if="element"
          :is="'Comp'+element.nome"
          v-model="dados.filhos[index]"
          
          :key="element[this._cmsProps.id]"
          />
        </template>
      </Draggable> 
    </v-form>
  </v-card-text>
</v-card>
  </template>
  <script setup>
  import { useFerramentaStore } from '@/stores/ferramenta.js';
  import Draggable from "vuedraggable";
  let dados = defineModel()
  const ferramentaStore = useFerramentaStore()

  </script>
  <style lang="scss" scoped>
  .formulario{
    border: 2px rgba(0, 0, 0, 0.281) solid;
    padding: 10px;
    border-radius: 15px;

  }
  .formularioNome{
    text-align: center;
    color: white;
    padding: 6px;
    border-radius: 10px 10px 0px 0px;
    background: black;
  }
  .form{
    &.ativo{
        border: 4px solid #ffd900;
      

    }
  }
  .handHover:hover{
    cursor: pointer;
  }
  .FormInativo{
    cursor: no-drop;
    pointer-events: none;
  }
  .FormAtivo{
    cursor: unset;
    pointer-events: unset;
  }
  </style>
  