import interact from 'interactjs';
import { useEditorStore } from '@/stores/editor.js';
import { MoveSubpageCommand } from '@/command/comandoMoveSubpage';
import { useCommandStore } from '@/stores/command';
import { useDragStore } from '@/stores/drag';
import { inject, onMounted,ref } from 'vue';

export function setupTabGroup(el) {
  const store = useEditorStore();
  const dragStore = useDragStore();
  const commandStore = useCommandStore()
  const clientToCanvasCoordinates = inject('clientToCanvasCoordinates');
  interact(el).dropzone({
    accept: '.subpage, .board',

    ondragenter: e => {
      let from = e.relatedTarget
      let to = e.target
      if(e.relatedTarget.querySelectorAll(".subpage").length == 1){
        from = e.relatedTarget.querySelector(".subpage")
        if(!from.classList.contains("dragging")){
          return
        }
      }
      let fromBoard = from.getAttribute('data-board-id');
      let toBoard = to.id;
      if(document.querySelector(".ghost")){
        document.querySelector(".ghost").style.opacity = 0
        document.getElementById(e.relatedTarget.id).style.opacity = 1
      }
      
      if (fromBoard && toBoard && fromBoard !== toBoard) { 
        e.target.classList.add('drop-target');
        e.relatedTarget.classList.add('can-drop');
        e.relatedTarget.classList.remove('can-drop-subpage');
        let bIndex = store.canvas.boards.findIndex((b)=>{return b.id == e.target.id})
        store.canvas.boards[bIndex].depth = 1
        // console.log(e)
      }
    },
    
    ondragleave: e => {
      let from = e.relatedTarget
      let to = e.target
      if(e.relatedTarget.querySelectorAll(".subpage").length == 1){
        from = e.relatedTarget.querySelector(".subpage")
        if(!from.classList.contains("dragging")){
          return
        }
      }
      let fromBoard = from.getAttribute('data-board-id');
      let toBoard = to.id;
      if(document.querySelector(".ghost")){
        document.querySelector(".ghost").style.opacity = 1
      }
      if (fromBoard && toBoard && fromBoard !== toBoard) { 
        e.target.classList.remove('drop-target');
        e.relatedTarget.classList.remove('can-drop');
        let bIndex = store.canvas.boards.findIndex((b)=>{return b.id == e.target.id})
        store.canvas.boards[bIndex].depth = 0
      }
    },
    
    ondrop: e => {
      let from = e.relatedTarget
      let to = e.target
      if(e.relatedTarget.querySelectorAll(".subpage").length == 1){
        from = e.relatedTarget.querySelector(".subpage")
        if(!from.classList.contains("dragging")){
          return
        }
      }
      let fromBoard = from.getAttribute('data-board-id');
      let subpageId = from.id;
      let toBoard = to.id;
      if(document.querySelector(".ghost")){
        document.querySelector(".ghost").remove()
      }
      if (fromBoard && toBoard && fromBoard !== toBoard) {
        // let bIndex = store.canvas.boards.findIndex((b)=>{return b.id == fromBoard})
        // store.canvas.boards[bIndex].subpaginaAtiva = 0
        // SE FOR CAIR NO TAB GROUP, TEM QUE REMOVER DE ONDE ESTAVA E ADICIONAR NO NOVO LUGAR
        const command = new MoveSubpageCommand({
          fromBoardId: fromBoard,
          toBoardId: toBoard,
          subpageId: subpageId,
          toBoardPosition: dragStore.dragState.originalBoardPosition
        });
        if(store.canvas.boards.find((b)=>{return b.id == fromBoard}).subpaginas.length > 1){
          let bIndex = store.canvas.boards.findIndex((b)=>{return b.id == fromBoard})
          store.canvas.boards[bIndex].subpaginaAtiva = 0
        }
        commandStore.executar(command);
      }
    },
    ondropdeactivate: e => {
      let from = e.relatedTarget
      let to = e.target
      if(e.relatedTarget.querySelectorAll(".subpage").length == 1){
        from = e.relatedTarget.querySelector(".subpage")
        if(!from.classList.contains("dragging")){
          return
        }
      }
      let fromBoard = from.getAttribute('data-board-id');
      let toBoard = to.id;
      if (fromBoard && toBoard && fromBoard !== toBoard) { 
        e.target.classList.remove('drop-active', 'drop-target');
      }
    }

  });
}
