<template>
  <v-row >
            <v-col cols="4" class="d-flex justify-center">
              <v-card class="tracos" rounded="6" height="100" width="100">
                <v-icon v-for="item in itens" :key="item.nome" @click="item.selecionado = !item.selecionado" :color="item.selecionado ? 'blue' : ''"  :disabled="itensHabilitados ? !itensHabilitados?.find( x => { return x == item.nome} ) : false" size="30" :class="item.nome == 'centro' ? 'traco pontoCentro' : 'traco '+item.nome">{{ item.icone }}</v-icon>

              </v-card>
            </v-col>
            <v-col cols="7" v-if="itensHabilitados">
              <!-- MARGIN PROBLEMA: POR EXEMPLO, SELECIONOU O DE CIMA: MARGIN-TOP, O DE CIMA E DE BAIXO: CRIA 2 PROPRIEDADES 1 TOP E OUTRA BOTTOM, SE TODOS: DAI SÓ MARGIN. SE DEIXAR 0px OU DESMARCAR: DESAPLICA O ESTILO PARA NÃO MEXER NAS CLASSES QUE DEFINEM ALGO POR EXEMPLO '-12 PX DO V-ROW' -->
              <v-number-input  v-for="input in itensHabilitados" :key="input" v-model="ferramentaStore.itemSelecionado.atributos.estilo[tipo + '-' + input]" width="150" suffix="px" rounded="5" flat variant="outlined" inset density="compact" control-variant="stacked"></v-number-input>
            </v-col>
            
            <v-col cols="7" v-else>
              <v-number-input v-model="ferramentaStore.itemSelecionado.atributos.estilo[tipo]" width="150" suffix="px" rounded="5" flat variant="outlined" inset density="compact" control-variant="stacked"></v-number-input>
            </v-col>
    </v-row>
</template>

<script setup>
const props = defineProps(['habilitados','tipo'])
const itens = reactive([{nome: 'top', icone:'mdi-minus-thick'},{nome: 'right',icone:'mdi-minus-thick'},{nome: 'centro', icone:'mdi-circle-medium'},{nome: 'bottom',icone:'mdi-minus-thick'},{nome: 'left',icone:'mdi-minus-thick'}])
// import { VNumberInput } from 'vuetify/labs/VNumberInput'
import { useFerramentaStore } from '@/stores/ferramenta.js';
let ferramentaStore = useFerramentaStore()
const itensHabilitados = ref(null)
itensHabilitados.value = props?.habilitados


</script>
<style  lang="scss" scoped>
.tracos{
  display: grid;
  grid-template-areas: 
  "area1 area2 area3"
  "area4 area5 area6"
  "area7 area8 area9"
  ;
}
.traco{
    &:hover{
        cursor: pointer;
    }
    &.top{
        grid-area: area2;
        align-self: end;
        justify-self: center;
    }
    &.right{
        grid-area: area6;
        align-self: center;
        justify-self: start;
        transform: rotate(90deg);
    }
    &.bottom{
        grid-area: area8;
        align-self: start;
        justify-self: center;
    }
    &.left{
        grid-area: area4;
        align-self: center;
        justify-self: end;
        transform: rotate(90deg);
    }
    &.pontoCentro{
        justify-self: center;
        align-self: center;
        grid-area: area5;
    }
}
</style>