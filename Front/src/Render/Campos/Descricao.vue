<template>
    <v-textarea
      :variant="dados.atributos.definicoes.variante"
      v-model="infoModel[NomeCampo]"
      :rules="rules"
      :label="dados.atributos.definicoes.tipo"
    ></v-textarea>
</template>
<script setup>

const props = defineProps(['dados'])
const infoModel = defineModel()
let NomeCampo = "Descricao"
    const rules = [
      value => {
        if (value) return true

        return 'Campo Obrigatório.'
      },
    ]
    

    
</script>