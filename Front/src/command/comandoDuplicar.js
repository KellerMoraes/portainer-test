// src/helpers/comandoMover.js
import { findItemByPath } from '@/helpers/pathUtil.js';
import { $cms } from '@/helpers/cmsProviderHelper';
import { cloneDeep } from 'lodash';
import { gerarId } from '@/helpers/gerarId';
import { usePaginaStore } from '@/stores/pagina';
export function idReplace(elemento) {
    elemento[$cms('id')] = gerarId();
  
    const containerKey = $cms('container');
    if (Array.isArray(elemento[containerKey])) {
      elemento[containerKey].forEach(idReplace);
    }
  
    return elemento;
  }
export default class DuplicarElementoCommand {
    // duplicar é para: duplicar e para copiar e colar
  constructor(info) {
    this.item = info.item;
    this.origem = { ...info.origem };
    this.destino = { ...info?.destino };
  }

  executar(dados) {
    // this.item tem valor? vai ser para copiar e colar  
    // Clona o item
    let item;
    if(!this.item){
        const listaOrigem = findItemByPath(dados, this.origem.path)[$cms('container')];
        item = cloneDeep(listaOrigem[this.origem.index]);    
        idReplace(item); // <<< Aqui itera e altera os ids
        listaOrigem.splice(this.origem.index, 0, item);
    }
    else{
        item = cloneDeep(this.item)
        idReplace(item); // <<< Aqui itera e altera os ids
    }  
    if (this.destino?.path) {
      let listaDestino 
      listaDestino = findItemByPath(dados, this.destino.path)[$cms('container')];
      listaDestino.splice(this.destino.index, 0, item);
        return;
    }
  }
// SEMPRE QUE O 0 NÃO FOR POSSIVEL ADICIONAR NO PROXIMO, SE NÃO TIVER, CRIAR??? (só se aplica a coluna?) <<<<<<<<<<<<<<<<<<<<<
  desfazer(dados) {
    console.log(this.destino)
    if(this.destino?.path){
      // ter destino significa ter sido copiado e colado
      console.log(findItemByPath(dados, this.destino.path))
      let listaDestino
      listaDestino = findItemByPath(dados, this.destino.path)[$cms('container')];
      listaDestino.splice(this.destino.index - 1, 1);
    return
    }
    const listaOrigem = findItemByPath(dados, this.origem.path)[$cms('container')];
    listaOrigem.splice(this.origem.index + 1, 1);
    
  }

  refazer(dados) {
    this.executar(dados); // Executa como se fosse novo
  }
}
