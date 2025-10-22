<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div 
  @click.stop="dados ? selecionarComponente(path) : ''" 
    :class="{componenteItem: true, ativo: ferramentaStore.itemSelecionado?.[idKey] === dados[idKey]}"
  >
    <slot name="edicao" />
  </div>
</template>

<script setup>
import { useFerramentaStore } from '@/stores/ferramenta.js';
import useCms from '@/composables/useCms';
let dados = defineModel()
const props = defineProps({
  path: {
    type: Array,
    required: true
  }
})
// let visibilidade = desabilitado == true ? "componente-desabilitado" : ""
const ferramentaStore = useFerramentaStore()
// VARIAVEIS TEMPLATE
const $cms = useCms();
const idKey = $cms('id')
// VARIAVEIS TEMPLATE
  function selecionarComponente(path) {
    ferramentaStore.selecionarComponente(dados.value,path)
  }
    



</script>