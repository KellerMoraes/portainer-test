<template>
  <v-row style="flex: 0 0 auto;">
    <v-col cols="3">
      <v-card-subtitle style="font-size: 24px; font-family: Poppins;font-weight: 600;">
        {{ settings.name }}
      </v-card-subtitle>
    </v-col>
    <v-col cols="7">
      <v-text-field :placeholder="settings.placeholder" width="600" density="compact" variant="outlined" rounded=""
        append-inner-icon="mdi-magnify"></v-text-field>
    </v-col>
    <v-col cols="2">
      <v-dialog v-model="dialogImportar" max-width="500px">
        <template v-slot:activator="{ props }">
          <v-btn color="black" variant="flat" v-bind="props">
            Importar
          </v-btn>
        </template>
        <v-card color="#e9e9e9">
          <v-card-title>
            Importar Página
          </v-card-title>
          <v-card-text>
            <v-container v-if="paginaImportadaCarregada">
              <v-sheet style="border: 1px dashed grey; border-radius: 8px;" height="300"
                class="d-flex flex-column align-center justify-center">
                <v-icon size="80">mdi-code-json</v-icon>
                <span style="font-weight: 900;  font-size: 18px; font-family: 'Roboto';">
                  Arraste e Solte ou<br>
                </span>
                <input type="file" id="fileInput" style="display: none;" onchange="mostrarArquivoSelecionado(event)" />
                <strong @click="selecionarArquivo" style="cursor: pointer;" class="text-blue">Selecione</strong>
                <small>Arquivos Suportados: JSON</small>
              </v-sheet>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue-darken-1" variant="text" @click="dialogImportar = false">
              Cancelar
            </v-btn>
            <v-btn color="blue-darken-1" variant="text" @click="confirmarImportacao">
              Confirmar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>


      <v-dialog v-if="settings.name == 'Dashboard'" v-model="dialog" max-width="900px">
        <template v-slot:activator="{ props }">
          <v-btn variant="flat" class="ml-2" v-bind="props" color="blue">
            <v-icon>mdi-plus</v-icon>
            Novo
          </v-btn>
        </template>
        <v-card width="800" height="600">
          <v-card-title class="pa-5 pb-0 text-center">
            <span class="text-h5" style="font-family: Poppins;">Selecione a opção desejada</span>
          </v-card-title>

          <v-card-text class="d-flex flex-grow-1 px-10 py-7">
            <v-row>
              <v-col v-for="tipo in pageTypes" :key="tipo.name" class="pr-2 pt-1 pb-1 pl-0" cols="4">
                <v-hover v-slot="{ isHovering, props }">
                  <v-sheet @click="openCreationDialog(tipo)" v-bind="props" :class="{ 'on-hover': isHovering }"
                    height="100%" :color="tipo.color"
                    class="d-flex flex-column justify-center align-center selecionavelHover">
                    <v-icon size="90" color="white">{{ tipo.icon }}</v-icon>
                    <h2 style="color: white;"> {{ tipo.singleName }} </h2>
                  </v-sheet>
                </v-hover>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-dialog>
      <v-btn v-else variant="flat" class="ml-2" @click="openCreationDialog" color="blue">
        <v-icon>mdi-plus</v-icon>
        Novo
      </v-btn>
    </v-col>
  </v-row>
</template>
<script setup>
import { useManagementStore } from '@/stores/management'

const props = defineProps(['settings'])
const managementStore = useManagementStore()
const dialog = ref(false)
const dialogImportar = ref(false)
const paginaImportadaCarregada = ref(true)
const pageTypes = [
  { singleName: "Página", icon: "mdi-text-box-outline", color: "blue", tipoPagina: "pagina" },
  { singleName: "Notícia", icon: "mdi-newspaper", color: "green", tipoPagina: "noticia" },
  { singleName: "Edital", icon: "mdi-text-box-multiple-outline", color: "orange", tipoPagina: "edital" },
  { singleName: "Alerta", icon: "mdi-alert-decagram-outline", color: "red", tipoPagina: "prova" },
  { singleName: "Recado", icon: "mdi-message-text-outline", color: "purple", tipoPagina: "prova" },
  { singleName: "Destaque", icon: "mdi-panorama-variant-outline", color: "grey", tipoPagina: "prova" },
]
function openCreationDialog(param) {
  dialog.value = false
  managementStore.rightNavDisplay = true
  managementStore.createDialogDisplay = true
  managementStore.createDialogData = param ?? props.settings
}
</script>
<style lang="scss">
.selecionavelHover {
  transition: opacity .4s ease-in-out;
  cursor: pointer;
}

.selecionavelHover:not(.on-hover) {
  opacity: 0.4;
}

.show-btns {
  color: rgba(255, 255, 255, 1) !important;
}
</style>