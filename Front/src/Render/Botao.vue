        <!-- eslint-disable vue/multi-word-component-names -->
<template>
    <v-btn
          :id="dados[this._cmsProps.id]"
          :variant="dados.atributos.definicoes.variante"
          :type="dados.atributos.definicoes.tipo"
          v-html="dados.conteudo"
        >
        </v-btn>
  
</template>
<script setup>
const props = defineProps(['dados'])
</script>
