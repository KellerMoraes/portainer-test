import { useEditorStore } from "@/stores/editor";

export class MoveBoardCommand {
  constructor(boardId, fromX, fromY, toX, toY, isNative) {
    this.boardId = boardId;
    this.fromX = fromX;
    this.fromY = fromY;
    this.toX = toX;
    this.toY = toY;
  }
  
  executar(store) {
    store = useEditorStore().canvas.boards
      const board = store.find(b => b.id === this.boardId);
            board.posicao.x = this.toX;
            board.posicao.y = this.toY;
        
        this.isNative = false
    }
  
    desfazer(store) {
      store = useEditorStore().canvas.boards
      const board = store.find(b => b.id === this.boardId);
      board.posicao.x = this.fromX;
      board.posicao.y = this.fromY;
    }
    refazer(store) {
      store = useEditorStore().canvas.boards
        const board = store.find(b => b.id === this.boardId);
        board.posicao.x = this.toX;
        board.posicao.y = this.toY;
    }
  }
  