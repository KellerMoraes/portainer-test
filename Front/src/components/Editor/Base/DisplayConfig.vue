<!-- eslint-disable vue/multi-word-component-names -->
<template>
    
        <v-list
          density="compact"
          class="pt-1"
        >
          <v-list-item>
            <div class="d-flex justify-space-between mx-2">
              <span style="align-self: center;">
                Display
              </span>
              <v-btn-toggle
                rounded="xl"
                variant="outlined"
                v-model="ferramentaStore.itemSelecionado[$cms('attrs')][$cms('style')].display"
              >
              <v-btn v-for="item in display" :key="item.properties" :value="item.properties" :disabled="habilitados? habilitados?.find((habilitado)=>{return habilitado == item.properties}) ? false : true : false" @click="defineDisplay(item.properties)"  size="small">
                <v-icon size="26">{{ theme.name.value == 'dark' ? '$'+item.icon+"Light" : '$'+item.icon+"Dark" }}</v-icon>
                <v-tooltip
          activator="parent"
          location="top"
        ><span :class="theme.name.value == 'dark'? 'text-black' : 'text-white' "  style="color: black;">{{ item.name }}</span></v-tooltip>
              </v-btn>
              </v-btn-toggle>
            </div>
          </v-list-item>
  
          <v-divider
          class="border-opacity-75 my-3 mx-6" v-if="ferramentaStore.itemSelecionado?.[$cms('attrs')]?.[$cms('style')]?.display == 'flex'"
          />
          <!-- daqui pra baixo é tudo condicional -->
          <v-list-item v-if="ferramentaStore.itemSelecionado?.[$cms('attrs')]?.[$cms('style')]?.display == 'flex'" >
            <div class="d-flex justify-space-between mx-2">
              <span style="align-self: center;">
                Direction
              </span>
              <v-btn-toggle
                rounded="xl"
                variant="outlined"
                v-model="ferramentaStore.itemSelecionado[$cms('attrs')][$cms('style')]['flex-direction']"
                            >
              <v-btn v-for="item in direction" :key="item.name" :value="item.properties" @click="defineDirection(item.properties)"  size="small">
                <v-icon size="26">{{ theme.name.value == 'dark' ? '$'+item.icon+"Light" : '$'+item.icon+"Dark" }}</v-icon>
                <v-tooltip
          activator="parent"
          location="top"
        ><span :class="theme.name.value == 'dark'? 'text-black' : 'text-white' "  style="color: black;">{{ item.name }}</span></v-tooltip>
              </v-btn>
              </v-btn-toggle>
            </div>
          </v-list-item>
          <v-list-item v-if="ferramentaStore.itemSelecionado?.[$cms('attrs')]?.[$cms('style')]?.display == 'flex'">
            <div class="d-flex justify-space-between mx-2">
              <span style="align-self: center;">
                Align
              </span>
              <v-btn-toggle
                rounded="xl"
                variant="outlined"
                v-model="ferramentaStore.itemSelecionado[$cms('attrs')][$cms('style')]['align-items']"
              >
              <v-btn v-for="item in align" :key="item.name" :value="item.properties" @click="defineAlign(item.properties)"  size="small">
                <v-icon :size="item.size ?? '26'" >{{ theme.name.value == 'dark' ? '$'+item.icon+(ferramentaStore.itemSelecionado?.[$cms('attrs')]?.[$cms('style')]?.['flex-direction'] == 'row' ? 'V': '' ) +"Light" : '$'+item.icon+(ferramentaStore.itemSelecionado?.[$cms('attrs')]?.[$cms('style')]?.['flex-direction'] == 'row' ? 'V': '')+"Dark" }}</v-icon>
                <v-tooltip
          activator="parent"
          location="top"
        ><span :class="theme.name.value == 'dark'? 'text-black' : 'text-white' "  style="color: black;">{{ item.name }}</span></v-tooltip>
              </v-btn>
              </v-btn-toggle>
            </div>
          </v-list-item>
          <v-list-item v-if="ferramentaStore.itemSelecionado?.[$cms('attrs')]?.[$cms('style')]?.display == 'flex'">
            <div class="d-flex justify-space-between mx-2">
              <span style="align-self: center;">
                Justify
              </span>
              <v-btn-toggle
                rounded="xl"
                variant="outlined"
                v-model="ferramentaStore.itemSelecionado[$cms('attrs')][$cms('style')]['justify-content']"
              >
              <v-btn v-for="item in justify" :value="item.properties" :key="item.name" @click="defineJustify(item.properties)"  size="small">
                <v-icon  :size="item.size ?? '26'">{{ theme.name.value == 'dark' ? '$'+item.icon+(ferramentaStore.itemSelecionado?.[$cms('attrs')]?.[$cms('style')]?.['flex-direction'] == 'row' ? 'V': '' )+"Light" : '$'+item.icon+(ferramentaStore.itemSelecionado?.[$cms('attrs')]?.[$cms('style')]?.['flex-direction'] == 'row' ? 'V': '')+"Dark" }}</v-icon>
                <v-tooltip
          activator="parent"
          location="top"
        ><span :class="theme.name.value == 'dark'? 'text-black' : 'text-white' "  style="color: black;">{{ item.name }}</span></v-tooltip>
              </v-btn>
              </v-btn-toggle>
            </div>
          </v-list-item>
          <v-divider v-if="ferramentaStore.itemSelecionado?.atributos?.estilo?.display == 'flex'"
            class="border-opacity-75 my-3 mx-3"
          />
          <v-list-item v-if="ferramentaStore.itemSelecionado?.atributos?.estilo?.display == 'flex'">
            <div class="d-flex justify-space-between mx-2">
              <span style="align-self: center;">
                Children
              </span>
              <v-btn-toggle
                rounded="xl"
                variant="outlined"
                v-model="ferramentaStore.itemSelecionado.atributos.estilo['flex-wrap']"
              >
              <v-btn v-for="item in children" :value="item.properties" :key="item.name" @click="defineWrap(item.properties)"  size="small">
                <v-icon size="26">{{ theme.name.value == 'dark' ? '$'+item.icon+"Light" : '$'+item.icon+"Dark" }}</v-icon>
                <v-tooltip
          activator="parent"
          location="top"
        ><span :class="theme.name.value == 'dark'? 'text-black' : 'text-white' "  style="color: black;">{{ item.name }}</span></v-tooltip>
              </v-btn>
              </v-btn-toggle>
            </div>
          </v-list-item>
          <v-list-item v-if="ferramentaStore.itemSelecionado?.atributos?.estilo?.['flex-wrap'] == 'wrap'">
            <div class="d-flex justify-space-between mx-2">
              <span style="align-self: center;">
                Align content
              </span>
              <v-btn-toggle
                rounded="xl"
                variant="outlined"
                v-model="ferramentaStore.itemSelecionado.atributos.estilo['align-content']"
              >
              <v-btn v-for="item in alignContent" :value="item.properties" :key="item.name" @click="defineAlignContent(item.properties)"  size="x-small">
                <v-icon size="24">{{ theme.name.value == 'dark' ? '$'+item.icon+"Light" : '$'+item.icon+"Dark" }}</v-icon>
                <v-tooltip
          activator="parent"
          location="top"
        ><span :class="theme.name.value == 'dark'? 'text-black' : 'text-white' "  style="color: black;">{{ item.name }}</span></v-tooltip>
              </v-btn>
              </v-btn-toggle>
            </div>
          </v-list-item>
          <!-- <v-list-item>
            <v-list-subheader class="justify-center">
              GAP
            </v-list-subheader>
            <div class="d-flex justify-center">
              <v-text-field label="5px" />
              X
              <v-text-field label="5px" />
            </div>
          </v-list-item> -->
        </v-list>
  </template>
  <script setup>
  import { useFerramentaStore } from '@/stores/ferramenta';
  import { useTheme } from 'vuetify'
  import { $cms } from '@/helpers/cmsProviderHelper';
  const props = defineProps(['habilitados'])
  const theme = useTheme()
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
    {name: "Block", icon: "Block", properties: 'block'},
    {name: "Flex", icon: "Flex", properties: 'flex'},
    {name: "Inline", icon: "Inline", properties: 'inline'},
    {name: "Inline Block", icon: "InlineBlock", properties: 'inline-block'},
  ] 
  const direction = [
  {name: "Flex Row", icon: "FlexRow", properties: 'row'},
  {name: "Flex Column", icon: "FlexColumn", properties: 'column'}
  ] 
  const align = [
    {name: "Align Start", icon: "AlignStart" , properties: 'start'},
    {name: "Align Center",   icon: "AlignCenter" , properties: 'center'},
    {name: "Align End", icon: "AlignEnd", properties: 'end'},
    {name: "Align Strech",  icon: "AlignStrech", properties: 'strech'},
    {name: "Align Baseline", icon: "AlignBaseline", properties: 'baseline'},
  ] 
  const justify = [
    {name: "Justify Start",  icon: "JustifyStart", properties: 'start' },
    {name: "Justify Center",  icon: "JustifyCenter", properties: 'center' },
    {name: "Justify End",  icon: "JustifyEnd" , properties: 'end'},
    {name: "Justify Space-Between", icon: "JustifyBetween", properties: 'space-between'},
    {name: "Justify Space-Around",  icon: "JustifyAround", properties: 'space-around'},
  ]
  const children = [
    {name: "Flex Wrap", icon: "FlexWrap", properties: 'wrap'},
    {name: "Flex NoWrap", icon: "FlexNoWrap", properties: 'nowrap'}
  ]
  const alignContent = [
    {name: "Align Start", icon: "AlignContentStart" , properties: 'start'},
    {name: "Align Center", icon: "AlignContentCenter", properties: 'center'},
    {name: "Align End", icon: "AlignContentEnd", properties: 'end'},
    {name: "Align Strech", icon: "AlignContentStrech", properties: 'strech'},
    {name: "Align Space-Between", icon: "AlignContentSpaceBetween", properties: 'space-between'},
    {name: "Align Space-Around", icon: "AlignContentSpaceAround", properties: 'space-around'},
  ] 
  
  </script>