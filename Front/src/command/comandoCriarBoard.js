import { useEditorStore } from "@/stores/editor";
export class CriarBoardCommand {
  constructor(subpaginas = [], posicao = { x: 0, y: 0 }) {
    this.subpaginas = subpaginas;
    this.posicao = posicao;
    this.boardId = null;
  }
  
  executar() {
    const editor = useEditorStore()
    this.boardId = editor.adicionarBoard(this.subpaginas, this.posicao)
    }
    
    desfazer() {
      const editor = useEditorStore()
      if (!this.boardId) return;
      editor.removerBoard(this.boardId)
    }
  }
  