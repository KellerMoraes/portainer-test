// src/command/comandoAttachSubpage.js
// import { $cms } from '@/helpers/cmsProviderHelper';
import _ from 'lodash';

export class AttachSubpageCommand {
 constructor(toBoardId, subpageId, fromBoardId) {
     this.fromBoardId = fromBoardId;
     this.subpageId = subpageId;
     this.toBoardId = toBoardId;
     this.subpage = null;
     this.index = null;
   }
 
   executar() {
     const editor = useEditorStore()
     editor.subpageManipulationOnBoards(null, this.subpageId,this.toBoardId);
   }
   
   desfazer() {
     const editor = useEditorStore()
     editor.subpageManipulationOnBoards(this.fromBoardId, this.subpageId);
  
 }
}

