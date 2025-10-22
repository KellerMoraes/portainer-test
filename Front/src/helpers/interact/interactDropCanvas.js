import interact from 'interactjs';
import { useEditorStore } from '@/stores/editor.js';
import { ref } from 'vue';
import { MoveSubpageCommand } from '@/command/comandoMoveSubpage';
import { useCommandStore } from '@/stores/command';
const ghost = ref(null);

function createGhost(el, e) {
  const editorStore = useEditorStore() 
  const scale = editorStore.canvas.scale;
  const parent = el.closest(".board");
  const rect = el.getBoundingClientRect();
  const rectP = parent.getBoundingClientRect();
  
  // Criar clone do elemento
  ghost.value = el.cloneNode(true);
  
  // Preparar cabeçalho do ghost
  const headGhost = parent.querySelector(".abas").cloneNode(true);
  headGhost.querySelectorAll(".subpage").forEach(subpage => {
    if (subpage.id !== el.id) {
      subpage.remove();
    } else {
      subpage.style.transform = "";
      subpage.style.height = `${rect.height / scale}px`;
      subpage.classList.add("d-flex", "align-center");
    }
  });
  
  // Adicionar conteúdo ao ghost
  const contentGhost = parent.querySelector(".content").cloneNode(true);
  contentGhost.style.height = "100%";
  ghost.value.appendChild(headGhost);
  ghost.value.appendChild(contentGhost);
  // Estilizar o ghost
  Object.assign(ghost.value.style, {
    position: 'absolute',
    pointerEvents: 'none',
    opacity: 1,
    zIndex: 300,
    margin: 0,
    // left: `${parseFloat(parent.dataset.x - el.getBoundingClientRect().x)}px`,
    // top: `${parseFloat(parent.dataset.y)}px`,
    width: `${parseFloat(parent.style.width)}px`, // Sem multiplicar por scale
    height: `${parseFloat(parent.style.minHeight)}px`
  });
  
  ghost.value.classList.add('ghost', 'board');
  ghost.value.classList.remove('subpage');
  ghost.value.removeAttribute('id');
  
  document.querySelector(".inner-canvas").appendChild(ghost.value);
  
  // Posicionar ghost conforme o evento
  if (e && ghost.value) {
  
    const offsetX = e.client.x - rect.left;
    const offsetY = e.client.y - rect.top;
    const moveX = (e.client.x - offsetX) / scale;
    const moveY = (e.client.y - offsetY) / scale;
    
    ghost.value.setAttribute('data-x', moveX);
    ghost.value.setAttribute('data-y', moveY);
  }
}

function sortBoardSubpages(e) {
  const store = useEditorStore();
  const board = store.canvas.boards.find(b => b.id === e.target.dataset.boardId);
  if (!board) return;
  
  const abaWrap = document.getElementById(e.target.dataset.boardId);
  if (!abaWrap) return;
  
  // Reordenar subpáginas
  const domSubpaginas = Array.from(abaWrap.querySelectorAll('.subpage'))
    .sort((a, b) => parseInt(a.dataset.index) - parseInt(b.dataset.index));
    
  board.subpaginas = domSubpaginas.map(domEl => 
    board.subpaginas.find(s => s.id === domEl.id)
  );
  
  // Limpar estilos
  e.target.classList.remove("dragging");
  abaWrap.querySelectorAll(".subpage").forEach(sub => {
    sub.style.transition = "";
    sub.style.transform = "";
    sub.removeAttribute("data-x");
    sub.removeAttribute("data-y");
  });
}

export function setupCanvasDrop(el, clientToCanvasCoordinates) {
  const store = useEditorStore();
  const commandStore = useCommandStore();

  interact(el).dropzone({
    accept: '.subpage',
    overlap: 0.2,
    
    ondragenter: e => {
      const from = e.relatedTarget.closest(".board");
      // Verificar se é o único elemento ou se o board está em arrasto
      if (from.querySelectorAll(".subpage").length === 1 && !from.classList.contains("dragging")) {
        return;
      }
      
      if (!document.querySelector(".ghost")) {
        createGhost(e.relatedTarget, e.dragEvent);
      }
      
      document.querySelector(".ghost").style.opacity = 1;
      document.getElementById(e.relatedTarget.id).style.opacity = 0;
      e.target.classList.add('drop-target');
    },
    
    ondragleave: e => {
      const from = e.relatedTarget.closest(".board");
      if (from.querySelectorAll(".subpage").length === 1 && !from.classList.contains("dragging")) {
        return;
      }
      
      e.target.classList.remove('drop-target');
      e.relatedTarget.classList.remove('can-drop');
    },
    
    ondrop: e => {
      const from = e.relatedTarget.closest(".board");
      if (from.querySelectorAll(".subpage").length === 1 && !from.classList.contains("dragging")) {
        return;
      }
      const boardIdOrigem = e.relatedTarget.getAttribute('data-board-id');
      const subpageId = e.relatedTarget.id;
      const { x, y } = clientToCanvasCoordinates(e.dragEvent.client.x, e.dragEvent.client.y);
    
      const dados = store.canvas;
    
      const boardOrigem = dados.boards.find(b => b.id === boardIdOrigem);
      const subpage = boardOrigem.subpaginas.find(s => s.id === subpageId);
      //TUDO SE RESUME A SE TEM UM ID DE DESTINO

      // SE FOR CAIR NO CANVAS MESMO, SÓ TEM QUE CRIAR UM NOVO BOARD ADICIONANDO A SUBPAGINA, E NO DETACH REMOVER ELA DO BOARD ANTERIOR

      // cria um novo board com a subpage encontrada ali em cima
      // cria um novo board com a subpage encontrada ali em cima
      
      // Do board de origem ele remove a subpageId
      const command = new MoveSubpageCommand({
        fromBoardId: boardIdOrigem,
        subpageId,
        toBoardId: null, // vai criar novo
        toBoardPosition: { x: x - 20, y: y - 20 }
      });
      commandStore.executar(command);
      let bIndex = store.canvas.boards.findIndex((b)=>{return b.id == boardIdOrigem})
      store.canvas.boards[bIndex].subpaginaAtiva = 0
      store.canvas.boards[bIndex].subpaginaAtivaId = store.canvas.boards[bIndex].subpaginas[0].id
      
            
      if (document.querySelector(".ghost")) {
        document.querySelector(".ghost").remove();
      }
      sortBoardSubpages(e);
    },
    
    ondropdeactivate: e => {
      const from = e.relatedTarget.closest(".board");
      if (from.querySelectorAll(".subpage").length === 1 && !from.classList.contains("dragging")) {
        return;
      }
      
      e.target.classList.remove('drop-active', 'drop-target');
    }
  });
}