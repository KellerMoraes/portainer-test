<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/no-unused-vars -->

<template>
  <Draggable
    :list="dados.filhos"
    tag="VCol"
    :class="{ coluna: true, ativo: ferramentaStore.itemSelecionado?.id === dados[idKey] }"
    :style="geraEstilos(dados)"
    :item-key="idKey"
    :group="{ name: 'componentes' }"
    :component-data="{cols: 12, sm: estrutura}"
    @click.self.exact="selecionarColuna(dados)"
    @end="itemMoved" @update="itemSort($event,path)" @remove="itemRemove($event,path)" @add="itemAdd($event,path)"
    
  >
    <template #item="{ element,index}">
      <component
        v-if="element"
        :is="'Comp'+element.compName"
        v-model="dados.filhos[index]"
        :key="element[idKey]"
        :path="[...path, { tipo: element.tipo, index, id: element[idKey] }]"
      />
    </template>
  </Draggable>
</template>

<script setup>
import Draggable from "vuedraggable";
import { useFerramentaStore } from '@/stores/ferramenta.js';
// Command-pattern imports 
import { itemAdd, itemRemove, itemSort, itemMoved } from "@/command/command";
// Command-pattern imports 
// VARIAVEIS TEMPLATE
import useCms from '@/composables/useCms';
const $cms = useCms();
const idKey = $cms('id')
// VARIAVEIS TEMPLATE
let dados = defineModel()
onMounted(()=>{
  console.log(dados.value)
})
const props = defineProps(
  {
    path: 
    {
    type: Array,
    required: true
  },
    estrutura: 
    {
    type: Number,
    required: true
  }
})
// onMounted(()=>{console.log(props.path)})
const ferramentaStore = useFerramentaStore()
  function selecionarColuna(coluna) {
      ferramentaStore.selecionarColuna(coluna, props.path)
  }

  function geraEstilos(dados) {
    let atributos = dados.atributos
    let estiloCSS = '';
      for (let indexEstilo in atributos.estilo) {
        estiloCSS += `${indexEstilo}: ${typeof atributos.estilo[indexEstilo] == 'number' ? atributos.estilo[indexEstilo] + 'px' : atributos.estilo[indexEstilo] }; `;
      }
      return estiloCSS;
    
    }
    function aoMover(evento) {
      console.log(evento)
  // const { oldIndex, newIndex } = evento;

  // if (oldIndex === newIndex) return; // nada foi movido

  // const comando = new MoverElementoCommand(dados.value.filhos, oldIndex, newIndex);
  // manager.executar(comando);
}
</script>

