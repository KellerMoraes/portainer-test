<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <EditorBaseComponenteItem v-model="dados">
    <template
      v-if="dados"
      #edicao
    >
    <v-card :style="dados.atributos">
      <v-card-title @dblclick="habilitarEditavel(dados.conteudo.titulo,1)">
        <EditorBaseConteudoEditavel
              v-model:conteudo="dados.conteudo.titulo"
              v-model:editavel="editaveis[1]"
            />
      </v-card-title>
      <v-card-subtitle @dblclick="habilitarEditavel(dados.conteudo.subtitulo,2)">
        <EditorBaseConteudoEditavel
              v-model:conteudo="dados.conteudo.subtitulo"
              v-model:editavel="editaveis[2]"
            />
      </v-card-subtitle>
      <v-card-text @dblclick="habilitarEditavel(dados.conteudo.texto,3)">
        <EditorBaseConteudoEditavel
              v-model:conteudo="dados.conteudo.texto"
              v-model:editavel="editaveis[3]"
            />
      </v-card-text>
      <v-card-actions></v-card-actions>
    </v-card>
    
    </template>
    
  </EditorBaseComponenteItem>
  <!-- <div
:id="dados[$cms('id')] ?? ''"
class="v-card v-sheet theme--light elevation-0"
:style="dados.atributos"
>
<div class="card-text ml-5">
  <div
    class="tituloCard"
    @dblclick="habilitarEditavel(dados.conteudo.titulo,1)"
  >
    <BaseConteudoEditavel
      v-model:conteudo="dados.conteudo.titulo"
      v-model:editavel="editaveis[1]"
    />
  </div>
  <small
    class="subtituloCard "
    @dblclick="habilitarEditavel(dados.conteudo.subtitulo,2)"
  >
    <BaseConteudoEditavel
      v-model:conteudo="dados.conteudo.subtitulo"
      v-model:editavel="editaveis[2]"
    />
  </small>
  <p
    class="textoCard"
    @dblclick="habilitarEditavel(dados.conteudo.texto,3)"
  >
    <BaseConteudoEditavel
      v-model:conteudo="dados.conteudo.texto"
      v-model:editavel="editaveis[3]"
    />
  </p>
</div>
<div
  class="v-card__actions"
  style="display: table; width: 100%; text-align: right; padding: 0"
/>
</div> -->
</template>
<script setup>
import { $cms } from '@/helpers/cmsProviderHelper';
import { useEditorStore } from '@/stores/editor.js';
let dados = defineModel()
let editaveis = ref([false,false,false])
const editorStore = useEditorStore()
function habilitarEditavel(valor,i) {
  // eslint-disable-next-line no-undef
      console.log(editaveis)
      editaveis.value[i] = true
      editorStore.campoSelecionado = valor
    }
</script>
<style>
.editavelHabilitado{
  border: 2px black solid;
  border-radius: 5px;
}
.editavelDesabilitado{
  border: none;
}
.tituloCard{
    font-family: Roboto;
    font-size: 24px;
    margin-bottom: 10px;
}
.subtituloCard{
    
    font-family: "Roboto", sans-serif;
    font-size: 22px;
    font-weight: 300;
    font-style: italic;
}
.textoCard{
    font-size: 20px;
    font-family: "Roboto", sans-serif;
    font-weight: 300;
    font-style: normal;
    margin-top: 10px;
}
</style>
