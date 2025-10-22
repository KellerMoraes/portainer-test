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
let NomeCampo = "Email"
onMounted(()=>{
  let i = ferramentaStore.formularioSelecionado.tiposCampo.findIndex((item)=>{return item == NomeCampo})
    ferramentaStore.formularioSelecionado.tiposCampo.splice(i,1)

})
  onUnmounted(()=>{
    ferramentaStore.formularioSelecionado.tiposCampo.push(NomeCampo)

  })
    const rules = [
      value => {
        if (validateEmail(value)) return true

        return 'Email inválido.'
      },
    ]
    function validateEmail(email){
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

    
</script>