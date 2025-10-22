/* eslint-disable vue/multi-word-component-names */
/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'
import './assets/styles/cms.scss'
import properties from '../config';

import Titulo from '@/components/Editor/Menu/Componentes/Titulos/Titulo.vue'
import Botao from '@/components/Editor/Menu/Componentes/Botoes/Botao.vue'
import Paragrafo from '@/components/Editor/Menu/Componentes/Paragrafos/Paragrafo.vue'
import Card from '@/components/Editor/Menu/Componentes/Cards/Card.vue'
import Container from '@/components/Editor/Menu/Componentes/Container/Container.vue'
import GridCell from '@/components/Editor/Base/BaseGridCell.vue'
import Campo from '@/components/Editor/Menu/Componentes/Formularios/Campo.vue'
import CampoNome from '@/components/Editor/Menu/Componentes/Formularios/Campos/Nome.vue'
import CampoCPF from '@/components/Editor/Menu/Componentes/Formularios/Campos/CPF.vue'
import CampoDescricao from '@/components/Editor/Menu/Componentes/Formularios/Campos/Descricao.vue'
import CampoEmail from '@/components/Editor/Menu/Componentes/Formularios/Campos/Email.vue'
import CampoBlank from '@/components/Editor/Menu/Componentes/Formularios/Campos/Blank.vue'
import CampoTelefone from '@/components/Editor/Menu/Componentes/Formularios/Campos/Telefone.vue'
import Selecionavel from '@/components/Editor/Menu/Componentes/Formularios/Selecionavel.vue'
import ConfigInput from '@/components/Editor/Menu/Config/Componentes/Input.vue'
import ConfigGridMaker from '@/components/Editor/Menu/Config/Componentes/GridMaker.vue'
import ConfigDimensoes from '@/components/Editor/Menu/Config/Componentes/Dimensoes.vue'
import ConfigTexto from '@/components/Editor/Menu/Config/Componentes/Texto.vue'
import Linha from '@/components/Editor/Menu/Componentes/Genericos/Linha.vue'
import Coluna from '@/components/Editor/Menu/Componentes/Genericos/Coluna.vue'
import Formulario from '@/components/Editor/Menu/Componentes/Formularios/Formulario.vue'
import { injectVuetifyToDraggable } from '@/plugins/vuetifyCompsToDraggable'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import EditorLayout from '@/layouts/EditorLayout.vue'
injectVuetifyToDraggable()
// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'
const app = createApp(App)
const cmsHelper = (key) => properties[key];

let prefixoComp = "Comp"
let prefixoConfig = "Config"
let prefixoCampo = "Campo"
registerPlugins(app)
// nome do "Comp" precisa ser sucedido do nome definido no JSON, igual o valor da propriedade "nome"
app.provide('$cms', cmsHelper);
app.component('Base'+'GridCell', GridCell);
app.component(prefixoComp+'Linha', Linha);
app.component(prefixoComp+'Coluna', Coluna);
app.component(prefixoComp+'Formulario', Formulario);
app.component(prefixoComp+'Titulo', Titulo);
app.component(prefixoComp+'Botao', Botao);
app.component(prefixoComp+'Card', Card);
app.component(prefixoComp+'Container', Container);
app.component(prefixoComp+'Paragrafo', Paragrafo);
app.component(prefixoComp+'Campo', Campo);
app.component(prefixoComp+'Selecionavel', Selecionavel);
app.component(prefixoConfig+'Input', ConfigInput);
app.component(prefixoConfig+'Texto', ConfigTexto);
app.component(prefixoConfig+'GridMaker', ConfigGridMaker);
app.component(prefixoConfig+'Dimensoes', ConfigDimensoes);
app.component(prefixoCampo+'Nome', CampoNome);
app.component(prefixoCampo+'CPF', CampoCPF);
app.component(prefixoCampo+'Telefone', CampoTelefone);
app.component(prefixoCampo+'Email', CampoEmail);
app.component(prefixoCampo+'Descricao', CampoDescricao);
app.component(prefixoCampo+'Blank', CampoBlank);
app.component('DefaultLayout', DefaultLayout)
app.component('EditorLayout', EditorLayout)
app.mount('#app')
