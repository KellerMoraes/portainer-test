import interact from 'interactjs';
import { useEditorStore } from '@/stores/editor.js';
import { inject, onMounted, ref } from 'vue';
import { MoveBoardCommand } from '@/command/comandoMoverBoard';
import { useCommandStore } from '@/stores/command';
import { useDragStore } from '@/stores/drag.js';
export function setupBoardDragging(el, positionRef, onMoveCallback) {
  const commandStore = useCommandStore();
  const editorStore = useEditorStore();
  const dragStore = useDragStore();
  const dragState = dragStore.dragState; // facilita acesso
  const offX = ref(null);
  const offY = ref(null);
  const clientToCanvasCoordinates = inject('clientToCanvasCoordinates');
  const maybeExpandCanvas = inject('expandCanvas');
  const store = useEditorStore();

  interact(el).draggable({
    allowFrom: '.abas',
    inertia: false,
    autoScroll: true,
    bounds: true,
    modifiers: [
      interact.modifiers.restrict({
        restriction: '.canvas',
        endOnly: true,
      })
    ],

    onstart(e) {
      const board = store.canvas.boards.find(b => b.id === e.target.id);
      dragState.currentBoard = board;

      const scale = store.canvas.scale;
      // const { x, y } = clientToCanvasCoordinates(e.client.x, e.client.y, scale);

      // dragState.initialPosition.x = x;
      // dragState.initialPosition.y = y;
      // dragState.originalBoardPosition.x = board.posicao.x;
      // dragState.originalBoardPosition.y = board.posicao.y;
      const { x: startX, y: startY } = clientToCanvasCoordinates(e.client.x, e.client.y, scale);

offX.value = startX - board.posicao.x;
offY.value = startY - board.posicao.y;

dragState.initialPosition.x = startX;
dragState.initialPosition.y = startY;
dragState.originalBoardPosition.x = board.posicao.x
dragState.originalBoardPosition.y = board.posicao.y
    },
    
    onmove(e) {
      const scale = store.canvas.scale;
      const { x, y } = clientToCanvasCoordinates(e.client.x, e.client.y, scale);

      positionRef.x = Math.floor(Math.max(0, x - offX.value));
positionRef.y = Math.floor(Math.max(0, y - offY.value));

      dragState.position.x = Math.floor(positionRef.x);
      dragState.position.y = Math.floor(positionRef.y);

      e.target.setAttribute('data-x', Math.floor(positionRef.x));
      e.target.setAttribute('data-y', Math.floor(positionRef.y));
      maybeExpandCanvas(positionRef.x, positionRef.y)
      onMoveCallback?.({ x: positionRef.x, y: positionRef.y });
    },

    onend(e) {
      const board = dragState.currentBoard;
      const final = board.posicao;
      const original = dragState.originalBoardPosition;

      const command = new MoveBoardCommand(
        board.id,
        original.x, original.y,
        final.x, final.y,
        true
      );
      commandStore.executar(command, editorStore.canvas.boards);
    }
  })
  .on('down', function(event) {
    const boardIndex = store.canvas.boards.findIndex(
      b => b.id === event.target.id
    );
    if (boardIndex >= 0) {
      let topZ = store.canvas.boards.length - 1
      store.canvas.boards.forEach((board)=>{
        if(board.depth > 0){
          board.depth -= 1
        }
      }) 
      store.canvas.boards[boardIndex].depth = topZ
      dragState.offset.x = event.offsetX;
      dragState.offset.y = event.offsetY;
    }
  });
}
