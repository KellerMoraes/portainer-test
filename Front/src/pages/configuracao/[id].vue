<template>
    <v-sheet>
        <v-breadcrumbs
      :items="items"
      divider="/"
    ></v-breadcrumbs>
    </v-sheet>    
  </template>
  <script setup>
  const route = useRoute()
    const itemConfiguracao = ref(null)
    const items = [
        {
          title: 'Inicial',
          disabled: false,
          href: '/',
        },
        {
          title: 'Páginas',
          disabled: false,
          href: '/paginas',
        },
        {
          title: 'Configuração',
          disabled: true,
        }
    ]
    onMounted(()=>{ 
        if(route.params.id == 1){
            console.log(route.params)
            itemConfiguracao.value = {
                id: 1,
                dataModificado: '30/11/2024',
                nome: "Direito",
                caminho: "direito",
                data: "29/11/2024",
                tipo: "Página de Curso",
                publicado: false,
            }
        }
    })
  </script>
  