<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    location="end"
    transition="scale-transition"
  >
    <template v-slot:activator="{ props }">
      <v-text-field
        prepend-icon="mdi-clock-time-four-outline"
        v-bind="props"
        v-model="inputValue"
        v-maska="'##:##'"
        :rules="rulesHour"
        width="150"
        density="compact"
        variant="outlined"
        hide-details
        @input="onTimeInput"
      />
    </template>

    <v-card min-width="300">
      <v-time-picker
        v-model="pickerValue"
        format="24hr"
        full-width
        color="primary"
        @update:model-value="onTimePick"
      />
    </v-card>
  </v-menu>
</template>

<script setup>
import { ref, watch } from 'vue'
import { vMaska } from 'maska/vue'

const model = defineModel() // ISO string completa (ex: 2025-10-14T13:45:00Z)

const menu = ref(false)
const inputValue = ref('')
const pickerValue = ref(null)

// === Inicializa o campo com o valor do model ===
watch(
  () => model.value,
  newVal => {
    if (newVal) {
      const parsed = new Date(newVal)
      if (!isNaN(parsed)) {
        const hours = parsed.getUTCHours().toString().padStart(2, '0')
const minutes = parsed.getUTCMinutes().toString().padStart(2, '0')
        inputValue.value = `${hours}:${minutes}`
        pickerValue.value = `${hours}:${minutes}`
      }
    } else {
      inputValue.value = ''
      pickerValue.value = null
    }
  },
  { immediate: true }
)

// === Validação ===
const rulesHour = [
  v => !v || isValidHour(v) || 'Insira uma hora válida!'
]

function isValidHour(hourStr) {
  const regex = /^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/
  return regex.test(hourStr)
}

// === Input manual (digitando no campo) ===
function onTimeInput(e) {
  const value = e.target.value
  inputValue.value = value

  if (value.length === 5 && isValidHour(value)) {
    const [hours, minutes] = value.split(':').map(Number)
    const old = model.value ? new Date(model.value) : new Date()

    // preserva a data original
    const utc = new Date(Date.UTC(
  old.getUTCFullYear(),
  old.getUTCMonth(),
  old.getUTCDate(),
  hours,
  minutes,
  0,
  0
))
pickerValue.value = value
model.value = utc.toISOString()
  }
}

// === Seleção no time picker ===
function onTimePick(val) {
  if (!val) return
  const [hours, minutes] = val.split(':').map(Number)
  const old = model.value ? new Date(model.value) : new Date()

  // preserva a data original
  const utc = new Date(Date.UTC(
  old.getUTCFullYear(),
  old.getUTCMonth(),
  old.getUTCDate(),
  hours,
  minutes,
  0,
  0
))
model.value = utc.toISOString()
  menu.value = false
}
</script>
