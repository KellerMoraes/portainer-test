<template>
  <div v-if="ferramentaStore.editorConfigs">
    <EditorMenuConfigComponentesTextoSegmentoFontSegment :config="ferramentaStore.editorConfigs"></EditorMenuConfigComponentesTextoSegmentoFontSegment>
    <EditorMenuConfigComponentesTextoSegmentoTextSettingsSegment :config="ferramentaStore.editorConfigs"></EditorMenuConfigComponentesTextoSegmentoTextSettingsSegment>
    <EditorMenuConfigComponentesTextoSegmentoColorSegment :config="ferramentaStore.editorConfigs"></EditorMenuConfigComponentesTextoSegmentoColorSegment>
    <EditorMenuConfigComponentesTextoSegmentoDecorationSegment :config="ferramentaStore.editorConfigs"></EditorMenuConfigComponentesTextoSegmentoDecorationSegment>
    <!-- <FontSegment :config="ferramentaStore.editorConfigs"></FontSegment> -->
    <!-- <TextSettingsSegment :config="ferramentaStore.editorConfigs"></TextSettingsSegment>
    <ColorSegment :config="ferramentaStore.editorConfigs"></ColorSegment>
    <DecorationSegment :config="ferramentaStore.editorConfigs"></DecorationSegment> -->
  </div>
</template>
<script setup>
import { useFerramentaStore } from '@/stores/ferramenta'
// import FontSegment from '@/components/Menu/Config/Componentes/TextoSegmento/FontSegment.vue'
// import TextSettingsSegment from './TextoSegmento/TextSettingsSegment.vue'
// import ColorSegment from './TextoSegmento/ColorSegment.vue'
// import DecorationSegment from './TextoSegmento/DecorationSegment.vue'
const ferramentaStore = useFerramentaStore()
const props = defineProps(["configList"])

</script>
<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

.tituloConfig {
  font-family: "Roboto", sans-serif;
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 6px;
  color: #FFB30C;
}

.btnAtivo {
  background-color: #ffc107;
  color: rgb(255, 255, 255);
}

.disabled {
  color: grey;
}
</style>