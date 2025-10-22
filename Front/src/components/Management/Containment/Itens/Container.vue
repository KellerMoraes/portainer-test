<template>
  <v-snackbar multi-line v-if="managementStore.warningData" :timeout="5000" :color="managementStore.warningData.color"
    v-model="managementStore.warningDisplay" location="top" timer="white">
    <b v-if="!managementStore.warningData.fail">{{ managementStore.warningData.item[$cms('name')] }}</b> {{
      managementStore.warningData.message }}
    <template v-slot:actions>
      <v-btn v-if="!managementStore.warningData.fail" variant="flat" color="primary"
        @click="undoDelete(managementStore.warningData.item)">
        Desfazer
      </v-btn>
    </template>
  </v-snackbar>
  <v-container class="pa-0" fluid>
    <v-row  v-if="data?.length == 0" class="mt-5">
      <v-col cols="12">
        <v-card-subtitle class="text-center" style="opacity: 0.5; font-weight: 500; font-size: 20px;">Ainda não há nada, começe criando alguma coisa...</v-card-subtitle>
      </v-col>
    </v-row>
    <v-row dense class="pa-4">
      <v-col v-for="page, i in data" :key="page[$cms('id')]" :cols="3" v-if="!data?.[i]?.[$cms('excludedAt')]">
        <ManagementContainmentItensCard @delete="refreshList" v-model="data[i]"></ManagementContainmentItensCard>
      </v-col>

    </v-row>

  </v-container>
  <v-pagination v-model="page" :length="15" class="mt-auto my-4 align-self-center"></v-pagination>
</template>
<script setup>
import { $cms } from '@/helpers/cmsProviderHelper';
import { PaginaUpdateRequest } from '@/model/Requests/PaginaUpdateRequest';
import _pagina from '@/services/paginas';
import { useManagementStore } from '@/stores/management';
const managementStore = useManagementStore()
const props = defineProps(['data'])
const emit = defineEmits(['refresh'])
function refreshList() {
  emit('refresh')
}
onMounted(() => 
// P: Porque a Store é adicionada aqui?
// R: porque acredito que ela seja o mais genérico da coisa, 
// se só subir o emit para os pais, vai chegar no que está ativo no momento
// sem precisar verificar qual dos componentes tem que carregar.
managementStore.refreshFunction = refreshList )
const page = ref(1)
function undoDelete(item) {
  _pagina.undoDelete(item[$cms('id')]).then(() => {
    managementStore.warningDisplay = false
    refreshList()
  }).catch((e) => {
    console.log(e)
  })

}

</script>