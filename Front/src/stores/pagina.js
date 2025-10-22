import { defineStore } from 'pinia';
import { criarElemento } from "@/model/Elementos";
import { ref, computed } from 'vue';
import _pagina from '@/services/paginas'
import { $cms } from '@/helpers/cmsProviderHelper';

export const usePaginaStore = defineStore('pagina', () => {
  const pagina = ref(null)
  const paginaAtual = computed(() => pagina)
  const subpaginaAtiva = ref(null)
  
  
  // const boards = ref([{
    //   nome: pagina.value[$cms('container')][0][$cms('name')], 
    //   id: pagina.value[$cms('container')][0][$cms('id')], 
    //   posicao: { x: 1800, y: 1800 }, 
    //   subpaginas: pagina.value[$cms('container')], 
    //   subpaginaAtiva: 0
    // }])
  function loadPage(page){
    pagina.value = page
    MudarSubPaginaAtiva(0)
  }
  function save(){
    _pagina.alterar(pagina.value).then(()=>{console.log("Salvando")}).finally(()=>{console.log("Salvo")})
  }
  function MudarSubPaginaAtiva(index) {
    subpaginaAtiva.value = pagina.value[$cms('content')][index]
  }

  function deletarLinha() {
    subpaginaAtiva.value[$cms('container')].pop()
  }
  
  // Função para adicionar um novo board
  function addBoard(newBoard) {
    boards.value.push(newBoard);
    
    // Atualizar a estrutura da página se necessário
    // Dependendo da sua lógica, pode ser necessário atualizar pagina.value[$cms('container')]
  }
  
  // Função para remover um board
  function removeBoard(boardId) {
    const index = boards.value.findIndex(b => b.id === boardId);
    if (index >= 0) {
      boards.value.splice(index, 1);
      
      // Atualizar a estrutura da página se necessário
      // Dependendo da sua lógica, pode ser necessário atualizar pagina.value[$cms('container')]
    }
  }
  
  // Função para reordenar subpáginas dentro de um board
  function reorderSubpaginas(boardId, newOrder) {
    const board = boards.value.find(b => b.id === boardId);
    if (board) {
      // newOrder deve ser um array de índices na nova ordem
      const reorderedSubpaginas = newOrder.map(index => board.subpaginas[index]);
      board.subpaginas = reorderedSubpaginas;
    }
  }
  
  // Função para transferir uma subpágina entre boards
  function transferSubpagina(sourceBoardId, sourceIndex, targetBoardId, targetIndex = -1) {
    const sourceBoard = boards.value.find(b => b.id === sourceBoardId);
    const targetBoard = boards.value.find(b => b.id === targetBoardId);
    
    if (!sourceBoard || !targetBoard) return;
    
    // Obter a subpágina a ser transferida
    const subpagina = sourceBoard.subpaginas[sourceIndex];
    
    // Remover do board de origem
    sourceBoard.subpaginas.splice(sourceIndex, 1);
    
    // Ajustar índice ativo do source board se necessário
    if (sourceBoard.subpaginaAtiva >= sourceBoard.subpaginas.length) {
      sourceBoard.subpaginaAtiva = Math.max(0, sourceBoard.subpaginas.length - 1);
    }
    
    // Adicionar ao board de destino na posição especificada ou no final
    if (targetIndex >= 0 && targetIndex <= targetBoard.subpaginas.length) {
      targetBoard.subpaginas.splice(targetIndex, 0, subpagina);
    } else {
      targetBoard.subpaginas.push(subpagina);
    }
    
    // Se o board de origem ficar vazio (sem subpáginas), remova-o
    if (sourceBoard.subpaginas.length === 0) {
      removeBoard(sourceBoardId);
    }
    
    // Atualizar a estrutura da página se necessário para refletir as mudanças
    // Isso depende de como você está mantendo a relação entre boards e a estrutura da página
  }
  
  // Função para fazer detach (separar uma subpágina em um novo board)
  function detachSubpagina(boardId, subpaginaIndex, newPosition) {
    const sourceBoard = boards.value.find(b => b.id === boardId);
    
    if (!sourceBoard || sourceBoard.subpaginas.length <= 1) {
      console.warn('Não é possível destacar a única subpágina de um board');
      return null;
    }
    
    // Obter a subpágina a ser destacada
    const subpagina = sourceBoard.subpaginas[subpaginaIndex];
    
    // Remover do board original
    sourceBoard.subpaginas.splice(subpaginaIndex, 1);
    
    // Ajustar índice ativo do source board se necessário
    if (sourceBoard.subpaginaAtiva >= sourceBoard.subpaginas.length) {
      sourceBoard.subpaginaAtiva = Math.max(0, sourceBoard.subpaginas.length - 1);
    }
    
    // Criar um novo board com a subpágina
    const newBoardId = $cms('id') + '-' + Date.now(); // Gerar ID único
    const newBoard = {
      nome: subpagina.nome || subpagina[$cms('name')],
      id: newBoardId,
      posicao: newPosition || { 
        x: sourceBoard.posicao.x + 500, 
        y: sourceBoard.posicao.y 
      },
      subpaginas: [subpagina],
      subpaginaAtiva: 0
    };
    
    // Adicionar o novo board
    boards.value.push(newBoard);
    
    return newBoard;
  }
      
  return {
    pagina,
    subpaginaAtiva, 
    paginaAtual,
    deletarLinha,
    save, 
    MudarSubPaginaAtiva,
    addBoard,
    removeBoard,
    reorderSubpaginas,
    transferSubpagina,
    detachSubpagina,
    loadPage
  }
});