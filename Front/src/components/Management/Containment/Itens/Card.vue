<template>
  <v-card v-if="!data['excluded']" class="mx-2 my-1" width="90%" style="display: inline-block;">
    <div @click="$router.push(`/editor/${data.id}`)"
      style="display: block; text-decoration: none; color: inherit; cursor: pointer;">
      <v-img height="140px"
        :src="data[$cms('configs')]?.[$cms('image')]?.desktop ?? 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg'"
        cover></v-img>

      <v-card-text class="mb-0 pb-0">
        <v-list-item-title>
          {{ data[$cms('name')] }}
        </v-list-item-title>
        <div class="mb-1">
          <v-chip class="mt-2" variant="outlined" color="primary">
            {{ data[$cms('type')] }}
          </v-chip>
        </div>
      </v-card-text>
    </div>


    <v-card-actions class="justify-space-between">
      <v-list-item class="pl-2">

        <v-list-item-subtitle class="mb-2">
          Criação: {{ formatFriendlyDate(data.criacao) }}
        </v-list-item-subtitle>
        <v-list-item-subtitle v-if="data.alteracao" class="mb-1">
          Ultima atualização: {{ formatFriendlyDate(data.alteracao) }}
        </v-list-item-subtitle class="justify-end">
        <v-list-item-subtitle v-if="!data.alteracao" class="mb-1">
          <br></br>
        </v-list-item-subtitle class="justify-end">
      </v-list-item>
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn icon="mdi-dots-vertical" v-bind="props" size="35"></v-btn>

        </template>
        <v-list>
          <v-list-item @click="editItem(data)">
            <v-list-item-title>Configurar...</v-list-item-title>
          </v-list-item>
          <v-dialog v-model="dialog" class="d-flex justify-center">
            <template v-slot:activator="{ props: activatorProps }">
              <v-list-item v-bind="activatorProps">
                <v-list-item-title>Deletar</v-list-item-title>
              </v-list-item>
            </template>
            <template v-slot:default="{ isActive }">
              <v-container height="80vh" class="d-flex justify-center align-start">

                <v-card text="Tem certeza que deseja excluir 'A página tal'?" title="Atenção" color="warning">
                  <v-card-actions class="d-flex justify-end">
                    <v-btn variant="flat" @click="deleteItem(data.id)" color="red">Deletar</v-btn>
                    <v-btn @click="dialog = false" variant="flat" color="primary">Cancelar</v-btn>
                  </v-card-actions>
                </v-card>
              </v-container>
            </template>
          </v-dialog>
        </v-list>
      </v-menu>
    </v-card-actions>

  </v-card>
</template>
<script setup>
import { $cms } from '@/helpers/cmsProviderHelper';
import _pagina from '@/services/paginas';
import { formatDate } from 'date-fns';
import { useManagementStore } from '@/stores/management';
const managementStore = useManagementStore()
const data = defineModel()
const emit = defineEmits(['delete'])
const dialog = ref(false)
onMounted(() => {
  console.log(data.value)
  console.log(data.value[$cms('configs')]?.[$cms('image')]?.desktop)
})
function deleteItem(id) {
  _pagina.deletar(id).then(() => {
    _pagina.buscar(id).then((response) => {
      if (response.exclusao) {
        managementStore.warningData = { item: data.value, message: "Deletada com sucesso", color: "success", fail: false }
        managementStore.warningDisplay = true
        emit('delete')
        // data.value[$cms('excludedAt')] = new Date()


      }
    })
  }).catch(() => {
    managementStore.warningDisplay = true
    managementStore.warningData = { message: "Falha ao deletar (Erro interno)", color: "red", fail: true }
  })
}
function editItem(item) {
  managementStore.rightNavDisplay = true
  managementStore.editDialogDisplay = true
  managementStore.editDialogData = item
}
function formatFriendlyDate(date) {
  const now = new Date()
  const past = new Date(date)
  const diffMs = now - past // diferença em milissegundos
  const diffSec = Math.floor(diffMs / 1000)
  const diffMin = Math.floor(diffSec / 60)
  const diffHours = Math.floor(diffMin / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffSec < 60) return 'Agora mesmo'
  if (diffMin < 60) return `${diffMin} minuto${diffMin > 1 ? 's' : ''} atrás`
  if (diffHours < 24) return `${diffHours} hora${diffHours > 1 ? 's' : ''} atrás`
  if (diffDays === 1) return 'Ontem'

  return formatDate(date, "dd/MM/yyyy")
}
const page = ref(1)
</script>