<template>
  <div class="config-wrapper">
    <!-- Barra fixa -->
    
    <!-- Conteúdo scrollável -->
     <v-toolbar flat dense :color="ferramentaStore.corSelecionada" style="position: sticky; top: 0; z-index: 10;">
  <v-toolbar-title>
    {{ !paginaAtual.filhos
          ? ferramentaStore.tipoSelecionado ?? 'Configuração Inicial'
          : ferramentaStore.tipoSelecionado }}
  </v-toolbar-title>
</v-toolbar>
    <div class="config-content">
      <v-expansion-panels
        v-if="ferramentaStore.tipoSelecionado !== 'Pagina'"
        v-model="panel"
        class="mb-1"
      >
          <v-expansion-panel :value="1">
            <v-expansion-panel-title
              style="min-height: 50px;"
              class="pl-3"
              expand-icon=""
              collapse-icon=""
            >
              <template #default="{ expanded }">
                <v-icon class="iconConfig transition" :class="{ 'rotate-90': expanded }">
                  mdi-chevron-right
                </v-icon>
                <h2 class="titleConfigFont">Editar</h2>
              </template>
            </v-expansion-panel-title>

            <v-expansion-panel-text class="py-0">
              <v-item-group mandatory>
                <v-container>
                  <v-row>
                    <v-col
                      v-for="(botao, i) in botoesEditar.filter(
                        (b) => ferramentaStore.nivelSelecionado >= b.nivel
                      )"
                      :key="i"
                      cols="12"
                      md="4"
                      class="pa-0"
                    >
                      <v-item v-slot="{ isSelected }">
                        <v-card
                          :color="isSelected ? 'primary' : ''"
                          class="d-flex align-center ma-1"
                          height="70"
                          flat
                          :variant="!botao.habilitado ? 'text' : 'tonal'"
                          :disabled="!botao.habilitado"
                          @click="acaoEditar(botao.option)"
                        >
                          <v-tooltip activator="parent" location="top">
                            <span>{{ botao.nome }}</span>
                          </v-tooltip>
                          <v-scroll-y-transition>
                            <div class="flex-grow-1 text-center font-weight-bold">
                              <v-icon size="28">{{ botao.icone }}</v-icon>
                              <br />
                              <small style="font-size: 17px;">{{ botao.nome }}</small>
                            </div>
                          </v-scroll-y-transition>
                        </v-card>
                      </v-item>
                    </v-col>
                  </v-row>
                </v-container>
              </v-item-group>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>

      <EditorMenuConfigPagina v-if="ferramentaStore.tipoSelecionado == 'Pagina'" />
      <EditorMenuConfigBoard v-if="ferramentaStore.tipoSelecionado == 'Board'" />
      <EditorMenuConfigCabecalho v-if="ferramentaStore.tipoSelecionado == 'Cabecalho'" />
      <EditorMenuConfigLinha v-if="ferramentaStore.tipoSelecionado == 'Linha'" />
      <EditorMenuConfigColuna v-if="ferramentaStore.tipoSelecionado == 'Coluna'" />
      <EditorMenuConfigComponente v-if="ferramentaStore.tipoSelecionado == 'Componente'" />
      <EditorMenuConfigSubpagina v-if="ferramentaStore.tipoSelecionado == 'Subpagina'" />
    </div>
  </div>
</template>

<script setup>
import DuplicarElementoCommand from '@/command/comandoDuplicar';
import RemoverElementoCommand from '@/command/comandoRemover';
import { useCommandStore } from '@/stores/command';
import { useFerramentaStore } from '@/stores/ferramenta.js';
import { usePaginaStore } from '@/stores/pagina.js';
import { useUserConfigStore } from '@/stores/userConfigs';
import { useDisplay } from 'vuetify'
const panel = ref([1])
const botoesEditar = computed(() => [
  { nome: "Copiar", option: 0, nivel: 2, icone: "mdi-content-copy", habilitado: true },
  { nome: "Colar", option: 1, nivel: 1, icone: "mdi-content-paste", habilitado: useUserConfigStore().clipboard && useUserConfigStore().clipboard.nivel >= ferramentaStore.nivelSelecionado },
  { nome: "Excluir", option: 2, nivel: 2, icone: "mdi-delete-outline", habilitado: true },
  { nome: "Duplicar", option: 3, nivel: 2, icone: "mdi-content-duplicate", habilitado: true },
  { nome: "Recortar", option: 3, nivel: 2, icone: "mdi-content-cut", habilitado: true },
])

const { xxl } = useDisplay()
const ferramentaStore = useFerramentaStore()
const paginaStore = usePaginaStore()
const { paginaAtual } = paginaStore
// const itemCopiadoCheck = computed(()=>{return ferramentaStore.itemCopiado})

function acaoEditar(opt) {
  switch (opt) {
    case 0:
      //Copiar
      ferramentaStore.copiarElemento()



      break
    case 1:
      //Colar
      ferramentaStore.colarElemento()



      break
    case 2:
      //Excluir
      // não depende de parametro pois tudo é contextual e já está na ferramentaStore
      ferramentaStore.deletarElemento()
      // não depende de parametro pois tudo é contextual e já está na ferramentaStore

      break
    case 3:
      //Duplicar
      // não depende de parametro pois tudo é contextual e já está na ferramentaStore
      ferramentaStore.duplicarElemento()
      // não depende de parametro pois tudo é contextual e já está na ferramentaStore



      break

  }
}
</script>
<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Staatliches&display=swap');

.titleConfigFont {
  font-family: "Staatliches", sans-serif;
  font-weight: 400;
  font-style: normal;
}

.rotate-90 {
  transform: rotate(90deg);
  transition: transform 0.2s;
}

.iconConfig {
  margin-right: 4px;

  &.transition {
    transition: transform 0.2s;
  }
}
.config-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%; /* ocupa a altura toda do container */
}

.config-content {
  flex: 1;
  overflow-y: auto; /* scroll só no conteúdo */
  padding: 16px;
}
</style>