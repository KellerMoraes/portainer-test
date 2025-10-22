// src/command/EditarElementoCommand.js

import { findItemByPath } from '@/helpers/pathUtil'; // ajuste o caminho se precisar
export default class EditarElementoCommand {
  constructor({ path, propriedades, valorAntigo, valorNovo }) {
    this.path = path;
    this.propriedades = Array.isArray(propriedades) ? propriedades : [propriedades];
    this.valorAntigo = valorAntigo;
    this.valorNovo = valorNovo;
  }

  executar(dados) {
    const item = findItemByPath(dados, this.path);
    this._setCampo(item, this.valorNovo);
  }

  desfazer(dados) {
    const item = findItemByPath(dados, this.path);
    this._setCampo(item, this.valorAntigo);
  }

  _setCampo(objeto, valor) {
    let alvo = objeto;
    for (let i = 0; i < this.propriedades.length - 1; i++) {
      if (!alvo[this.propriedades[i]]) alvo[this.propriedades[i]] = {};
      alvo = alvo[this.propriedades[i]];
    }
    alvo[this.propriedades.at(-1)] = valor;
  }
}

