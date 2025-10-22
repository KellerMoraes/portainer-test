<template>
    <v-text-field
      :variant="dados.atributos.definicoes.variante"
      v-model="infoModel[NomeCampo]"
      v-maska="'(##)#.####-####'"
      :label="dados.atributos.definicoes.tipo"
    ></v-text-field>
</template>
<script setup>
import { vMaska } from "maska/vue"

const props = defineProps(['dados'])
const infoModel = defineModel()
let NomeCampo = "Telefone"
    // const rules = [
    //   value => {
    //     if (value) return true

    //     return 'CPF inválido.'
    //   },
    // ]

    
</script>