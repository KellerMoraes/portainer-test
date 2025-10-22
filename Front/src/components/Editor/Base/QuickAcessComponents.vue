<template>
    <!-- <div style="position: relative; height: 100%;"> -->
            
            <Draggable
            :list="userConfigsStore.quickAcessElements"
            class="d-flex flex-wrap ma-2 quickAccessGroup"
            style="top: 59px; height: 100%; width: 100%; position: absolute; padding-left: 84px ; background-color:  rgb(var(--v-theme-surface));"
            tag="div"
            :clone="clonar"
            :move="checkMove"
            :sort="false"
            :item-key="$cms('id')"
            :group="{ name: group, pull: 'clone', put: true}"
            >
            <template #item="{ element }">
                <v-card v-if="userConfigsStore.quickAcessBarSize > 20" color="#f5f5f5" flat height="120" width="85" style="border: 1px black solid; cursor: grab" class="mx-1 my-1 pt-2 d-flex flex-column align-center">
                    <v-icon size="30">{{ element.icone }}</v-icon>
                    <div class="pa-1 text-center d-flex align-center justify-center" style="height: 50%;">
                        <span class="name-clamp">
                            {{ element.nome }}
                        </span>
                    </div>
                    <v-icon size="32" class="pb-2" color="#d5d5d5">mdi-drag-horizontal</v-icon>
                </v-card>
                <v-card v-else color="#f5f5f5" flat height="60px" width="140px" style="border: 1px black solid; cursor: grab" class="d-flex justify-center align-center mx-1 px-1 my-1 ">
                    <v-icon size="30">{{ element.icone }}</v-icon>
                    <div class="pa-1 text-center d-flex align-center justify-center" style="width: 60%;">
                        <span class="name-clamp">
                            {{ element.nome }}
                        </span>
                    </div>
                    <v-icon size="32" color="#d5d5d5">mdi-drag-vertical</v-icon>
                </v-card>
                
            </template>
        </Draggable>
<!-- </div> -->
</template>
<script setup>
import { useUserConfigStore } from '@/stores/userConfigs';
import Draggable from 'vuedraggable';
import { criarElemento } from "@/model/Elementos";
import { $cms } from '@/helpers/cmsProviderHelper';
const group = ref(null)

function clonar(item) {
    group.value = item.grupo
    return criarElemento(item.compName, {icon: item.icone , group: item.grupo})
  
}
function checkMove(evt) {
    if( evt.to.classList.contains('quickAccessGroup') && userConfigsStore.quickAcessElements.find((item)=>{return item.nome == evt.draggedContext.element.nome})){
        return false
    }
}
const userConfigsStore = useUserConfigStore()
</script>
<style>
.name-clamp {
  display: -webkit-box !important;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  word-break: auto-phrase;
  line-height: 1.3em;
   font-size: 14px;
   font-family: Inter;
}
</style>