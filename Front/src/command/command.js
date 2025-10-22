// src/helpers/command.js
import AdicionarElementoCommand from '@/command/comandoAdicionar';
import MoverElementoCommand from '@/command/comandoMover';
import EditarElementoCommand from '@/command/comandoEditar';
import ComandoComposto from '@/command/comandoComposto';
import { $cms } from '@/helpers/cmsProviderHelper';
import { useCommandStore } from '@/stores/command';

/**
 * Função chamada quando um item é adicionado.
 * @param {Object} evt - Evento do draggable.
 * @param {Array} path - Caminho onde o item foi adicionado.
 */


export function itemAdd(evt, path) {
  // console.log(path)
   const commandStore = useCommandStore();
   if (evt.from.classList.contains('listaDeComponentes') || evt.from.classList.contains('quickAccessGroup')) {
     // se a origem do elemento é a "listaDeComponentes"
     // OU SEJA NÃO REMOVE DE LUGAR NENHUM, SÓ ADICIONA
     commandStore.criarComando('elemento', evt.item._underlying_vm_);
     commandStore.criarComando('destino', { path, index: evt.newIndex });
     commandStore.criarComando('eventoNativo', true);
     commandStore.executar(new AdicionarElementoCommand(commandStore.comando));
     return;
    }
    // linha onde é adicionada e removida deve mudar sua colunagem, e quebrar a colunagem (só dividir pela quantidade de colunas presente)
    commandStore.criarComando('itemOrigem', evt.from.__draggable_context?.element);
    commandStore.criarComando('itemDestino', evt.to.__draggable_context?.element);
    commandStore.criarComando('item', evt.item._underlying_vm_);
    commandStore.criarComando('destino', { path, index: evt.newIndex });
    commandStore.criarComando('eventoNativo', true);
  }
  
  export function itemRemove(evt, path) {
  const commandStore = useCommandStore();
  // console.log(path)
  commandStore.criarComando('origem', { path, index: evt.oldIndex });
}

export function itemMoved() {
  const commandStore = useCommandStore();
  const comando = commandStore.comando;

  // Verifica se tem todas as partes necessárias
  if (!comando.destino || !comando.origem || !comando.item) return;
  
  const itemOrigem = comando.itemOrigem;
  const itemDestino = comando.itemDestino;
  
  // Função utilitária para recalcular estrutura com base na quantidade de colunas
  const novaEstrutura = (item) => {
    const colunas = item?.[$cms('container')];
    if (!Array.isArray(colunas) || colunas.length === 0) return [];
    const qtd = colunas.length;
    const tamanho = Math.floor(12 / qtd);
    return Array(qtd).fill(tamanho);
  };
  
  // Se for um movimento entre linhas (tipo == 'linha'), cria um comando composto
  if (itemDestino?.tipo === 'linha') {
    const comandoMover = new MoverElementoCommand(comando);

    const comandoAtualizaEstruturaDestino = new EditarElementoCommand({
      path: comando.destino.path,
      propriedades: [$cms('structure')],
      valorAntigo: itemDestino[$cms('structure')],
      valorNovo: novaEstrutura(itemDestino),
    });

    const comandoAtualizaEstruturaOrigem = new EditarElementoCommand({
      path: comando.origem.path,
      propriedades: [$cms('structure')],
      valorAntigo: itemOrigem[$cms('structure')],
      valorNovo: novaEstrutura(itemOrigem),
    });

    const comandoComposto = new ComandoComposto([
      comandoMover,
      comandoAtualizaEstruturaDestino,
      comandoAtualizaEstruturaOrigem,
    ]);

    commandStore.executar(comandoComposto);
  } else {
    // Caso contrário, apenas executa o movimento simples
    commandStore.executar(new MoverElementoCommand(comando));
  }
}



export function itemSort(evt, path) {
  // ✅ Não executa se origem e destino são diferentes (drag entre containers)
  if (evt.from !== evt.to) return;

  const commandStore = useCommandStore();
  commandStore.limparComando();

  commandStore.criarComando('origem', { path, index: evt.oldIndex });
  commandStore.criarComando('destino', { path, index: evt.newIndex });
  commandStore.criarComando('item', evt.item._underlying_vm_);
  commandStore.criarComando('eventoNativo', true);

  commandStore.executar(new MoverElementoCommand(commandStore.comando));
}

/**
 * Quando um item é editado
 * @param {Array} path - Caminho até o item
 * @param {Array} propriedades - Lista de propriedades (ex: [['estrutura']])
 * @param {Any} valorAntigo - Valor antes da edição
 * @param {Any} valorNovo - Valor depois da edição
 * @param {Array} comandosExtras - Lista opcional de comandos extras (ex: criar ou remover colunas)
 */
export function itemEdited(path, propriedades, valorAntigo, valorNovo, comandosExtras = []) {
  const commandStore = useCommandStore();

  const comandoEditar = new EditarElementoCommand({
    path,
    propriedades,
    valorAntigo,
    valorNovo
  });

  let comandoFinal;

  if (comandosExtras.length > 0) {
    comandoFinal = new ComandoComposto([
      comandoEditar,
      ...comandosExtras
    ]);
  } else {
    comandoFinal = comandoEditar;
  }

  commandStore.executar(comandoFinal);
}