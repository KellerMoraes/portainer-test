<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-expansion-panels multiple v-model="panel">
    <v-expansion-panel :value="0">
      <v-expansion-panel-title style="min-height: 50px;" class="pl-3" expand-icon="" collapse-icon="">
        <template #default="{ expanded }">
          <v-icon class="iconConfig transition" :class="{ 'rotate-90': expanded }">mdi-chevron-right</v-icon>
          <h2 class="titleConfigFont">Subpáginas</h2>
        </template>
      </v-expansion-panel-title>
      <v-expansion-panel-text>

        <Draggable :list="paginaStore[$cms('page')]?.[$cms('content')]" tag="div" :item-key="'id'"
          :group="{ name: 'subpageList' }" :component-data="{ density: 'default' }">
          <template #item="{ element, index }">
            <v-list-item :key="index" color="blue" @click="">
              <template v-slot:prepend>
                <v-btn size="44" variant="text"
                  :color="element[$cms('attrs')].visibilidade[$cms('value')] == 'block' ? 'white' : '#6d6d6d7a'"
                  :icon="element[$cms('attrs')].visibilidade[$cms('value')] == 'block' ? 'mdi-eye' : 'mdi-eye-off'"
                  @click="visibilityChangeSubpage(element)"></v-btn>
              </template>

              <v-list-item-title @click="selecionarSubpagina(element)" class="pl-5"><span
                  :style="{ color: element[$cms('attrs')].visibilidade[$cms('value')] == 'block' ? 'white' : '#6d6d6d7a' }">{{
                    element.nome }}</span></v-list-item-title>
              <template v-slot:append>
                <v-btn size="44" variant="text"
                  :color="element[$cms('attrs')].visibilidade[$cms('value')] == 'block' ? 'white' : '#6d6d6d7a'"
                  icon="mdi-dots-vertical"></v-btn>
              </template>
            </v-list-item>
          </template>
        </Draggable>
        <v-list-item-subtitle class="text-center py-2">
          <small><v-icon>mdi-information-outline</v-icon>Hierarquia definitiva na exibição da página.</small>
        </v-list-item-subtitle>
      </v-expansion-panel-text>

    </v-expansion-panel>
    <v-expansion-panel :value="1">
      <v-expansion-panel-title style="min-height: 50px;" class="pl-3" expand-icon="" collapse-icon="">
        <template #default="{ expanded }">
          <v-icon class="iconConfig transition" :class="{ 'rotate-90': expanded }">mdi-chevron-right</v-icon>
          <h2 class="titleConfigFont">Imagem</h2>
        </template>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <span>Usar a mesma imagem para todas as subpáginas?</span>
        <div>Sim | Nao (botões ou checkbox)</div>
        <h3>Imagem Padrão</h3>
        <v-img height="200" :src="paginaStore[$cms('page')][$cms('configs')]?.[$cms('image')]?.desktop"></v-img>
        <v-file-input v-model="file" accept="image/png, image/jpeg, image/bmp" @change="uploadImage" label="Photos"
          placeholder="Upload your photos" prepend-icon="mdi-camera" multiple></v-file-input>


        <!-- <div class="d-flex justify-center">
          <v-card elevation="0" color="#CDCDCD" link :dropzone="true" height="160px" width="75%"
            style="border: 3px dashed grey;" class="d-flex flex-column text-center justify-center  align-center">
            <div>

              Arraste e Solte ou <span style="display: contents; color: #1867C0;">Busque...</span>
              <br>
              <small>jpg,png ou svg</small>
            </div>
          </v-card>

        </div> -->
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script setup>
import { useFerramentaStore } from '@/stores/ferramenta.js';
import { usePaginaStore } from '@/stores/pagina.js';
import { useEditorStore } from '@/stores/editor.js';
import Draggable from "vuedraggable";
import { $cms } from '@/helpers/cmsProviderHelper'
import _pagina from '@/services/paginas';
let editorStore = useEditorStore()
let paginaStore = usePaginaStore()
let ferramentaStore = useFerramentaStore()
const panel = ref([])
const file = ref(null)
function scrollToBoard(boardId) {
  editorStore.canvas.scale = 0.6
  const boardIndex = editorStore.canvas.boards.findIndex(
    b => b.id === boardId
  );
  ferramentaStore.selecionarBoard(editorStore.canvas.boards[boardIndex])
  if (boardIndex >= 0) {
    let topZ = editorStore.canvas.boards.length - 1
    editorStore.canvas.boards.forEach((board) => {
      if (board.depth > 0) {
        board.depth -= 1
      }
    })
    editorStore.canvas.boards[boardIndex].depth = topZ
  }

  setTimeout(() => {

    const canvasElement = document.querySelector(".canvas");
    const boardElement = document.querySelector("#" + boardId);

    if (!canvasElement || !boardElement) return;

    // Pega a posição atual do board no DOM
    const canvasRect = canvasElement.getBoundingClientRect();
    const boardRect = boardElement.getBoundingClientRect();

    // Calcula onde o board está em relação ao canvas
    const boardLeft = boardRect.left - canvasRect.left + canvasElement.scrollLeft;
    const boardTop = boardRect.top - canvasRect.top + canvasElement.scrollTop;

    // Centraliza o board
    const scrollX = boardLeft + (boardRect.width / 2) - (canvasRect.width / 2);
    const scrollY = boardTop + (boardRect.height / 2) - (canvasRect.height / 2);

    canvasElement.scrollTo({
      left: scrollX,
      top: scrollY,
      behavior: 'smooth'
    });
  }, 150)
}
async function uploadImage() {
  const arquivo = new FormData()
  arquivo.append("arquivo", file.value[0])
  await _pagina.upload(arquivo).then((response) => {
    paginaStore[$cms('page')][$cms('configs')][$cms('image')].desktop = response.url
    console.log(paginaStore.pagina)
  })
  // console.log(file.value[0]) 
}
function selecionarSubpagina(sub) {
  let ele = document.querySelector("#" + sub[$cms('id')])
  ferramentaStore.selecionarSubpagina(ele)

}
function visibilityChangeSubpage(ele) {
  ele[$cms('attrs')].visibilidade[$cms('value')] = ele[$cms('attrs')].visibilidade[$cms('value')] == 'block' ? 'none' : 'block'

}
</script>
<style></style>