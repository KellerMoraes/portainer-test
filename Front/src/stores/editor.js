import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';
import { usePaginaStore } from '@/stores/pagina'
import { $cms } from '@/helpers/cmsProviderHelper';
import { criarElemento } from "@/model/Elementos";

export const useEditorStore = defineStore('editor', () => {
  const paginaStore = usePaginaStore()
  // Edição de Componentes
  const campoSelecionado =  reactive({})
  // Barra lateral Comps
  const opcaoComponenteSelecionado = ref(false)
  const recursoSelecionado = ref(false)
  // Config Canvas
  const canvas = ref({
    boards: [
      criarElemento('Board', {
        subpaginas: JSON.parse(JSON.stringify(paginaStore.pagina[$cms('content')])),
        posicao: { x: 5000, y: 5000 },
        subpaginaAtiva:0,
        subpaginaAtivaId:paginaStore.pagina[$cms('content')][0][$cms('id')],
      })
    ],
    scale: 0.6,
    panPosition: {x:0, y:0},
    size: {height: 10000,width: 10000},
    offset: { x: 0, y: 0 }
    })


    function selecionarRecurso(recurso){
      this.recursoSelecionado = recurso
      this.opcaoComponenteSelecionado = true
    }
    
    function adicionarBoard({ subpaginas = [], posicao }) {
      const subpaginasClone = subpaginas.map(sp => JSON.parse(JSON.stringify(sp)))
      const novoBoard = criarElemento('Board', { subpaginas: subpaginasClone, posicao })
      canvas.value.boards.push(novoBoard)
      return novoBoard[$cms('id')]
    }
  function removerBoard(id) {
    const index = canvas.value.boards.findIndex(b => b.id === id);
    if (index !== -1) {
      canvas.value.boards.splice(index, 1);
    }
  }
  function subpageManipulationOnBoards(
    idBoardRemover,
    idSubpage,
    idBoardAdicionar,
    posicao = { x: 2600, y: 1800 },
    boardExistenteParaCriar = null // <- opcional
  ) {
    const boards = canvas.value.boards;
  
    const boardRemoverIndex = boards.findIndex(b => b.id === idBoardRemover);
    if (boardRemoverIndex === -1) return;
  
    const boardRemover = boards[boardRemoverIndex];
    const subpageIndex = boardRemover.subpaginas.findIndex(s => s.id === idSubpage);
    if (subpageIndex === -1) return;
  
    const [subpage] = boardRemover.subpaginas.splice(subpageIndex, 1);
  
    let removedEmptyBoard = false;
    let removedBoardPosition = null;
  
    if (boardRemover.subpaginas.length === 0) {
      removedBoardPosition = boardRemover.posicao;
      boards.splice(boardRemoverIndex, 1);
      removedEmptyBoard = true;
    }
  
    if (idBoardAdicionar) {
      const boardAdd = boards.find(b => b.id === idBoardAdicionar);
      if (boardAdd) {
        boardAdd.subpaginas.push(subpage);
      }
    } else {
      const novoBoard = boardExistenteParaCriar
        ? boardExistenteParaCriar
        : criarElemento('Board', {
            subpaginas: [subpage],
            posicao
          });
  
          if (!boardExistenteParaCriar) {
            novoBoard.subpaginas = [subpage];
            novoBoard.posicao = posicao;
          
            // ⬇️ Adicione isso aqui:
            novoBoard.subpaginaAtiva = 0;
            novoBoard.subpaginaAtivaId = subpage.id;
          }
  
      boards.push(novoBoard);
  
      return {
        createdBoard: novoBoard,
        removedEmptyBoard,
        removedBoardPosition
      };
    }
  
    return {
      removedEmptyBoard,
      removedBoardPosition
    };
  }
  return {
    canvas,
    campoSelecionado,
    opcaoComponenteSelecionado,
    recursoSelecionado,
    selecionarRecurso,
    adicionarBoard,
    removerBoard,
    subpageManipulationOnBoards
  };
})