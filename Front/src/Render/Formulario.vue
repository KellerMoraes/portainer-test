<!-- eslint-disable vue/multi-word-component-names -->
<template>
    
    <v-form @submit.prevent="submit" :style="geraEstilos()"
      :id="dados[this._cmsProps.id]">
      <component v-for="dado in dados.filhos" :key="dado[this._cmsProps.id]" :is="componenteNome(dado.nome)" v-model="dados.conteudo" :dados="dado" ></component>
    <!-- passar por model nao por props -->
    </v-form>
  
</template>
<script setup>
const props = defineProps(['dados'])
function componenteNome(nome){return defineAsyncComponent(() => import(`./${nome}.vue`))}
    function geraEstilos() {
      let dados = props.dados
      let atributos = dados.atributos
      let estiloCSS = '';
        for (let indexEstilo in atributos.estilo) {
          estiloCSS += `${indexEstilo}: ${typeof atributos.estilo[indexEstilo] == 'number' ? atributos.estilo[indexEstilo] + 'px' : atributos.estilo[indexEstilo] }; `;
        }
        return estiloCSS;
      
      }
      function submit(event){
        console.log(event)
        console.log(props.dados.conteudo)

      }
</script>
