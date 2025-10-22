<template>
    <v-list v-model:opened="open">
            <router-link to="/" style="text-decoration: none;">
            <v-list-item :ripple="false" class="mb-8 mt-2 px-16">
                <v-list-item-title style="font-weight: 800;  font-size: 26px; color: #1167b1;" >
                  <v-icon style="vertical-align: top;">mdi-webhook</v-icon><span class="ma-1" style="font-family: Poppins;" >CMS</span>
                </v-list-item-title>
              </v-list-item>
            </router-link>

      <v-list-group class="menu-buttons pl-2" v-model:selected="selected"  color="primary" v-for="opcao in opcoes" :key="opcao.id" :to="opcao.link" :value="opcao.id" :expand-icon="opcao.subgrupos ? 'mdi-chevron-down' : ''"
      :collapse-icon="opcao.subgrupos ? 'mdi-chevron-up' : ''">
        <template v-slot:activator="{ props }">
          <v-list-item
            v-bind="props"
            :prepend-icon="opcao.icon"
            :title="opcao.nome"
            :to="opcao.subgrupos ? '' : opcao.link"
          ></v-list-item>
        </template>

        <v-list-item v-if="opcao.subgrupos" v-for="x in opcao?.subgrupos" :to.prevent="x.link" :title="x.nome" :value="x.nome" >
        </v-list-item>
      </v-list-group>

    </v-list>
</template>
<script setup>
const open = ref(null)
const selected = ref(null)
const opcoes = [
  {nome: "Dashboard", link: "/",icon: "mdi-view-dashboard", id: 0},
  {nome: "Site", link: "/",icon: "mdi-web", 
  
  subgrupos: 
  [
  {nome: "Páginas", link: "/paginas"},
  {nome: "Notícias", link: "/noticias"},
  {nome: "Destaques", link: "/destaques"},
  {nome: "Menus", link: "/menus"},
  {nome: "Rádio", link: "/radio"},
  {nome: "Tv", link: "/tv"},
  {nome: "Templates", link: "/templates"},
  ], 
  
  id: 1},
  {nome: "Editais", link: "/editais",icon: "mdi-text-box-multiple-outline", id: 2},
  {nome: "Alertas", link: "/alertas",icon: "mdi-alert-decagram-outline", 
  
  subgrupos:
  [
  {nome: "Minha UFN", link: "/alertas/minha-ufn"},
  {nome: "Site", link: "/alertas/site"},
  ],
  id: 3},

  {nome: "Ferramentas", link: "/ferramentas",icon: "mdi-tools", 
  
  subgrupos:
  [
  {nome: "Provas", link: "/ferramentas/provas"},
  ], 
  
  id: 4},

  {nome: "Configurações", link: "/configuracoes", 
  
  subgrupos:
  [
  {nome: "Aparência", link: "/configuracoes/aparencia"},
  ], 
  icon: "mdi-cog-outline" , id: 5},
]
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

.menu-buttons{
  font-family: "Roboto", sans-serif;
  font-weight: 700;
}
</style>