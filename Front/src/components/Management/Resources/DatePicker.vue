<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    location="end"
    transition="scale-transition"
  >
    <template v-slot:activator="{ props }">
      <v-text-field
        v-bind="props"
        prepend-icon="mdi-calendar-start"
        width="200px"
        density="compact"
        variant="outlined"
        hide-details
        v-maska="'##/##/####'"
        v-model="inputValue"
        :rules="rulesDate"
        @input="onDateInput"
      />
    </template>

    <v-card min-width="300">
      <v-locale-provider locale="pt">
        <v-date-picker
          v-model="pickerValue"
          @update:model-value="onDatePick"
          elevation="0"
          color="primary"
        />
      </v-locale-provider>
    </v-card>
  </v-menu>
</template>

<script setup>
import { ref, watch } from 'vue'
import { parse, format } from 'date-fns'
import { vMaska } from 'maska/vue'

// modelo (v-model externo)
const model = defineModel() // vem tipo 2025-10-14T00:00:00Z

// refs internas
const menu = ref(false)
const inputValue = ref('')
const pickerValue = ref(null)

// === Watch para preencher o campo e o picker com o valor inicial ===
watch(
  () => model.value,
  newVal => {
    if (newVal) {
      const parsed = new Date(newVal)
if (!isNaN(parsed)) {
  pickerValue.value = parsed
  // Usa getters UTC pra mostrar exatamente o que vem do ISO
  const d = String(parsed.getUTCDate()).padStart(2, '0')
  const m = String(parsed.getUTCMonth() + 1).padStart(2, '0')
  const y = parsed.getUTCFullYear()
  inputValue.value = `${d}/${m}/${y}`
}
    } else {
      inputValue.value = ''
      pickerValue.value = null
    }
  },
  { immediate: true }
)

// === Validação ===
const rulesDate = [
  v => !v || isValidDate(v) || 'Insira uma data válida!'
]

function isValidDate(dateStr) {
  const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/20[0-9]{2}$/
  if (!regex.test(dateStr)) return false
  const [day, month, year] = dateStr.split('/').map(Number)
  const d = new Date(year, month - 1, day)
  return d.getFullYear() === year && d.getMonth() === month - 1 && d.getDate() === day
}

// === Input manual ===
function onDateInput(e) {
  const value = e.target.value
  inputValue.value = value
  if (value.length === 10 && isValidDate(value)) {
    const [d, m, y] = value.split('/').map(Number)

// preserva hora UTC se já houver model
let hours = 0, minutes = 0, seconds = 0, ms = 0
if (model.value) {
  const old = new Date(model.value)
  hours = old.getUTCHours()
  minutes = old.getUTCMinutes()
  seconds = old.getUTCSeconds()
  ms = old.getUTCMilliseconds()
}

// cria data UTC pura
const newUtc = new Date(Date.UTC(y, m - 1, d, hours, minutes, seconds, ms))
pickerValue.value = newUtc
model.value = newUtc.toISOString()
  }
}

// === Seleção no calendário ===
function onDatePick(val) {
  if (val instanceof Date) {
   const y = val.getFullYear()
const m = val.getMonth() + 1
const d = val.getDate()

let hours = 0, minutes = 0, seconds = 0, ms = 0
if (model.value) {
  const old = new Date(model.value)
  hours = old.getUTCHours()
  minutes = old.getUTCMinutes()
  seconds = old.getUTCSeconds()
  ms = old.getUTCMilliseconds()
}

const newUtc = new Date(Date.UTC(y, m - 1, d, hours, minutes, seconds, ms))
inputValue.value = format(newUtc, 'dd/MM/yyyy')
model.value = newUtc.toISOString()
menu.value = false
  }
}
</script>
