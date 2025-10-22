<!-- eslint-disable vue/multi-word-component-names -->
<template>
      <v-text-field
        :variant="dados.atributos.definicoes.variante"
        v-model="ferramentaStore.formularioSelecionado.conteudo[dados.atributos.definicoes?.nomeCampo ?? NomeCampo]"
        :rules="rules"
        :label="dados.atributos.definicoes.tipo"
      ></v-text-field>
  </template>
  <script setup>
  import { useFerramentaStore } from '@/stores/ferramenta';
  const ferramentaStore = useFerramentaStore()

  let dados = defineModel()
  
  let NomeCampo = "Nome"
  onMounted(()=>{
  let i = ferramentaStore.formularioSelecionado.tiposCampo.findIndex((item)=>{return item == NomeCampo})
    ferramentaStore.formularioSelecionado.tiposCampo.splice(i,1)

})
  onUnmounted(()=>{
    ferramentaStore.formularioSelecionado.tiposCampo.push(NomeCampo)

  })
      const rules = [
        value => {
          if (value) return true

          return 'Você precisa digitar um Nome.'
        },
      ]
  </script>
  