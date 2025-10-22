<template>
  <transition name="fade" appear>
    <div class="mainZoom" v-if="show">
      <strong class="mx-2">
        {{ Math.round(editorStore.canvas.scale * 100) + 30 }}%
      </strong>
      <v-btn variant="text" @click="zoom('+')" class="ml-1" icon="mdi-minus"></v-btn>
      <v-btn variant="text" @click="zoom('-')" class="mr-1" icon="mdi-plus"></v-btn>
      <!-- <v-btn variant="tonal" @click="zoom('reset')" class="mx-1">
        Redefinir <v-icon class="mx-1">mdi-magnify-expand</v-icon>
      </v-btn> -->
    </div>
  </transition>
</template>

<script setup>
import { useEditorStore } from '@/stores/editor';
import { storeToRefs } from 'pinia'
import { watch, ref } from 'vue'

const editorStore = useEditorStore()
const { canvas } = storeToRefs(editorStore)
const show = ref(false)
const emit = defineEmits(['zoomEmit'])

let timeoutId = null

watch(
  () => canvas.value.scale,
  (newScale, oldScale) => {
    if (newScale !== oldScale) {
      show.value = true

      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        show.value = false
      }, 5000)
    }
  }
)
function zoom(param) {
  emit('zoomEmit', param); // "+" | "-" | "reset"
}
</script>

<style lang="scss">
.mainZoom {
  position: fixed;
  right: 26%;
  top: 15%;
  background-color: rgb(37, 37, 37);
  margin: 0.5%;
  padding: 0.4%;
  z-index: 800;
  border-radius: 6px;
  border: 1px rgba(138, 138, 138, 0.644) solid;
  display: flex;
  align-items: center;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
