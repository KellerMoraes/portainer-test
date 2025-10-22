import interact from 'interactjs';
import { useEditorStore } from '@/stores/editor.js';
import { MoveBoardCommand } from '@/command/comandoMoverBoard';
import { useCommandStore } from '@/stores/command';
import { useDragStore } from '@/stores/drag.js';
import { SwapSubpagesCommand } from '@/command/comandoSwapSubpage';
import { useFerramentaStore } from '@/stores/ferramenta';
import { usePaginaStore } from '@/stores/pagina';
import { $cms } from '@/helpers/cmsProviderHelper';


export function setupTabDragging(selector, clientToCanvasCoordinates, maybeExpandCanvas) {

  const editorStore = useEditorStore();
  const commandStore = useCommandStore();
  const dragStore = useDragStore();
  const dragState = dragStore.dragState;

  function updateBoardSubpagesOrder(event) {
    const boardId = event.target.dataset.boardId;
    const board = editorStore.canvas.boards.find(b => b.id === boardId);
    if (!board) return;

    const boardElement = document.getElementById(boardId);
    if (!boardElement) return;

    // const domSubpages = Array.from(boardElement.querySelectorAll('.subpage'))
    //   .sort((a, b) => parseInt(a.dataset.index) - parseInt(b.dataset.index));

    // board.subpaginas = domSubpages.map(domEl => 
    //   board.subpaginas.find(s => s.id === domEl.id)
    // );
    dragStore.dragState.swap.newIndex = parseInt(event.target.dataset.index)
    if (dragStore.dragState.swap.oldIndex !== dragStore.dragState.swap.newIndex && !dragStore.dragState.shouldDetach) {
      const command = new SwapSubpagesCommand(
        dragStore.dragState.swap.boardId,
        dragStore.dragState.swap.oldIndex,
        dragStore.dragState.swap.newIndex
      );
      commandStore.executar(command);
    }
    else{
      
      
      boardElement.querySelectorAll(".subpage").forEach(sub => {
        sub.style.transition = "";
        sub.style.transform = "";
        sub.removeAttribute("data-x");
        sub.removeAttribute("data-y");
      });
    }
    event.target.classList.remove("dragging");
  }

  function handleSwapping(event) {
    const scale = editorStore.canvas.scale;
    const target = event.target;
    target.style.pointerEvents = 'auto';

    if (event.clientX > dragState.lastX) {
      dragState.direction = 'right';
    } else if (event.clientX < dragState.lastX) {
      dragState.direction = 'left';
    }
    dragState.lastX = event.clientX;

    const boardElement = target.closest(".board");
    const subPagesBoard = [];

    boardElement.querySelectorAll(".subpage").forEach((sub) => {
      const rect = sub.getBoundingClientRect();
      subPagesBoard.push({
        id: sub.id,
        index: parseInt(sub.dataset.index),
        start: rect.left,
        end: rect.right,
        width: rect.width,
        middle: (rect.left + rect.right) / 2,
        element: sub
      });
    });

    subPagesBoard.sort((a, b) => a.index - b.index);

    dragState.position.x += event.dx / scale;
    dragState.position.y += event.dy / scale;

    // item sob influencia do arrasto do mouse pressionado
    target.style.transform = `translateX(${dragState.position.x}px)`;
    // item sob influencia do arrasto do mouse pressionado

    const draggingSub = subPagesBoard.find((sub) => sub.id === target.id);
    if (!draggingSub) return;

    let targetSub = null;
    const currentIndex = parseInt(draggingSub.index);

    if (dragState.direction === 'left' && currentIndex > 0) {
      const prevSub = subPagesBoard.find(sub => sub.index === currentIndex - 1);
      if (prevSub && draggingSub.middle < prevSub.end) {
        targetSub = prevSub;
      }
    } else if (dragState.direction === 'right') {
      const nextSub = subPagesBoard.find(sub => sub.index === currentIndex + 1);
      if (nextSub && draggingSub.middle > nextSub.start) {
        targetSub = nextSub;
      }
    }

    if (targetSub) {
      const moveDistance = (dragState.direction === 'left' ? draggingSub.width : -draggingSub.width) / scale;

      const targetEl = document.querySelector(`#${targetSub.id}`);
      targetEl.style.transition = "transform 0.3s";
      targetEl.style.transform = targetEl.style.transform !== "" ? 
        "" : `translateX(${moveDistance}px)`;

      const draggedEl = document.querySelector(`#${draggingSub.id}`);
      const tempIndex = draggedEl.dataset.index;
      draggedEl.dataset.index = targetEl.dataset.index;
      targetEl.dataset.index = tempIndex;


      if (targetSub.index !== draggingSub.index) {
        dragStore.dragState.swap.boardId = target.dataset.boardId
        
      }

      document.querySelectorAll(".subpage").forEach(sub => {
        sub.classList.remove("firstOf");
      });

      if (parseInt(draggedEl.dataset.index) === 0) {
        draggedEl.classList.add("firstOf");
      }
    }
  }

  function handleDetach(event) {
    const ghost = document.querySelector(".ghost");
    if (ghost) {
      const { x, y } = clientToCanvasCoordinates(
        event.client.x, 
        event.client.y, 
        editorStore.canvas.scale
      );
      const elRect = event.target.getBoundingClientRect();
      ghost.style.transform = `translate(${x - (elRect.width / 2)}px, ${y - (elRect.height / 2)}px)`;
      dragState.position.x += event.dx / editorStore.canvas.scale;
    }

    event.target.style.pointerEvents = 'none';
    event.target.classList.remove("highlight");
  }

  interact(selector).draggable({
    inertia: false,
    modifiers: [interact.modifiers.restrict({ endOnly: false })],
    autoScroll: true,

    onstart(event) {
      const target = event.target;
      const rect = target.getBoundingClientRect();
      const parentRect = target.parentElement.getBoundingClientRect();
      const isOnlyChild = target.parentNode.children.length === 1;
      dragStore.dragState.swap.oldIndex = parseInt(target.dataset.index)
      dragState.position = {
        x: parseFloat(target.getAttribute('data-x')) || 0,
        y: parseFloat(target.getAttribute('data-y')) || 0
      };

      dragState.direction = null;
      dragState.lastX = event.clientX;
      dragState.shouldDetach = false;
      target.classList.add("dragging");

      if (isOnlyChild) {
        dragState.draggingWholeBoard = true;
        const { x, y } = clientToCanvasCoordinates(event.client.x, event.client.y, editorStore.canvas.scale);
        dragState.currentBoard = editorStore.canvas.boards.find(
          b => b.id === target.dataset.boardId
        );
        if (dragState.currentBoard) {
          dragState.offset.x = x - dragState.currentBoard.posicao.x;
          dragState.offset.y = y - dragState.currentBoard.posicao.y;
        }
      } else {
        dragState.draggingWholeBoard = false;

        dragState.elementData = {
          startX: rect.left,
          startY: rect.top,
          objWidth: rect.width,
          objHeight: rect.height,
          centerStartX: rect.left + rect.width / 2,
          centerStartY: rect.top + rect.height / 2,
          parentTop: parentRect.top,
          parentBottom: parentRect.bottom,
          parentLeft: parentRect.left,
          parentRight: parentRect.right,
          offsetX: 0,
          offsetY: 0
        };

        const itemCenterX = rect.left + rect.width / 2;
        const itemCenterY = rect.top + rect.height / 2;
        const centerOffsetX = (event.client.x - itemCenterX);
        const centerOffsetY = (event.client.y - itemCenterY);

        dragStore.dragState.position.x += centerOffsetX;
        dragStore.dragState.position.y += centerOffsetY;

        target.setAttribute('data-x', dragStore.dragState.position.x);
        target.setAttribute('data-y', dragStore.dragState.position.y);
        target.style.transform = `translate(${dragStore.dragState.position.x}px, ${dragStore.dragState.position.y}px)`;
      }

      dragStore.dragState.originalBoardPosition = {
        x: dragStore.dragState.currentBoard?.posicao.x ?? 0,
        y: dragStore.dragState.currentBoard?.posicao.y ?? 0
      };

      document.body.style.userSelect = 'none';
    },

    onmove(event) {
      const scale = editorStore.canvas.scale;
      if (dragState.draggingWholeBoard && dragState.currentBoard) {
        const { x, y } = clientToCanvasCoordinates(
          event.client.x, 
          event.client.y, 
          scale
        );
        dragState.currentBoard.posicao.x = Math.floor(x - dragState.offset.x);
dragState.currentBoard.posicao.y = Math.floor(y - dragState.offset.y);
        return;
      }

      const offsetX = event.client.x - parseFloat(dragState.elementData.startX);
      const offsetY = event.client.y - parseFloat(dragState.elementData.startY);
      dragState.elementData.offsetX = offsetX;
      dragState.elementData.offsetY = offsetY;

      const currentY = dragState.elementData.centerStartY + offsetY;
      const currentX = dragState.elementData.centerStartX + offsetX;

      const draggingY = currentY - (dragState.elementData.objHeight / 2);
      const draggingX = currentX - (dragState.elementData.objWidth / 2);
      dragState.shouldDetach = 
        draggingY > dragState.elementData.parentBottom || 
        draggingY < dragState.elementData.parentTop || 
        draggingX < dragState.elementData.parentLeft || 
        draggingX > dragState.elementData.parentRight;

      if (dragState.shouldDetach) {
        handleDetach(event);
        // updateBoardSubpagesOrder(event);
      } else {
        handleSwapping(event);
      }
      // maybeExpandCanvas(dragStore.dragState.position.x, dragStore.dragState.position.y)
    },

    onend(event) {

      dragStore.dragState.initialPosition.x = dragState.originalBoardPosition.x;
      dragStore.dragState.initialPosition.y = dragState.originalBoardPosition.y;
      dragStore.dragState.position.x = dragStore.dragState?.currentBoard?.posicao.x;
      dragStore.dragState.position.y = dragState.dragState?.currentBoard?.posicao.y;

      const target = event.target;

      if (dragState.draggingWholeBoard && dragState.currentBoard) {
        const board = dragState.currentBoard;
        const original = dragState.originalBoardPosition;
        const current = board.posicao;
        if ((original.x !== current.x || original.y !== current.y) &&  board.id == event.relatedTarget?.id ) {
          const command = new MoveBoardCommand(
            board.id,
            original.x, original.y,
            current.x, current.y
          );
          commandStore.executar(command);
        }
      }

      updateBoardSubpagesOrder(event);

      target.style.opacity = '1';
      target.style.pointerEvents = 'auto';
      document.body.style.userSelect = '';

      dragState.draggingWholeBoard = false;
      dragState.currentBoard = null;
      dragState.position = { x: 0, y: 0 };
    }
  })
  .on('up', function(event) {
    const subpage = event.target.closest(".subpage");
    const boardIndex = editorStore.canvas.boards.findIndex(
      b => b.id === subpage.dataset.boardId
    );
    if (boardIndex >= 0) {
      editorStore.canvas.boards[boardIndex].subpaginaAtiva = 
      parseFloat(subpage.dataset.index);
    }
  })
  .on('down', function(event) {
    const subpage = event.target.closest(".subpage");
    const boardIndex = editorStore.canvas.boards.findIndex(
      b => b.id === subpage.dataset.boardId
    );
    if (boardIndex >= 0) {
      let topZ = editorStore.canvas.boards.length
      editorStore.canvas.boards.forEach((board)=>{
        if(board.depth > 0){
          board.depth -= 1
        }
      }) 
      editorStore.canvas.boards[boardIndex].depth = topZ 
      editorStore.canvas.boards[boardIndex].subpaginaAtiva = parseFloat(subpage.dataset.index);
      editorStore.canvas.boards[boardIndex].subpaginaAtivaId = subpage.id;
      
      useFerramentaStore().selecionarSubpagina(subpage,{
        tipo: 'subpagina',
        index: usePaginaStore().pagina[$cms('content')].findIndex(p => p[$cms('id')] === subpage[$cms('id')]),
  id: subpage[$cms('id')],
      } )
      dragState.offset.x = event.offsetX;
      dragState.offset.y = event.offsetY;
    }
  });
}
