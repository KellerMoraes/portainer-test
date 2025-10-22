<template>
    <v-textarea
      :variant="dados.atributos.definicoes.variante"
      v-model="ferramentaStore.formularioSelecionado.conteudo[dados.atributos.definicoes?.nomeCampo ?? NomeCampo]"
      :rules="rules"
      :label="dados.atributos.definicoes.tipo"
    ></v-textarea>
</template>
<script setup>
import { useFerramentaStore } from '@/stores/ferramenta';
const ferramentaStore = useFerramentaStore()

let dados = defineModel()
let NomeCampo = "Descricao"
    const rules = [
      value => {
        if (value) return true

        return 'Campo Obrigatório.'
      },
    ]
    

    
</script>