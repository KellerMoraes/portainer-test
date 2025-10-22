import { defineStore } from 'pinia';
import { ref} from 'vue';
import { usePaginaStore } from './pagina';
import RemoverElementoCommand from '@/command/comandoRemover';
import { useCommandStore } from './command';
import DuplicarElementoCommand from '@/command/comandoDuplicar';
import { useUserConfigStore } from './userConfigs';
import { $cms } from '@/helpers/cmsProviderHelper';
import { criarElemento } from '@/model/Elementos';

export const useFerramentaStore = defineStore('ferramenta', () => {
  const itemSelecionado = ref(null);
  const nivelSelecionado = ref(null);
  const pathSelecionado = ref([]);
  const itemCopiado = ref(null);
  const tipoSelecionado = ref('Pagina');
  const corSelecionada = ref('#ce0224');
  
  function selecionarItem(item, nivel, path, tipo, cor) {
    if(tipo !== "Componente"){
      editorId.value = null
    }
    itemSelecionado.value = item;
    nivelSelecionado.value = nivel;
    pathSelecionado.value = path;
    tipoSelecionado.value = tipo;
    corSelecionada.value = cor;
  }
  
  function selecionarLinha(linha, path) {
    selecionarItem(linha,3, path, 'Linha', 'green');
  }
  
  function selecionarColuna(coluna, path) {
    selecionarItem(coluna,4, path, 'Coluna', 'blue');
  }
  
  function selecionarComponente(componente, path) {
    selecionarItem(componente,5, path, 'Componente', 'purple');
  }
  function selecionarBoard(board) {
    selecionarItem(board, 1,null, 'Board', "white" );
  }
  function selecionarSubpagina(subpagina, path) {
    let sub = usePaginaStore()[$cms('page')]?.[$cms('content')].find((sub)=>{return sub.id == subpagina.id})
    selecionarItem({sp: sub, boardId: subpagina.boardId ?? subpagina.getAttribute("data-board-id") },2, [path], 'Subpagina', "#3b3b3b" );
  }
  function removerSelecao() {
    selecionarItem(null,0, null, 'Pagina', '#ce0224');
  }
  
  function deletarElemento() {
    if(nivelSelecionado.value > 1){
      let comandoExcluir = new RemoverElementoCommand({origem:{path: pathSelecionado.value.slice(0, -1), index:pathSelecionado.value[pathSelecionado.value.length - 1].index}})
      useCommandStore().executar(comandoExcluir)
    }
  }
  function duplicarElemento() {
    // só vai executar se o nivel for do contexto que pode duplicar e também se ligar no path de subpaginas e tals, já que pode duplicar
    if(nivelSelecionado.value > 1){
      let comandoDuplicar = new DuplicarElementoCommand({item: null, origem: {path: pathSelecionado.value.slice(0,-1) ,index: pathSelecionado.value[pathSelecionado.value.length - 1].index }})
      useCommandStore().executar(comandoDuplicar)
    }
  }
  function copiarElemento() {
    // só vai executar se o nivel for do contexto que pode duplicar e também se ligar no path de subpaginas e tals, já que pode duplicar
    if(nivelSelecionado.value > 1){
      useUserConfigStore().clipboard = JSON.parse(JSON.stringify({item: itemSelecionado.value?.sp ?? itemSelecionado.value, path: pathSelecionado.value, paginaOrigemId: usePaginaStore().pagina.id, nivel: nivelSelecionado.value}))
    }
  }
  function colarElemento() {
function descobrirPathDeDestino(pathSelecionado) {
  const paginaStore = usePaginaStore()
  const userConfigStore = useUserConfigStore()
  const estrutura = paginaStore.pagina
  const selecionado = itemSelecionado.value?.sp ?? itemSelecionado.value
  const clipboard = userConfigStore.clipboard
  const container = selecionado?.[$cms('container')]
  const tipoSelecionado = selecionado?.tipo
  const tipoCopiado = clipboard.item?.tipo
  const tipoUltimo = clipboard.path?.slice(-1)?.[0]?.tipo
  let tipoProcurado = clipboard.path?.findLast(p => p.tipo !== 'Componente')?.tipo ?? clipboard.path?.[0]?.tipo

  // Se a subpágina estiver vazia
  if (itemSelecionado.value?.sp?.[$cms('container')]?.length === 0) {
    return pathSelecionado.slice()
  }

  // Caso especial: colando um componente dentro de outro componente que NÃO aceita filhos
  if (
    tipoCopiado === 'Componente' &&
    tipoSelecionado === 'Componente' &&
    !Array.isArray(container)
  ) {
    return pathSelecionado.slice(0, -1)
  }

  // Novo caso: tipoProcurado já é igual ao tipoSelecionado (ex: colando coluna em linha)
  if (tipoProcurado === tipoSelecionado) {
    return pathSelecionado.slice()
  }

  // Casos onde o item copiado e o selecionado são iguais e o selecionado aceita filhos
  if (
    tipoCopiado === tipoSelecionado &&
    Array.isArray(container)
  ) {
    return tipoCopiado === 'Componente'
      ? pathSelecionado.slice()
      : pathSelecionado.slice(0, -1)
  }

  // Fallback: reconstruir caminho até o tipoProcurado
  const pathFinal = []

  function construirPath(item, tipo, indice = 0) {
    const filhos = item?.[$cms('container')]
    if (!Array.isArray(filhos)) return []

    const idx = pathSelecionado?.[indice]?.index ?? 0
    const encontrado = filhos[idx]
    if (!encontrado) return []

    pathFinal.push({
      id: encontrado[$cms('id')],
      tipo: encontrado[$cms('type')],
      index: idx
    })

    if (encontrado[$cms('type')] === tipo) {
      return pathFinal
    }

    return construirPath(encontrado, tipo, indice + 1)
  }

  return construirPath(estrutura, tipoProcurado)
}
if(nivelSelecionado.value > 0 && useUserConfigStore().clipboard ){
  if(pathSelecionado.value?.tipo == 'subpagina' && itemSelecionado.value?.sp[$cms('container')]?.length == 0){
    // significa que não tem linha na subpagina
    
    return
  }
  
  const clipboard = useUserConfigStore().clipboard
const itemCopiado = clipboard.item
const tipoCopiado = itemCopiado.tipo

const pathDestino = descobrirPathDeDestino(
  pathSelecionado.value,
)
console.log(pathDestino)
let novoItem = null

if (pathDestino.length === 1) {
  switch (tipoCopiado) {
    case 'Componente':
      novoItem = criarElemento('Linha', { component: itemCopiado })
      novoItem.altered = true
      break
      case 'Coluna':
        const linha = criarElemento('Linha')
        linha[$cms('container')] = [itemCopiado]
        novoItem = linha
        novoItem.altered = true
      break
  }
}
const comandoDuplicar = new DuplicarElementoCommand({
  item: novoItem ?? itemCopiado,
  origem: {
    path: clipboard.path.slice(0, -1),
    index: clipboard.path.at(-1).index,
    paginaId: clipboard.paginaOrigemId,
  },
  destino: {
    path: pathDestino,
    index:
  !Array.isArray(itemSelecionado.value?.[$cms('container')])
    ? pathSelecionado.value?.at(-1).index + 1
    : itemSelecionado.value?.tipo !== tipoCopiado
      ? 0
      : itemSelecionado.value?.tipo === 'Componente'
        ? 0
        : pathSelecionado.value?.at(-1).index + 1,
  },
})
useCommandStore().executar(comandoDuplicar)
    }
  }
// Variaveis e Funções - RichText
 const editor = ref(null)
 const editorConfigs = ref(null)
 const editorId = ref(false)
  function setEditor(instance) {
      editor.value = instance
  }
  function setEditorConfig(config) {
      editorConfigs.value = config
  }

  return {
    itemSelecionado,
    pathSelecionado,
    tipoSelecionado,
    corSelecionada,
    nivelSelecionado,
    itemCopiado,
    selecionarBoard,
    selecionarLinha,
    selecionarColuna,
    selecionarComponente,
    selecionarSubpagina,
    removerSelecao,
    deletarElemento,
    duplicarElemento,
    copiarElemento,
    colarElemento,
    //richText
    setEditor,
    setEditorConfig,
    editor,
    editorConfigs,
    editorId,

    //richText
  };
});
