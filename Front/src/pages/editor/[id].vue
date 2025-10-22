<template>
    <div v-if="!loaded">
      Teste
    </div>
    <div v-else>

      <v-toolbar
      style="z-index: 1005;border-bottom: 1px #e1e1e1 solid;  position: fixed; background-color:  rgb(var(--v-theme-surface));"
      >
      <EditorFerramentas />
    </v-toolbar>
    <div>
      
      <EditorMenuComponente />
    </div>
    <Splitpanes  @resize="disableTextSelection($event, 'horizontal')" @resized="enableTextSelection" :push-other-panes="true" horizontal style="position: absolute;" :class="{'default-theme': true, 'telasDivisao': true}" >
      <Pane :size="userConfigsStore.quickAcessBarSize" max-size="30" style="position: relative;" min-size="7">
        <EditorBaseQuickAcessComponents></EditorBaseQuickAcessComponents>
      </Pane>
      <Pane :size="100 - userConfigsStore.quickAcessBarSize" min-size="70" max-size="93">
        <Splitpanes @resize="disableTextSelection($event, 'vertical')" @splitter-dblclick="userConfigsStore.configBarSize = maxConfigBarSize" @resized="enableTextSelection" :class="{'default-theme': true, 'telasDivisao': true}">
          <Pane min-size="70" :size="100 - userConfigsStore.configBarSize" max-size="80">
            <EditorBaseCanvas></EditorBaseCanvas>
            <!-- Conteúdo principal -->
          </Pane>
          <Pane min-size="20" style="z-index: 500" :size="userConfigsStore.configBarSize" :max-size="maxConfigBarSize">
            <EditorMenuConfiguracao  />
            <!-- painel configurador -->
          </Pane>
        </Splitpanes>
      </Pane>
    </Splitpanes>
  </div>

 </template>
 
 <script setup>
 import { useUserConfigStore } from '@/stores/userConfigs.js';
import useCms from '@/composables/useCms';
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'
import { useRoute } from 'vue-router'
import pagina from '@/services/paginas';
import { usePaginaStore } from '@/stores/pagina';
const route = useRoute()
const loaded = ref(false)
// ARRUMAR O DUPLO CLIQUE PARA DIMINUIR A BARRA MAS TAMBÉM CONTABILIZAR OS VALORES DA STORE

// VARIAVEIS TEMPLATE
onMounted(async ()=>{
  pagina.buscar(route.params.id).then((response)=>{
    console.log(response)
    usePaginaStore().loadPage(response)
  }).finally(()=>{
    loaded.value = true
  })
})
// const idKey = $cms('id')
const maxConfigBarSize = ref(30)
// const tamanhoBarraConfig = ref(25)

 let userConfigsStore = useUserConfigStore();
 function disableTextSelection(e,direction) {
  document.body.style.userSelect = 'none';
  if(direction == 'vertical'){
    userConfigsStore.configBarSize = e.nextPane.size
  return
  }
  userConfigsStore.quickAcessBarSize = e.prevPane.size
  // console.log(e)
}

function enableTextSelection() {
  document.body.style.userSelect = '';
}

 
 </script>
 <style lang="scss">
/* .default-theme.splitpanes__splitter {background-color: #ccc;position: relative;} */
.splitpanes.default-theme .splitpanes__pane{
  background: var(--v-theme-surface);
}
.default-theme.splitpanes--horizontal>.splitpanes__splitter, .default-theme .splitpanes--horizontal>.splitpanes__splitter{
  // largura redimensionador
  // width: 10px;
  height: 12px;
  border-top: none;
}
.default-theme.splitpanes--vertical>.splitpanes__splitter, .default-theme .splitpanes--vertical>.splitpanes__splitter{
  // largura redimensionador
  width: 10px;
  border-left: none;
}
.v-theme--light{
  .splitpanes.default-theme .splitpanes__splitter{
    // cor redimensionador
    transition: 0.5s;
    background-color: #9c9c9c;
    position: relative;
  }
  .splitpanes.default-theme .splitpanes__splitter:hover{
    // cor redimensionador hover
    transition: 0.5s;
    background-color: rgb(70, 70, 70);
    position: relative;
  }
  .splitpanes.default-theme .splitpanes__splitter:before, .splitpanes.default-theme .splitpanes__splitter:after{
    // cor mini linhas dentro do redimensionador
    background-color: rgb(219, 219, 219);
  }
  .splitpanes.default-theme .splitpanes__splitter:hover:before, .splitpanes.default-theme .splitpanes__splitter:hover:after{
    // cor mini linhas dentro do redimensionador hover
    background-color: rgb(255, 255, 255);
  }
  
}
.v-theme--dark{
  .splitpanes.default-theme .splitpanes__splitter{
    // cor redimensionador
    transition: 0.5s;
    background-color: rgb(88, 88, 88);
    position: relative;
  }
  .splitpanes.default-theme .splitpanes__splitter:hover{
    // cor redimensionador hover
    transition: 0.5s;
    background-color: #e9e9e9;
    position: relative;
  }
  .splitpanes.default-theme .splitpanes__splitter:before, .splitpanes.default-theme .splitpanes__splitter:after{
    // cor mini linhas dentro do redimensionador
    background-color: rgb(194, 194, 194);
  }
  .splitpanes.default-theme .splitpanes__splitter:hover:before, .splitpanes.default-theme .splitpanes__splitter:hover:after{
    // cor mini linhas dentro do redimensionador hover
    background-color: rgb(56, 56, 56);
  }
  
}
.splitpanes {
  z-index: 500;
}
    </style>
 
 <style scoped lang="scss">
 .viewport-container{
  width: 85vw;
 }
 main {
   height: 100%;
   width: 100%;
 }
 .telasDivisao{
z-index: 500;
}
 
 .abas{
  width: 100%;
  border-radius: 12px 12px 0px 0px;
 }
 .abaSubpages{
  height: 50px;
  &.selecionado{
    border-bottom: white 1px solid
  }
 }
 .abaWrap{
  width: 95%;
 }
 .flutuante{
  top: 0;
  left: 0;
  position: absolute;
 }
 .containerSpace{
  padding-top: 80px;
 }
 .panOn:hover{
   cursor: grab;
 
 }
 
 </style>
