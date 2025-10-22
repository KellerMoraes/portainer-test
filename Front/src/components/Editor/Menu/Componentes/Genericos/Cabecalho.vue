<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="d-flex flex-column align-center mb-10 pt-5">
    <v-card
      elevation="24"
      color="#4a4a4a"
      :width="lgAndDown ? '100%' : '60%'"
      :height="paginaStore.ferramentaSelecionada == 'Cabecalho' ? 402 : 108 "
      class="d-flex flex-column"
      style="background-size: contain; background-repeat:  no-repeat; transition: 0.4s;"
    >
      <v-img
        height="100%"
        :contain="paginaStore.ferramentaSelecionada == 'Cabecalho'"
        :cover="paginaStore.ferramentaSelecionada !== 'Cabecalho'"
        :src="paginaStore.pagina.atributos['imagem'].mostrar ? previsualizacaoDesktop ? paginaStore.pagina.atributos['imagem'].desktop : paginaStore.pagina.atributos['imagem'].mobile : ''"
      >
        <v-card-title class="ma-0 px-3 FundoInfo d-flex justify-center">
          <v-window v-model="model">
            <v-window-item
              v-for=" (subpagina, i) in paginaStore[$cms('page')]?.[$cms('content')]"
              :key="`subPagina-${subpagina[this._cmsProps.id]}`"
              :value="i"
            >
              <span class="text-h4 text-white">
                {{ subpagina.nome }}
              </span>
            </v-window-item>
          </v-window>
          <div style="position: absolute; right: 2%; top: auto;">
            <v-icon
              color="white"
              @click="abrirConfiguracao()"
            >
              mdi-cog
            </v-icon>
          </div>
          <div style="position: absolute; left: 2%; top: auto;">
            <v-icon
              color="white"
              @click="previsualizacaoDesktop = true"
            >
              mdi-monitor
            </v-icon>
          </div>
          <div style="position: absolute; left: 6%; top: auto;">
            <v-icon
              color="white"
              @click="previsualizacaoDesktop = false"
            >
              mdi-cellphone
            </v-icon>
          </div>
        </v-card-title>
        <v-card-text class="flex-grow-1 pa-0 ma-0" />

        <v-card-actions
          style="position: absolute; width: 100%; bottom: 0%;"
          class="justify-end FundoInfo text-white py-0"
        >
          <v-btn
            icon="mdi-chevron-left"
            variant="plain"
            @click="prev"
          />
          <v-item-group
            v-model="model"
            class="text-center"
            mandatory 
          >  
            <v-item
              v-for="(subPagina, i) in paginaStore[$cms('page')]?.[$cms('content')]"
              :key="subPagina[this._cmsProps.id]"
              v-slot="{ isSelected }"
              :value="i"
            >
              <v-btn
                :style="subPagina.atributos['visibilidade'].valor == 'none' ? 'opacity: 0.3' : 'opacity: 1'"
                :variant="isSelected ? 'outlined' : 'text'"
                @click="MudarSubPaginaAtiva(i)"
              >
                {{ subPagina.nome }}
              </v-btn>
            </v-item>
            <v-btn
              density="compact"
              class="ml-12"
              icon="mdi-plus-circle"
              @click="criarSubPagina"
            />
          </v-item-group>
          <v-btn
            icon="mdi-chevron-right"
            variant="plain"
            @click="next"
          />
        </v-card-actions>
      </v-img>
    </v-card>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { useDisplay } from 'vuetify'
const { lgAndDown } = useDisplay()
let model = ref(0)
let previsualizacaoDesktop = ref(true)
import { usePaginaStore } from '@/stores/pagina.js';
let paginaStore = usePaginaStore()
function next (){
        model.value = model.value + 1 > paginaStore[$cms('page')]?.[$cms('content')].length -1
          ? 0
          : model.value + 1
  paginaStore.MudarSubPaginaAtiva(model.value)
}
 function prev () {
  model.value = model.value - 1 == -1
  ? paginaStore[$cms('page')]?.[$cms('content')].length -1
  : model.value -1
  paginaStore.MudarSubPaginaAtiva(model.value)
      }
    //  function criarSubPagina () {
    //    paginaStore.criarSubPagina()
    //  }
function MudarSubPaginaAtiva(indice) {
  model.value = indice
        paginaStore.MudarSubPaginaAtiva(indice)
}
function abrirConfiguracao() {
        paginaStore.configuracaoCabecalho()
      }

</script>
<style>
.FundoInfo{
background: rgba(0, 0, 0, 0.432);
}
</style>