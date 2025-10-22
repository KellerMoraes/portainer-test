<template>
    <v-text-field
      :variant="dados.atributos.definicoes.variante"
      v-model="infoModel[NomeCampo]"
      :rules="rules"
      v-maska="'###.###.###-##'"
      :label="dados.atributos.definicoes.tipo"
    ></v-text-field>
</template>
<script setup>
import { vMaska } from "maska/vue"

const infoModel = defineModel()
const props = defineProps(['dados'])
let NomeCampo = "CPF"

    const rules = [
      value => {
        if (validaCPF(value)) return true

        return 'CPF inválido.'
      },
    ]

    function validaCPF (cpf) {
      var Soma = 0
      var Resto

      var strCPF = String(cpf).replace(/[^\d]/g, "")

      if (strCPF.length !== 11) {
        return false
      }

      if (
        [
          "00000000000",
          "11111111111",
          "22222222222",
          "33333333333",
          "44444444444",
          "55555555555",
          "66666666666",
          "77777777777",
          "88888888888",
          "99999999999",
        ].indexOf(strCPF) !== -1
      ) {
        return false
      }

      for (let i = 1; i <= 9; i++) {
        Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i)
      }

      Resto = (Soma * 10) % 11

      if (Resto === 10 || Resto === 11) {
        Resto = 0
      }

      if (Resto !== parseInt(strCPF.substring(9, 10))) {
        return false
      }

      Soma = 0

      for (let i = 1; i <= 10; i++) {
        Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i)
      }

      Resto = (Soma * 10) % 11

      if (Resto === 10 || Resto === 11) {
        Resto = 0
      }

      if (Resto !== parseInt(strCPF.substring(10, 11))) {
        return false
      }

      return true
    }
</script>