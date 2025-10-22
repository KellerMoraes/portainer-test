export default class ComandoComposto {
  constructor(comandos = [], eventoNativo = false) {
    this.comandos = comandos;
    this.eventoNativo = eventoNativo;
  }

  executar(dados) {
    for (const comando of this.comandos) {
      comando.executar(dados);
    }
  }

  desfazer(dados) {
    for (let i = this.comandos.length - 1; i >= 0; i--) {
      this.comandos[i].desfazer(dados);
    }
  }

  adicionarComando(comando) {
    this.comandos.push(comando);
  }
}
