<template>
  <div ref="canvas" class="canvas" @wheel="handleWheel">
  <EditorSystemToolsToolZoom @zoom-emit="onZoomEmit" />
  
  <!-- camada intermediária que escala -->
  <div
    class="scale-container"
    :style="{ transform: `scale(${editorStore.canvas.scale})`, transformOrigin: '0 0' }"
  >
    <!-- camada que define o tamanho lógico fixo -->
    <div
      ref="inner"
      class="inner-canvas"
      :style="{
        width: editorStore.canvas.size.width + 'px',
        height: editorStore.canvas.size.height + 'px'
      }"
      @mousedown.self.exact="ferramentaStore.removerSelecao()"
    >
    <Board
  v-for="(board, index) in editorStore.canvas.boards"
  :key="board.id"
  v-model="editorStore.canvas.boards[index]"
  :realSubpagina="paginaStore.pagina[$cms('content')].find(p => p[$cms('id')] === board.subpaginas[board.subpaginaAtiva]?.[$cms('id')])"
  :scale="{ getScale: () => editorStore.canvas.scale }"
  :data-board-index="index"
  class="boardComponent"
/>
    </div>
  </div>
</div>
</template>

<script setup>
import { ref, onMounted, provide, watch, nextTick  } from 'vue'
import { useEditorStore } from '@/stores/editor.js'
import { useFerramentaStore } from '@/stores/ferramenta.js'
import { usePaginaStore } from '@/stores/pagina.js'
import Board from './Board.vue'
import { setupCanvasDrop } from '@/helpers/interact/interactDropCanvas'
import { setupTabDragging } from '@/helpers/interact/interactDragTabs'
import { $cms } from '@/helpers/cmsProviderHelper'

const canvas = ref(null)
const inner = ref(null)
const scale = ref(0.7)

const paginaStore = usePaginaStore()
const editorStore = useEditorStore()
const ferramentaStore = useFerramentaStore()

onMounted(() => {
  setupMousePan()
  setupCanvasDrop(canvas.value, clientToCanvasCoordinates)
  setupTabDragging('.subpage', clientToCanvasCoordinates, maybeExpandCanvas)
  // scrollToCanvasPosition(2400, 2400)
  
  watch(
    () => editorStore.canvas.boards.length,
    () => setTimeout(()=>{
      const boardElements = document.querySelectorAll('.board-component')
  boardElements.forEach((el, index) => {
    el.setAttribute('data-board-index', index)
  })
    }, 0)
  )
  setTimeout(()=>{
    if(editorStore.canvas.panPosition.x == 0){
      // let boardWidth = (2000 * editorStore.canvas.scale) / 2
      // let boardHeight = (1700 * editorStore.canvas.scale) / 2
      let bRect = document.querySelector("#"+editorStore.canvas.boards[0].id).getBoundingClientRect()
      // console.log(bRect.width / 2)
      scrollToCanvasPosition(editorStore.canvas.boards[0].posicao.x + bRect.width / 2, editorStore.canvas.boards[0].posicao.y + bRect.height / 2)
    }else{
      scrollToCanvasPosition(editorStore.canvas.panPosition.x, editorStore.canvas.panPosition.y)
    }
  },10)
})


function setupMousePan() {
  let isPanning = false

  canvas.value.addEventListener('mousedown', (e) => {
    if (e.button === 1) {
      isPanning = true
      canvas.value.style.cursor = 'grabbing'
      e.preventDefault()
    }
  })

  window.addEventListener('mousemove', (e) => {
    if (isPanning) {
      // console.log(canvas.value.scrollLeft)
      canvas.value.scrollLeft -= e.movementX
      canvas.value.scrollTop -= e.movementY
    }
  })

  window.addEventListener('mouseup', (e) => {
    if (e.button === 1) {
      isPanning = false
      canvas.value.style.cursor = 'default'
    }
  })
}

function onZoomEmit(action) {
  // função para dar zoom através do popup de zoom
  if (action === '+') zoomTo(editorStore.canvas.scale + 0.2)
  else if (action === '-') zoomTo(editorStore.canvas.scale - 0.2)
else zoomTo(1)
}

function handleWheel(event) {
  // função para dar zoom através do scroll do mouse
  if (event.ctrlKey) {
    event.preventDefault()
    const delta = -event.deltaY
    const zoomFactor = 0.0015
    const newScale = Math.min(Math.max(editorStore.canvas.scale + delta * zoomFactor, 0.1), 2)
    zoomTo(newScale, event.clientX, event.clientY)
  }
}

function updateCanvasSize() {
  const padding = 200
  let width = 0
  let height = 0

  for (const board of editorStore.canvas.boards) {
    const right = board.posicao.x + 1400
    const bottom = board.posicao.y + 700
    width = Math.max(width, right)
    height = Math.max(height, bottom)
  }

  const minWidth = 10000
  const minHeight = 10000

  editorStore.canvas.size.width = Math.max(width + padding, minWidth)
  editorStore.canvas.size.height = Math.max(height + padding, minHeight)
}

function clientToCanvasCoordinates(clientX, clientY) {
  const rect = canvas.value.getBoundingClientRect()
  const scrollLeft = canvas.value.scrollLeft
  const scrollTop = canvas.value.scrollTop

  return {
    x: (clientX - rect.left + scrollLeft) / editorStore.canvas.scale,
    y: (clientY - rect.top + scrollTop) / editorStore.canvas.scale
  }
}

function zoomTo(newScale, clientX = null, clientY = null) {
  const wrapper = canvas.value
  const rect = wrapper.getBoundingClientRect()

  const centerX = clientX !== null ? clientX - rect.left : rect.width / 2
  const centerY = clientY !== null ? clientY - rect.top : rect.height / 2

  const scrollX = wrapper.scrollLeft
  const scrollY = wrapper.scrollTop

  const offsetX = (scrollX + centerX) / editorStore.canvas.scale
  const offsetY = (scrollY + centerY) / editorStore.canvas.scale

  editorStore.canvas.scale = newScale

  wrapper.scrollLeft = offsetX * newScale - centerX
  wrapper.scrollTop = offsetY * newScale - centerY
  // Atualiza com base nas posições reais dos boards, não só o viewport
  nextTick(() => {
    updateCanvasSize()
  })
}

function scrollToCanvasPosition(x, y) {
  const canvasRect = canvas.value.getBoundingClientRect()
  const offsetX = editorStore.canvas.offset.x || 0
  const offsetY = editorStore.canvas.offset.y || 0

  const scrollX = (x + offsetX) * editorStore.canvas.scale - canvasRect.width / 2
  const scrollY = (y + offsetY) * editorStore.canvas.scale - canvasRect.height / 2
  // console.log(scrollX)
  // console.log(scrollY)
  canvas.value.scrollTo({
    left: scrollX,
    top: scrollY,
    behavior: 'smooth'
  })
}


function maybeExpandCanvas(x, y) {
  const padding = 100
  const wrapper = canvas.value
  const scaleFactor = editorStore.canvas.scale

  const visibleWidth = wrapper.clientWidth / scaleFactor
  const visibleHeight = wrapper.clientHeight / scaleFactor

  const scrollX = wrapper.scrollLeft / scaleFactor
  const scrollY = wrapper.scrollTop / scaleFactor

  const rightLimit = scrollX + visibleWidth
  const bottomLimit = scrollY + visibleHeight

  const needsRightExpansion = x + padding > rightLimit
  const needsBottomExpansion = y + padding > bottomLimit
  if (needsRightExpansion) {
    const extra = x + padding - rightLimit
    editorStore.canvas.size.width += extra
  }

  if (needsBottomExpansion) {
    const extra = y + padding - bottomLimit
    editorStore.canvas.size.height += extra
  }

}

provide('expandCanvas', maybeExpandCanvas)
provide('updateExpand', updateCanvasSize)
provide('clientToCanvasCoordinates', clientToCanvasCoordinates)

</script>
<style scoped>
.canvas {
  height: 100%;
  overflow: auto;
  position: relative;
  margin-left: 70px;
  cursor: default;
}

.scale-container {
  transform-origin: 0 0;
}

.inner-canvas {
  position: relative;
}
.ativo{
  border: 2px #ce0224 solid;
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

.drop-active {
  border-color: #aaa;
}

.drop-target {
  background-color: rgb(25, 85, 128);
  border-color: #fff;
  border-style: solid;
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

.drag-drop.can-drop {
  color: #000;
  background-color: #4e4;
}
</style>