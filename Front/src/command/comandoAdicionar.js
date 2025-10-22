import { findItemByPath } from '@/helpers/pathUtil.js';
import { $cms } from '@/helpers/cmsProviderHelper';
import { cloneDeep } from 'lodash';
export default class AdicionarElementoCommand {
  constructor(info) {
    this.elemento = cloneDeep(info.elemento); // Evita mutações inesperadas
    this.destino = {
      path: info.destino.path,
      index: info.destino.index ?? null,
    };
    this.eventoNativo = !!info.eventoNativo;
  }

  executar(dados) {
    if (this.eventoNativo) return;

    const listaDestino = findItemByPath(dados, this.destino.path)[$cms('container')];

    if (this.destino.index === null || this.destino.index > listaDestino.length) {
      listaDestino.push(this.elemento);
    } else {
      listaDestino.splice(this.destino.index, 0, this.elemento);
    }
  }

  desfazer(dados) {
    console.log(this.destino)
    const listaDestino = findItemByPath(dados, this.destino.path)[$cms('container')];
    const index = listaDestino.findIndex(e => e[$cms('id')] === this.elemento[$cms('id')]);
    // console.log(index)
    if (index !== -1) listaDestino.splice(index, 1);
  }
  refazer(dados) {
   this.executar(dados)
  }
}
