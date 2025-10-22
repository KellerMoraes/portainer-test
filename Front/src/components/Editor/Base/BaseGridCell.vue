<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <Draggable
    :list="dados.filhos"
    tag="div"
    :class="`${ferramentaStore.celulasSelecionadas?.find((item)=>{return item[this._cmsProps.id] == dados[this._cmsProps.id] }) ? 'ativa' : ''}`"
    class="grid-cell-comp"
    :item-key="this._cmsProps.id"
    :group="{ name: 'componentes' }"
    @click.ctrl.shift.exact="selecionarCelula(dados)"
  >
    <template #item="{ element,index}">
      <component
        v-if="element"
        :is="'Comp'+element.nome"
        v-model="dados.filhos[index]"
        :key="element[this._cmsProps.id]"
      />
    </template>
  </Draggable>
  </template>
  <script setup>
  import { useFerramentaStore } from '@/stores/ferramenta';
  import Draggable from "vuedraggable";
  const ferramentaStore = useFerramentaStore()
  let dados = defineModel()
  function selecionarCelula(valor){
    ferramentaStore.selecionarCelula(valor)
  }
  
  </script>
  <style lang="scss" scoped>
    .grid-cell-comp{
        width: 100%;
        background-color: grey;
        border-radius: 6px;
        &.ativa{
          border:3px solid rgba(151, 12, 12, 0.774);
        }
      }
    .grid-cell-comp:hover{
        border:3px solid rgba(151, 12, 12, 0.774);
      }
      .grid-cell-comp > .componente-item:hover{
        border: 4px #7e303d solid !important;
        border-top: 12px #7e303d solid !important;

      }
      
</style>