<template>
  
    <v-card-title class="pr-5 pl-3  pt-5 pb-1">
      <div style="width: 250px;" class="mr-10">
                <v-text-field append-inner-icon="mdi-magnify" density="compact" label="Buscar"
                  variant="outlined" hide-details single-line ></v-text-field>
              </div>
            </v-card-title>
            <v-card-subtitle class="pr-5 pl-2  py-5" style="font-size: 24px; font-family: Poppins;">
      Alertas
  
    </v-card-subtitle>
    <v-card-text class="pa-5 pl-2 pt-0">
      <!-- <div class="d-flex">
        <v-chip-group>
          <v-chip v-for="type in pageTypes" :key="type.color" :bgColor="type.color" :color="type.color">
            <v-icon class="mr-2" :color="type.color">{{ type.icon }}</v-icon>
            <span style="font-size: 16px; font-weight: 500;"> {{ type.name }}</span>
          </v-chip>
        </v-chip-group>
      </div> -->
        <v-card class="d-flex" flat height="800px">
        <v-toolbar color="white" class="pr-6" flat>
          <v-toolbar-title class="ml-4">
  
            <div class="d-flex justify-start align-center" style="font-size: 16px;">
              <v-icon class="mr-2">mdi-clock</v-icon>Recentes
  
            </div>
          </v-toolbar-title>
          <div class="d-flex justify-center align-center">
           
  
            <v-dialog v-model="dialogImportar" max-width="500px">
              <template v-slot:activator="{ props }">
                <v-btn color="black" variant="flat" v-bind="props">
                  Importar
                </v-btn>
              </template>
              <v-card color="#e9e9e9">
                <v-card-title>
                  Importar Página
                </v-card-title>
                <v-card-text>
                  <v-container v-if="paginaImportadaCarregada">
                    <v-sheet style="border: 1px dashed grey; border-radius: 8px;" height="300" class="d-flex flex-column align-center justify-center">
                      <v-icon size="80">mdi-code-json</v-icon>
                      <span style="font-weight: 900;  font-size: 18px; font-family: 'Roboto';">
                        Arraste e Solte ou<br> 
                      </span>
                      <input type="file" id="fileInput" style="display: none;" onchange="mostrarArquivoSelecionado(event)" />
                      <strong @click="selecionarArquivo" style="cursor: pointer;" class="text-blue" >Selecione</strong>
                      <small>Arquivos Suportados: JSON</small>
                    </v-sheet>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue-darken-1" variant="text" @click="dialogImportar = false">
                    Cancelar
                  </v-btn>
                  <v-btn color="blue-darken-1" variant="text" @click="confirmarImportacao">
                    Confirmar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
  
            <v-dialog v-model="dialog" max-width="900px">
              <template v-slot:activator="{ props }">
                <v-btn variant="flat" class="ml-2" v-bind="props" color="blue">
                  <v-icon>mdi-plus</v-icon>
                  Nova Página
                </v-btn>
              </template>
              <v-card width="900" height="700">
                <v-card-title class="pa-5">
                  <span class="text-h5">Selecionar tipo de página</span>
                </v-card-title>
  
                <v-card-text class="d-flex flex-grow-1 pa-8">
                  <v-row>
                    <v-col  v-for="tipo in pageTypes" :key="tipo.name" class="pr-1 pl-0" cols="4">
                      <router-link style="text-decoration: none;" :to="`novo/${tipo.tipoPagina}`">
                      <v-hover v-slot="{ isHovering, props }">
                          <v-sheet :to="`novo/${tipo.tipoPagina}`" v-bind="props" :class="{ 'on-hover': isHovering }"  height="100%" :color="tipo.color" class="d-flex flex-column justify-center align-center selecionavelHover">
                            <v-icon size="90" color="white">{{ tipo.icon }}</v-icon>
                            <h2 style="color: white;"> {{ tipo.name }} </h2>
                          </v-sheet>
                        </v-hover>
                      </router-link>
                      </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-dialog>
  
          </div>
        </v-toolbar>
      </v-card>
  
      <!-- <v-data-table :headers="headers" :items="paginas" height="680" :sort-by="[{ key: 'dataModificado', order: 'asc' }]">
        <template v-slot:top>
        </template>
        <template v-slot:item.publicado="{ item }">
          <v-icon class="mx-4" size="large" :color="item.publicado ? 'green' : 'grey'">
            mdi-upload
          </v-icon>
        </template>
        <template v-slot:item.tipo="{ item }">
          <v-chip color="blue">{{ item.tipo }}</v-chip>
        </template>
        <template v-slot:item.configs="{ item }">
          <v-btn class="mx-4" variant="plain" color="blue" :to="`paginas/configuracao/${item.id}`" icon="mdi-cog">
          </v-btn>
        </template>
        <template v-slot:item.editar="{ item }">
          <v-btn class="mx-4" variant="plain" color="blue" :to="`editor/${item.id}`" icon="mdi-application-edit">
          </v-btn>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize">
            Reset
          </v-btn>
        </template>
      </v-data-table> -->
  
    </v-card-text>
  
  
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
  