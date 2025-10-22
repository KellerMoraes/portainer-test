<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <v-expansion-panel :value="7">
      <v-expansion-panel-title style="min-height: 50px;">
        <h5>Grid Maker</h5>
      </v-expansion-panel-title>
      <div class="d-flex justify-center align-center pa-5">
        <div :style="gridStyle" class="grid-table" @mouseleave="!ferramentaStore.itemSelecionado.atributos.definicoes.grid ? hoverAtual = [0,0] : hoverAtual = ferramentaStore.itemSelecionado.atributos.definicoes.grid">
          <div v-for="i in totalCells" :style="getRow(i) < hoverAtual[0]+1 && getColumn(i) < hoverAtual[1]+1 ? 'border: 2px rgb(0, 174, 255) solid': ''"  @mouseover="highlight(getRow(i),getColumn(i))"  @click="retornaTamanho(getRow(i),getColumn(i))" :key="i" :class="`grid-cell cell-${getRow(i)}${getColumn(i)}`"></div>
        </div>
      </div>
    </v-expansion-panel>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  import { useFerramentaStore } from '@/stores/ferramenta';
  // import { ListaDeElementos } from '@/model/Elementos';
const ferramentaStore = useFerramentaStore()
  
  const props = defineProps({
    Tamanho: {
      type: Array,
      default: () => [8, 5]
    }
  });
  const hoverAtual = ref([0,0])
  
  const totalCells = props.Tamanho[0] * props.Tamanho[1];
  
  const gridStyle = computed(() => {
    const rows = Array(props.Tamanho[0]).fill('1fr').join(' ');
    const columns = Array(props.Tamanho[1]).fill('1fr').join(' ');
    return {
      display: 'grid',
      gridTemplateRows: rows,
      gridTemplateColumns: columns,
      width: props.Tamanho[1] * 34 + 'px',
      height: props.Tamanho[0] * 34 + 'px',
    };
  });
  
  function getRow(index) {
    return Math.floor((index - 1) / props.Tamanho[1]) + 1;
  }
  
  function getColumn(index) {
    return ((index - 1) % props.Tamanho[1]) + 1;
  }
  function retornaTamanho(valor,valor2){
    ferramentaStore.itemSelecionado.filhos = []
    ferramentaStore.itemSelecionado.atributos.definicoes.grid = [valor, valor2]
    for(let x = 0; x < valor * valor2; x++){
      // ferramentaStore.itemSelecionado.filhos.push(new ListaDeElementos.Celula(x))
}
  }
  function highlight(valor,valor2){
    hoverAtual.value = [valor, valor2]
  }
  </script>
  
  <style lang="scss" scoped>
  .grid-cell {
    width: 30px;
    height: 30px;
    border: 1px black solid;
    border-radius: 3px;
  }
  </style>
  