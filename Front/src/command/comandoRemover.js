import { findItemByPath } from '@/helpers/pathUtil.js';
import { $cms } from '@/helpers/cmsProviderHelper.js'; // precisa importar se ainda não importou
import { useFerramentaStore } from '@/stores/ferramenta';

export default class RemoverElementoCommand {
/**
 * Comando para remover um elemento de uma lista com base em um path e índice.
 *
 * Exemplo de uso:
 * ```js
 * const cmd = new RemoverElementoCommand({
 *   origem: {
 *     path: [{ tipo: 'subpagina', id: 'subpagina-123' }, { tipo: 'Linha', id: 'linha-456' }],
 *     index: 2
 *   }
 * });
 * ```
 *
 * @param {Object} info - Objeto com informações da origem.
 * @param {Object} info.origem - Objeto que contém path e index.
 * @param {Array<Object>} info.origem.path - Caminho para encontrar o container (ex: `[{ tipo: 'Linha', id: 'linha-123' }, ...]`).
 * @param {number} info.origem.index - Índice do item a ser removido no array encontrado.
 * @returns {RemoverElementoCommand} Instância do comando.
 */
  constructor(info) {
    this.origem = {
      path: info.origem.path,
      index: info.origem.index
    };
    this.itemRemovido = null;
  }

  executar(dados) {
    const listaOrigem = findItemByPath(dados, this.origem.path)[$cms('container')];
    if (!this.itemRemovido) {
      this.itemRemovido = listaOrigem[this.origem.index];
    }

    if (listaOrigem[this.origem.index] === this.itemRemovido) {
      listaOrigem.splice(this.origem.index, 1);
    }
    useFerramentaStore().removerSelecao()
  }

  desfazer(dados) {
    if (this.itemRemovido) {
      const listaOrigem = findItemByPath(dados, this.origem.path)[$cms('container')];
      listaOrigem.splice(this.origem.index, 0, this.itemRemovido);
    }
  }
  refazer(dados) {
   this.executar(dados)
  }
}

