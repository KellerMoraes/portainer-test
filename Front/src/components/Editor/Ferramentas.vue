<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="itensMenu" style="width: 100%;">
    <v-row>
      <v-col cols="6" class="d-flex justify-start align-center">
        <v-btn color="#FFB30C" style="border-radius: 5px; " @click="$router.back()" class="px-3" size="70">
          <v-icon class="mr-2">
            mdi-arrow-left
          </v-icon>
        </v-btn>
        <v-card-title>
          {{ paginaStore.pagina[$cms('name')] }}
        </v-card-title>
        <!-- <v-list-item class="pageNameDisplay"
      :title="paginaStore.pagina[$cms('name')]"
      ></v-list-item> -->

      </v-col>
      <v-col cols="6" class="d-flex justify-end align-center">
        <v-switch hide-details="" color="primary" v-model="userConfigs.autoSave"><template v-slot:label="">
          <span style="font-size: 12px;">
            Salvar automaticamente
          </span>
        </template></v-switch>

        <v-divider vertical class="mx-4"></v-divider>
        <v-btn v-tooltip:bottom="'Desfazer'" icon="mdi-undo" variant="plain" style="font-size: 18px;" class="mx-1">
        </v-btn>
        <v-btn icon="mdi-redo" v-tooltip:bottom="'Refazer'" variant="plain" style="font-size: 18px;" class="mx-1">
        </v-btn>
        <v-divider vertical class="ml-3 mr-1"></v-divider>
        <v-btn icon="mdi-export" v-tooltip:bottom="'Exportar'" variant="plain" style="font-size: 18px;" class="mx-1">
        </v-btn>
        <v-btn icon="mdi-play-outline" v-tooltip:bottom="'Visualizar'" variant="plain" style="font-size: 22px;"
          class="ml-1 mr-2">
        </v-btn>
        <v-divider vertical class="mr-4"></v-divider>
        <v-btn v-if="!userConfigs.autoSave" @click="paginaStore.save()" color="primary" variant="flat" 
          class="ml-1 mr-2">
          <v-icon size="24" class="mr-1">mdi-content-save-outline</v-icon>
          <span style="font-size: 14px;">
            Salvar
          </span>
        </v-btn>
        <v-btn color="success" variant="flat" style="border-radius: 5px; font-size: 12px;" height="40px" width="80px"
          class="px-2 mx-2 mr-6">
          Publicar
        </v-btn>
      </v-col>
    </v-row>

  </div>
</template>
<script setup>
import { usePaginaStore } from '@/stores/pagina.js';
import { useCommandStore } from '@/stores/command.js';
import channel from '@/helpers/broadCast';
import { $cms } from '@/helpers/cmsProviderHelper';
import { useUserConfigStore } from '@/stores/userConfigs';
const commandStore = useCommandStore()
const userConfigs = useUserConfigStore()
function teste() {
  commandStore.desfazer()
}
let paginaStore = usePaginaStore()
const botoesLinha = [
  { nome: "Colar coluna", icone: "mdi-clipboard-file-outline" },
  { nome: `Copiar linha`, icone: "mdi-content-copy" },
  { nome: "Excluir", icone: "mdi-delete" },
]
const botoesColuna = [
  { nome: "Colar componente", icone: "mdi-clipboard-file-outline" },
  { nome: `Copiar coluna`, icone: "mdi-content-copy" },
  { nome: "Excluir", icone: "mdi-delete" },
]
function salvar() {
  channel.postMessage({
    tipo: 'atualizar-pagina',
    payload: JSON.stringify(paginaStore.pagina),
  });
}

function exportar() {
  let anchor = document.createElement("a")
  anchor.href = `data:text/json;charset=utf-8,${encodeURIComponent(
    JSON.stringify(paginaStore.pagina)
  )}`
  anchor.download = paginaStore.pagina.nomePagina + ".json"
  anchor.click()
}
</script>
<style scoped>
.pageNameDisplay {
  font-size: 28px !important;
}
</style>