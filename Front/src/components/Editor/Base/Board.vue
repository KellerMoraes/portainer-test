<template>
  <div v-if="board" :class="{board: true, ativo: ferramentaStore.itemSelecionado?.[$cms('id')] == board[$cms('id')]}" :id="board.id" ref="draggableBoard" style="min-height: 700px;
  width: 1400px;"  :style="{ transform: `translate(${position.x}px, ${position.y}px)`, zIndex: board.depth }">
    <div class="abas bg-grey-darken-3" >
      <div class="abaWrap d-flex" ref="abas" :id="board[$cms('id')]" @mousedown.self.exact="ferramentaStore.selecionarBoard(board)">
        <div 
  v-for="(subpage, indexSub) in board.subpaginas" 
  :key="subpage[$cms('id')]"
  :data-index="indexSub"
  :id="subpage[$cms('id')]"
  :data-board-id="board[$cms('id')]"
  :class="[
    'abaSubpages', 'subpage', 'mr-1', 'pa-3', { 'active': board.subpaginaAtivaId == null ? indexSub == 0 :subpage[$cms('id')] === board.subpaginaAtivaId },
    {
      'shift-left': shouldShiftLeft(indexSub),
      'shift-right': shouldShiftRight(indexSub)
    }
  ]"
  @click="handleTabClick(subpage)"
>
  <span class="nomeSubPagina">
    {{ subpage[$cms('name')] }}
  </span>
</div>
      </div>
    </div>

    <Draggable 
    :list="props.realSubpagina?.filhos || []"

      :item-key="$cms('id')"
      tag="VContainer"
      :component-data="{fluid: true}"
      class="pr-10 containerSpace content" 
      :group="{ name: 'linhas' }" @mousedown.self.exact="selecionarContainer(board)"
      @end="itemMoved" 
      @sort="itemSort($event, [pathBoard])" 
      @remove="itemRemove($event, [pathBoard])" 
      @add="itemAdd($event, [pathBoard])"
    >
      <template #item="{ element, index }">
        <component 
          :is="'Comp' + element.nome" 
          :key="element[$cms('id')]"
          v-model="props.realSubpagina.filhos[index]" 
          :path="[
  pathBoard,
  {
    tipo: element.tipo,
    index,
    id: element[$cms('id')]
  }
]"
        />
      </template>
    </Draggable>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Draggable from "vuedraggable";
import { usePaginaStore } from '@/stores/pagina.js';
import { itemAdd, itemRemove, itemSort, itemMoved } from "@/command/command";
import { setupBoardDragging } from '@/helpers/interact/interactDragBoard';
import { setupTabGroup } from '@/helpers/interact/interactDropTabGroup';
import { useFerramentaStore } from '@/stores/ferramenta.js'
import { useDragStore } from '@/stores/drag.js'
import { useEditorStore } from "@/stores/editor";
import { $cms } from '@/helpers/cmsProviderHelper'

// CMS
// MODELO
const ferramentaStore = useFerramentaStore()
const dragStore = useDragStore()
const board = defineModel();
const draggableBoard = ref(null);
const abas = ref(null);
const position = board.value.posicao;
const paginaStore = usePaginaStore();
const props = defineProps({
  initialX: { type: Number, default: 0 },
  initialY: { type: Number, default: 0 },
  onMove: { type: Function, default: null },
  // path: { type: Array, required: true },
  realSubpagina: Object
});
const pathBoard = computed(()=>{return {
  tipo: 'Subpagina',
  index: paginaStore.pagina[$cms('content')].findIndex(p => p[$cms('id')] === props.realSubpagina[$cms('id')]),
  id: props.realSubpagina[$cms('id')],
}})

onMounted(() => {
  
    if (draggableBoard.value) {
    draggableBoard.value.setAttribute('data-x', position.x);
    draggableBoard.value.setAttribute('data-y', position.y);
    setupBoardDragging(draggableBoard.value, position,  (data) => {
      props.onMove?.({ ...data, boardId: board.value.id });
    });
  }
  setupTabGroup(abas.value);
});
function selecionarContainer(board){
  if(board.subpaginaAtivaId){
    ferramentaStore.selecionarSubpagina({boardId: board.id, id: board.subpaginaAtivaId},{
      tipo: 'subpagina',
      index: usePaginaStore().pagina[$cms('content')].findIndex(p => p[$cms('id')] === board.subpaginaAtivaId),
      id: board.subpaginaAtivaId,
    } )
  }
  // ferramentaStore.selecionarSubpagina(board)
}
function shouldShiftLeft(index) {
  const swap = dragStore.swapAnimation;
  return (
    swap.active &&
    swap.boardId === board.id &&
    index === swap.toIndex &&
    swap.fromIndex < swap.toIndex
  );
}

function shouldShiftRight(index) {
  const swap = dragStore.swapAnimation;
  return (
    swap.active &&
    swap.boardId === board.id &&
    index === swap.fromIndex &&
    swap.fromIndex < swap.toIndex
  );
}

function handleTabClick(subpage) {
  if (document.querySelector('.subpage.dragging')) return;

  const indexReal = paginaStore.pagina[$cms('content')].findIndex(p => p[$cms('id')] === subpage[$cms('id')]);
  // console.log(indexReal)
  board.value.subpaginaAtiva = board.value.subpaginas.findIndex(s => s[$cms('id')] === subpage[$cms('id')]);
  // console.log(board)

  if (indexReal !== -1) {
    paginaStore.MudarSubPaginaAtiva(indexReal);
  }
  
}
</script>

<style lang="scss" scoped>
.board {
  background: #b6b6b6;
  height: auto;
  
  border: 2px #aeaeaec0 solid;
  border-radius: 15px;
  position: fixed;
}
.ghost {
  position: fixed;
  pointer-events: none;
  opacity: 0.7;
  z-index: 3;
  margin: 0;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.abas {
  width: 100%;
  border-radius: 12px 12px 0px 0px;
  top: 0;
  left: 0;
  position: absolute;
}

.abaWrap {
  width: 95%;
  transition: 0.5s;
  position: relative;
}


.containerSpace {
  padding-top: 80px;
}

.content {
  width: 97%;
  min-height: 1000px;
  height: 100%;
}

.panOn:hover {
  cursor: grab;
}

.subpage:first-child{
  border-radius: 15px 0px 0px 0px;

}
.subpage {
  background-color: rgb(0, 0, 0);
  position: relative;
  z-index: 1;
  
  
  &.dragging {
    opacity: 1;
    z-index: 1000 !important;
    cursor: grabbing !important;
    &.highlight{
      background: rgb(58, 104, 204) !important;
    }
  }
  
  &.active {
    background-color: #555555;
    z-index: 2;
  }
}

.subpage:hover {
  cursor: default !important;
}

.nomeSubPagina {
  border-radius: 15px 0px 0px 0px;
  padding: 22px 12px 22px 12px;
}

.boardFace {
  height: 700px;
  width: 1400px;
  background: #b6b6b6c0;
  border-radius: 15px;
  border: 2px #aeaeaec0 solid;
  position: absolute;
  z-index: 15000;
}
.dropzone {
  background-color: #bfe4ff;
  border: dashed 4px transparent;
  border-radius: 4px;
  margin: 10px auto 30px;
  padding: 10px;
  width: 80%;
  transition: background-color 0.3s;
}
.shift-left {
  transform: translateX(-100%);
}
.shift-right {
  transform: translateX(100%);
}
.drop-active {
  border-color: #aaa;
}

.drop-target {
  background-color: #29e;
}

.drag-drop {
  display: inline-block;
  min-width: 40px;
  padding: 2em 0.5em;
  margin: 1rem 0 0 1rem;

  color: #fff;
  background-color: #29e;
  border: solid 2px #fff;

  touch-action: none;
  transform: translate(0px, 0px);

  transition: background-color 0.3s;
}
/* .can-drop-subpage{
  width: 300px;
} */
</style>