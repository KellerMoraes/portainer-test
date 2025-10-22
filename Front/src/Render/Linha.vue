<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-row :style="geraEstilos()">
    <component v-for="dado in dados[$cms('container')]" :key="dado[$cms('id')]" :is="componenteNome(dado[$cms('name')])" v-model="infoModel" :dados="dado" ></component>
  </v-row>
  </template>
  
  <script setup>
  import { $cms } from '@/helpers/cmsProviderHelper';
  const props = defineProps(['dados'])
  const infoModel = defineModel()
    function geraEstilos() {
      let dados = props.dados
      let estiloCSS = '';
        for (let indexEstilo in dados[$cms('attrs')][$cms('style')]) {
              estiloCSS += `${indexEstilo}: ${typeof dados[$cms('attrs')][$cms('style')][indexEstilo] == 'number' ? dados[$cms('attrs')][$cms('style')][indexEstilo] + 'px' : dados[$cms('attrs')][$cms('style')][indexEstilo] }; `;
        }
        return estiloCSS;
      
      }
      function componenteNome(name){return defineAsyncComponent(() => import(`./${name}.vue`))}
  </script>
  <style>
  </style>
  