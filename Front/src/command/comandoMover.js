// src/helpers/comandoMover.js
import { findItemByPath } from '@/helpers/pathUtil.js';
import { $cms } from '@/helpers/cmsProviderHelper';

export default class MoverElementoCommand {
  constructor(info) {
    this.item = info.item;
    this.origem = { ...info.origem };
    this.destino = { ...info.destino };
    this.eventoNativo = !!info.eventoNativo;
  }

  executar(dados) {  
    if (this.eventoNativo) {
      // Ignora execução real, só prepara para o próximo uso (refazer/desfazer)
      this.eventoNativo = false;
      return;
    }
  
    const listaOrigem = findItemByPath(dados, this.origem.path)[$cms('container')];
    const item = listaOrigem.splice(this.origem.index, 1)[0];
  
    const listaDestino = findItemByPath(dados, this.destino.path)[$cms('container')];
    listaDestino.splice(this.destino.index, 0, item);
  
    this.executado = true;
  }

  desfazer(dados) {
    const listaDestino = findItemByPath(dados, this.destino.path)[$cms('container')];
    const item = listaDestino.splice(this.destino.index, 1)[0];
    
    const listaOrigem = findItemByPath(dados, this.origem.path)[$cms('container')];
    listaOrigem.splice(this.origem.index, 0, item);
  }

  refazer(dados) {
    this.executar(dados); // Executa como se fosse novo
  }
}
