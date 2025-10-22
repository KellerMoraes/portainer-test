import { onMounted, onBeforeUnmount } from 'vue'
import { useCommandStore } from '@/stores/command'
import _ from 'lodash'
import { useFerramentaStore } from '@/stores/ferramenta'

export default function atalhosTecladoIniciador() {
  const commandStore = useCommandStore()

  const executarAtalho = (e) => {
    if (
      ['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName) ||
      document.activeElement.isContentEditable
    ) {
      
      return
    }

    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0
    const ctrlOrCmd = isMac ? e.metaKey : e.ctrlKey

    if (ctrlOrCmd && e.code === 'KeyZ') {
      if (e.shiftKey) {
        commandStore.refazer()
      } else {
        commandStore.desfazer()
      }
      e.preventDefault()
    }
    if (ctrlOrCmd && e.code === 'KeyD') {
      useFerramentaStore().duplicarElemento()
      e.preventDefault()
    }
    if (ctrlOrCmd && e.code === 'KeyC') {
      useFerramentaStore().copiarElemento()
      e.preventDefault()
    }
    if (ctrlOrCmd && e.code === 'KeyV') {
      useFerramentaStore().colarElemento()
      e.preventDefault()
    }
    if (e.key === 'Delete') {
      useFerramentaStore().deletarElemento()
      e.preventDefault()
    }
  }

  // Aplica o throttle com um intervalo de 500ms (ajustável)
  const handleKeyDown = _.throttle(executarAtalho, 20, { trailing: false })

  onMounted(() => {
    window.addEventListener('keydown', handleKeyDown)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleKeyDown)
  })
}
