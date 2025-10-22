// src/model/BaseElemento.js
import { gerarId } from '@/helpers/gerarId';
import { $cms } from '@/helpers/cmsProviderHelper'; // <-- este é o certo aqui

export class ElementoBase {
  static criarEstrutura({ tipo, nome = '', atributos = {}, meta = {} }) {
    return {
      [$cms('id')]: `${tipo}-${gerarId()}`,
      [$cms('name')]: nome,
      [$cms('type')]: tipo,
      [$cms('attrs')]: atributos,
      [$cms('meta')]: meta,
    };
  }
}
