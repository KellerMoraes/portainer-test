<template>
  
    <EditorSystemConfigSystemEditor></EditorSystemConfigSystemEditor>
  
  </template>
  <script>
  export default {
    data: () => ({
      dialog: false,
      dialogImportar: false,
      paginaImportadaCarregada: true,
      headers: [
        {
          title: 'Nome',
          align: 'start',
          sortable: false,
          key: 'nome',
        },
        { title: 'Publicado', key: 'publicado', sortable: false },
        { title: 'Última Modificação', key: 'dataModificado' },
        { title: 'Data de Criação', key: 'data' },
        { title: 'Tipo', key: 'tipo' },
        { title: 'Configurações', key: 'configs', sortable: false, align: 'center', },
        { title: 'Editar', key: 'editar', sortable: false, align: 'center', },
      ],
      paginas: [],
      pageTypes: [
        { name: "Cursos", icon: "mdi-school", color: "blue", tipoPagina: "curso" },
        { name: "Notícias", icon: "mdi-newspaper", color: "green" , tipoPagina: "noticia" },
        { name: "Provas", icon: "mdi-head-lightbulb", color: "orange", tipoPagina: "prova" },
      ],
      editedIndex: -1,
    }),
  
    created() {
      this.initialize()
    },
  
    methods: {
      initialize() {
        this.paginas = [
          {
            id: 1,
            dataModificado: '30/11/2024',
            nome: "Direito",
            data: "29/11/2024",
            tipo: "Página de Curso",
            caminho: "direito",
            publicado: false,
          },
  
        ]
      },
      selecionarArquivo(){
      document.getElementById('fileInput').click();
      },
      mostrarArquivoSelecionado(event) {
      const arquivo = event.target.files[0];
      if (arquivo) {
          console.log("Arquivo selecionado:", arquivo);
      }
  }
  
  
    },
  }
  </script>
  <style lang="scss" scoped>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
  .selecionavelHover {
      transition: opacity .4s ease-in-out;
    }
  
    .selecionavelHover:not(.on-hover) {
      opacity: 0.4;
    }
  
    .show-btns {
      color: rgba(255, 255, 255, 1) !important;
    }
  </style>
  