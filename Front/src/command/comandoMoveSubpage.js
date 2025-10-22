import { useEditorStore } from "@/stores/editor";

export class MoveSubpageCommand {
    constructor({ fromBoardId, toBoardId, subpageId, toBoardPosition }) {
      this.fromBoardId = fromBoardId;
      this.toBoardId = toBoardId; // pode ser null (cria novo board)
      this.toBoardPosition = toBoardPosition;
      this.subpageId = subpageId;
  
      this._createdBoardInfo = null; // se foi criado um novo board no destino
      this._deletedBoardInfo = null; // se foi deletado um board no from
    }
  
    executar() {
        const editor = useEditorStore();
      
        const fromBoard = editor.canvas.boards.find(b => b.id === this.fromBoardId);
      
        const result = editor.subpageManipulationOnBoards(
          this.fromBoardId,
          this.subpageId,
          this.toBoardId,
          this.toBoardPosition
        );
      
        if (result?.createdBoard) {
          this._createdBoardInfo = JSON.parse(JSON.stringify(result.createdBoard));
        }
      
        if (result?.removedEmptyBoard && fromBoard) {
          this._deletedBoardInfo = JSON.parse(JSON.stringify(fromBoard));
          this._deletedBoardInfo.posicao = this.toBoardPosition
        }
      }
      
      desfazer() {
        const editor = useEditorStore();
      
        let targetBoardId = this.fromBoardId;
      
        if (this._deletedBoardInfo) {
          const boardClonado = this._deletedBoardInfo;
          editor.canvas.boards.push(boardClonado);
          targetBoardId = boardClonado.id;
        }
      
        editor.subpageManipulationOnBoards(
          this.toBoardId ?? this._createdBoardInfo?.id,
          this.subpageId,
          targetBoardId
        );
      
        if (this._createdBoardInfo && this._createdBoardInfo.id !== targetBoardId) {
          editor.removerBoard(this._createdBoardInfo.id);
        }
      }
      refazer() {
        const editor = useEditorStore();
      
        const result = editor.subpageManipulationOnBoards(
          this.fromBoardId,
          this.subpageId,
          this.toBoardId,
          this.toBoardPosition,
          this._createdBoardInfo // passa o board original aqui
        );
      
        if (result?.createdBoard) {
          this._createdBoardInfo = JSON.parse(JSON.stringify(result.createdBoard));
        }
      }
  }
  