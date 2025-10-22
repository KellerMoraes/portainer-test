// src/command/comandoDetachSubpage.js
// import { $cms } from '@/helpers/cmsProviderHelper';
import { gerarId } from '@/helpers/gerarId';
import _ from 'lodash';
import { useEditorStore } from "@/stores/editor";
export class DetachSubpageCommand {
  constructor(fromBoardId, subpageId, toBoardId) {
    this.fromBoardId = fromBoardId;
    this.subpageId = subpageId;
    this.toBoardId = toBoardId;
    this.subpage = null;
    this.index = null;
  }

  executar() {
    const editor = useEditorStore()
    editor.subpageManipulationOnBoards(this.fromBoardId, this.subpageId);
  }
  
  desfazer() {
    const editor = useEditorStore()
    editor.subpageManipulationOnBoards(null, this.subpageId,this.toBoardId);
 
}
}
