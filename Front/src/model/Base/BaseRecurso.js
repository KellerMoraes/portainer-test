
class RecursoBase {
  constructor(nome, nomeGrupo, nomeRecurso, icone) {
    this.Nome = nome;
    this.NomeGrupo = nomeGrupo;
    this.NomeRecurso = nomeRecurso || nome;
    this.Icone = icone;
    this.Itens = [];
  }


  adicionarGrupo(nome, grupo, componentes ) {
    this.Itens.push({
      Nome: nome,
      Grupo: grupo,
      Componentes: componentes,
    });
  }

  gerar() {
    return {
      Nome: this.Nome,
      NomeGrupo: this.NomeGrupo,
      NomeRecurso: this.NomeRecurso,
      Icone: this.Icone,
      Itens: this.Itens,
    };
  }
}

export default RecursoBase;