<template>
    <v-text-field
      :variant="dados.atributos.definicoes.variante"
      v-model="infoModel[NomeCampo]"
      :rules="rules"
      :label="dados.atributos.definicoes.tipo"
    ></v-text-field>
</template>
<script setup>

const props = defineProps(['dados'])
const infoModel = defineModel()
let NomeCampo = "Email"
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