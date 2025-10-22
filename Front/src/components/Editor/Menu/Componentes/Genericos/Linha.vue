<!-- eslint-disable vue/multi-word-component-names -->
<template>

  <Draggable style="position: relative;" :list="dados.filhos" :style="geraEstilos(dados)"
    :class="{ linha: true, ativo: ferramentaStore.itemSelecionado?.id === dados[idKey] }" tag="VRow"
    :component-data="{noGutters: true}"
    :item-key="idKey" :group="{ name: 'colunas' }" 
    @click.ctrl.exact="ferramentaStore.selecionarLinha(dados, path)"
    @click.self.exact="ferramentaStore.selecionarLinha(dados, path)" 
    :move="validarMovimento" 
    @update="canMove ? itemSort($event, path) : null"
    @add="itemAdd($event, path)"
    @remove="itemRemove($event, path)"
    @end="canMove ? itemMoved() : null"
    >
    <template #item="{ element, index }">
      <component :is="'Comp' + element.nome" v-model="dados.filhos[index]"
        :path='[...path, { tipo: element.tipo, index, id: element[idKey] }]' 
        :estrutura="calcStructure(dados, index)"
        />
    </template>
  </Draggable>
</template>

<script setup>

import Draggable from "vuedraggable";
import { useFerramentaStore } from '@/stores/ferramenta.js';
import useCms from '@/composables/useCms';
// Command-pattern imports 
import { itemAdd, itemRemove, itemSort, itemMoved } from "@/command/command";
// Command-pattern imports 


// VARIAVEIS TEMPLATE
const $cms = useCms();
const idKey = $cms('id')
// VARIAVEIS TEMPLATE
const props = defineProps({
  path: {
    type: Array,
    required: true
  }
})
let dados = defineModel()
const ferramentaStore = useFerramentaStore()
const canMove = ref(false);
function calcStructure(dados, index){
  const estrutura = dados[$cms('structure')];
  const container = dados[$cms('container')];

  if (estrutura && estrutura.length === container.length) {
    return estrutura[index];
  }

  return 12 / container.length;
}
function validarMovimento(evt) {
  const item = evt.draggedContext.element;
  const destino = evt.to.__draggable_context.element;
  const origem = evt.from.__draggable_context.element;
  // Exemplo de regra: máximo 4 colunas
  if (destino.filhos.length > 3 || origem.filhos.length == 1 && item.tipo === 'coluna') {
    canMove.value = false;
    return false;
  }
  // Outras regras podem ser adicionadas aqui
  canMove.value = true;
  return true;
}
function geraEstilos(dados) {
  let atributos = dados.atributos
  let estiloCSS = '';
  for (let indexEstilo in atributos.estilo) {
    if (indexEstilo == 'background') {
      // gambiarra para tornar possivel a excução do visual
      dados.filhos.forEach((coluna) => {
        coluna.atributos.estilo['background'] = atributos.estilo[indexEstilo]
      })
    }
    else {
      estiloCSS += `${indexEstilo}: ${typeof atributos.estilo[indexEstilo] == 'number' ? atributos.estilo[indexEstilo] + 'px' : atributos.estilo[indexEstilo]}; `;
    }
  }
  return estiloCSS;

}

</script>
<style></style>
