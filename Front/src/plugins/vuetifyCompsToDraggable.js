import draggable from 'vuedraggable'
import { VRow, VCol, VContainer, VList, VListItem } from 'vuetify/components'

export function injectVuetifyToDraggable() {
  draggable.components = {
    ...draggable.components,
    VRow,
    VCol,
    VContainer,
    VList,
    VListItem,
    // qualquer outro que quiser usar
  }
}