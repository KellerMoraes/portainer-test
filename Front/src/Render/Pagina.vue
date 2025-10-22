<!-- eslint-disable vue/multi-word-component-names -->
<template>
        <!-- Linhas -->
             <component v-for="Linha in model[$cms('container')][0][$cms('container')]" :key="Linha[$cms('id')]" :is="componenteNome(Linha[$cms('name')])" :dados="Linha" ></component>
            
    </template>
    
    <script setup>
   import { $cms } from '@/helpers/cmsProviderHelper';
   const model = defineModel();
function componenteNome(name){return defineAsyncComponent(() => import(`./${name}.vue`))}
    
    </script>
    <style>
    </style>
    