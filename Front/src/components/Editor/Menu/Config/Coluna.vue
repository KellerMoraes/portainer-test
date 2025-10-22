<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-expansion-panels class="mb-2"
    v-model="panel"
    multiple
    variant="accordion"
  >
    <v-expansion-panel :value="1" class="mb-1">
      <v-expansion-panel-title style="min-height: 50px;" class="pl-3" expand-icon="" collapse-icon="">
        <template #default="{ expanded }">
      <v-icon class="iconConfig transition" :class="{ 'rotate-90': expanded }">mdi-chevron-right</v-icon>
      <h2 class="titleConfigFont">Layout</h2>
    </template>
      </v-expansion-panel-title>
      <BaseDisplayConfig :habilitados="['block', 'flex']"></BaseDisplayConfig>
    </v-expansion-panel>
    <v-expansion-panel :value="2" class="mb-1">
      <v-expansion-panel-title style="min-height: 50px;" class="pl-3" expand-icon="" collapse-icon="">
        <template #default="{ expanded }">
      <v-icon class="iconConfig transition" :class="{ 'rotate-90': expanded }">mdi-chevron-right</v-icon>
      <h2 class="titleConfigFont">Espaçamentos</h2>
    </template>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <div class="pa-4">Padding</div>
        <BaseSeletorInterativo tipo="padding" ></BaseSeletorInterativo>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script setup>
import { useFerramentaStore } from '@/stores/ferramenta';
import { reactive } from 'vue'
import { useTheme } from 'vuetify'
const theme = useTheme()
// expansion panel
let panel = reactive([1, 2, 3])
let ferramentaStore = useFerramentaStore()

if(!ferramentaStore.itemSelecionado.atributos?.estilo?.display){
  defineDisplay('block')
}



onMounted(()=>{
  if(!ferramentaStore.itemSelecionado.atributos?.estilo?.display){
    defineDisplay('block')
  }

})

function defineDisplay(display){
  ferramentaStore.itemSelecionado.atributos.estilo['display'] = display
  if(display == 'flex'){
    defineDirection('row')
    defineWrap('nowrap')
  }
}
function defineDirection(direction){
  ferramentaStore.itemSelecionado.atributos.estilo['flex-direction'] = direction
}
function defineAlign(align){
  ferramentaStore.itemSelecionado.atributos.estilo['align-items'] = align
}
function defineJustify(justify){
  ferramentaStore.itemSelecionado.atributos.estilo['justify-content'] = justify
}
function defineWrap(wrap){
  ferramentaStore.itemSelecionado.atributos.estilo['flex-wrap'] = wrap
}
function defineAlignContent(alignContent){
  ferramentaStore.itemSelecionado.atributos.estilo['align-content'] = alignContent
}



// botoes
const display = [
  {nome: "Block", icone: "Block", propriedade: 'block'},
  {nome: "Flex", icone: "Flex", propriedade: 'flex'},
  {nome: "Inline", icone: "Inline", propriedade: 'inline'},
  {nome: "Inline Block", icone: "InlineBlock", propriedade: 'inline-block'},
] 
const direction = [
{nome: "Flex Row", icone: "FlexRow", propriedade: 'row'},
{nome: "Flex Column", icone: "FlexColumn", propriedade: 'column'}
] 
const align = [
  {nome: "Align Start", icone: "AlignStart" , propriedade: 'start'},
  {nome: "Align Center",   icone: "AlignCenter" , propriedade: 'center'},
  {nome: "Align End", icone: "AlignEnd", propriedade: 'end'},
  {nome: "Align Strech",  icone: "AlignStrech", propriedade: 'strech'},
  {nome: "Align Baseline", icone: "AlignBaseline", propriedade: 'baseline'},
] 
const justify = [
  {nome: "Justify Start",  icone: "JustifyStart", propriedade: 'start' },
  {nome: "Justify Center",  icone: "JustifyCenter", propriedade: 'center' },
  {nome: "Justify End",  icone: "JustifyEnd" , propriedade: 'end'},
  {nome: "Justify Space-Between", icone: "JustifyBetween", propriedade: 'space-between'},
  {nome: "Justify Space-Around",  icone: "JustifyAround", propriedade: 'space-around'},
]
const children = [
  {nome: "Flex Wrap", icone: "FlexWrap", propriedade: 'wrap'},
  {nome: "Flex NoWrap", icone: "FlexNoWrap", propriedade: 'nowrap'}
]
const alignContent = [
  {nome: "Align Start", icone: "AlignContentStart" , propriedade: 'start'},
  {nome: "Align Center", icone: "AlignContentCenter", propriedade: 'center'},
  {nome: "Align End", icone: "AlignContentEnd", propriedade: 'end'},
  {nome: "Align Strech", icone: "AlignContentStrech", propriedade: 'strech'},
  {nome: "Align Space-Between", icone: "AlignContentSpaceBetween", propriedade: 'space-between'},
  {nome: "Align Space-Around", icone: "AlignContentSpaceAround", propriedade: 'space-around'},
] 

</script>