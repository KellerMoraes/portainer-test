<template>
    <v-dialog v-model="dialogImportar" max-width="500px">
            <template v-slot:activator="{ props }">
              <v-btn color="black" variant="flat" v-bind="props">
                Importar
              </v-btn>
            </template>
            <v-card color="#e9e9e9" >
              <v-card-title>
                Importar Página
              </v-card-title>
              <v-card-text>
                <v-container v-if="paginaImportadaCarregada">
                  <v-sheet style="border: 1px dashed grey; border-radius: 8px;" height="300" class="d-flex flex-column align-center justify-center">
                    <v-icon size="80">mdi-code-json</v-icon>
                    <span style="font-weight: 900;  font-size: 18px; font-family: 'Roboto';">
                      Arraste e Solte ou<br> 
                    </span>
                    <input type="file" id="fileInput" style="display: none;" @onchange="mostrarArquivoSelecionado(event)" />
                    <strong @click="selecionarArquivo" style="cursor: pointer;" class="text-blue" >Selecione</strong>
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
</template>
<script setup>
const dialogImportar = ref(false)
const paginaImportadaCarregada = ref(true)
const emit = defineEmits(['paginaRetorno'])
function confirmarImportacao(){
console.log("ceta")
}
function mostrarArquivoSelecionado(event) {
    const arquivo = event.target.files[0];
    if (arquivo) {
        console.log("Arquivo selecionado:", arquivo);
    }
}
function selecionarArquivo(){
    document.getElementById('fileInput').click();
    }
</script>