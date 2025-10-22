import { useDragStore } from "@/stores/drag";
import { useEditorStore } from "@/stores/editor";
function animateSwap(boardId, fromIndex, toIndex) {
    const dragStore = useDragStore()
    const editorStore = useEditorStore()
    dragStore.swapAnimation = {
      active: true,
      boardId,
      fromIndex,
      toIndex,
    };
  
    // Aguarda o tempo da animação para aplicar o swap real
    setTimeout(() => {
      const board = editorStore.canvas.boards.find(b => b.id === boardId);
      if (!board) return;
  
      const subpages = board.subpaginas;
      const [moved] = subpages.splice(fromIndex, 1);
      subpages.splice(toIndex, 0, moved);
  
      // Finaliza a animação
      if(fromIndex !== toIndex){
          document.querySelector("#" + dragStore.swapAnimation.boardId).querySelectorAll(".subpage").forEach(sub => {
            sub.classList.remove("firstOf")
            sub.style.transition = "";
            sub.style.transform = "";
            sub.removeAttribute("data-x");
            sub.removeAttribute("data-y");
            if(sub.dataset.index == 0){
              sub.classList.add("firstOf")
            }
            });
        }
      dragStore.swapAnimation = {
        active: false,
        boardId: null,
        fromIndex: null,
        toIndex: null,
      };
    }, 100); // igual ao tempo do CSS transition
  }
export class SwapSubpagesCommand {
    constructor(boardId, fromIndex, toIndex) {
      this.boardId = boardId;
      this.fromIndex = fromIndex;
      this.toIndex = toIndex;
    }
  
    executar() {
        animateSwap(this.boardId, this.fromIndex, this.toIndex);
    }
    
    desfazer() {
        const oldTo = this.toIndex;
this.toIndex = this.fromIndex;
this.fromIndex = oldTo;
        this.executar();
    }
  
    refazer() {
        const oldTo = this.toIndex;
this.toIndex = this.fromIndex;
this.fromIndex = oldTo;
      this.executar();
    }
  }