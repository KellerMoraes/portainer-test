<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <component :is="componenteNome(dados.atributos.definicoes.tipo)" :dados="dados" v-model="infoModel"></component>
    
  
</template>
<script setup>
const props = defineProps(['dados'])
const infoModel = defineModel()
function componenteNome(nome){return defineAsyncComponent(() => import(`./Campos/${nome}.vue`))}
</script>
