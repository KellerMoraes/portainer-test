<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/no-unused-vars -->

<template>
    <v-col :style="geraEstilos()" :cols="dados.estrutura">
      <component v-for="dado in dados.filhos" :key="dado[$cms('id')]" :is="componenteNome(dado[$cms('name')])" v-model="infoModel" :dados="dado" ></component>
    </v-col>
  </template>
  
  <script setup>
  import { $cms } from '@/helpers/cmsProviderHelper';
  const props = defineProps(['dados'])
  const infoModel = defineModel()
  function componenteNome(name){return defineAsyncComponent(() => import(`./${name}.vue`))}
    function geraEstilos() {
      let estiloCSS = '';
        for (let indexEstilo in props.dados[$cms('attrs')]) {
          estiloCSS += `${indexEstilo}: ${typeof props.dados[$cms('attrs')][$cms('style')][indexEstilo] == 'number' ? props.dados[$cms('attrs')][$cms('style')][indexEstilo] + 'px' : props.dados[$cms('attrs')][$cms('style')][indexEstilo] }; `;
        }
        return estiloCSS;
      
      }
  </script>
  
  