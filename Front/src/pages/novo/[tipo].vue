<template>
  <v-sheet height="800" color="background">
    <v-row>
      <v-col class="d-flex justify-end">
        <v-breadcrumbs :items="items" divider="/"></v-breadcrumbs>
      </v-col>
    </v-row>

    <v-card color="blue" height="100%" class="pt-3 ma-1 rounded-2xl">
      <v-card-title class="pt-4" style="background-color: white; color: black; font-size: 30px; font-weight: 500;">
        <v-avatar class="mr-2" size="70" color="blue"><v-icon size="50">mdi-school</v-icon></v-avatar>
        Criar nova página
        <v-divider class="mx-1 mt-5"></v-divider>
      </v-card-title>

      <v-stepper v-model="stepper" flat tile :items="['Início', 'Layout', 'Meta']" color="background" height="100%">
        <template v-slot:item.1>
          <div class="my-2 required">Nome</div>
          <!-- NOME E CAMINHO -->
          <v-text-field
            v-model="Pagina[$cms('name')]"
            hide-details
            variant="outlined"
            density="compact"
          ></v-text-field>

          <div class="my-2">URL:</div>
          <v-text-field readonly v-model="url" variant="outlined" density="compact">
            <template v-slot:append>
              <v-btn height="100%" variant="tonal" style="margin-left: -10px;">
                <v-icon>mdi-content-copy</v-icon>
              </v-btn>
            </template>
          </v-text-field>

          <!-- NOME E CAMINHO -->
          <!-- Datas -->
          <v-row>
            <v-col cols="2">
              <span class="my-2 required">Data inicial</span>
              <v-menu v-model="menuInicial" :close-on-content-click="false" location="end">
                <template v-slot:activator="{ props }">
                  <v-text-field
                    prepend-icon="mdi-calendar-start"
                    :rules="rulesDate"
                    width="200px"
                    v-maska="'##/##/####'"
                    v-model="dataInicial"
                    @input="onDateInput('i', $event)"
                    v-bind="props"
                    variant="outlined"
                    hide-messages
                    density="compact"
                  ></v-text-field>
                </template>
                <v-card min-width="300">
                  <v-locale-provider locale="pt">
                    <v-date-picker
                      v-model="dataDatePickerInicial"
                      @update:model-value="onDatePick('i', $event)"
                      elevation="0"
                      color="primary"
                    ></v-date-picker>
                  </v-locale-provider>
                </v-card>
              </v-menu>
            </v-col>

            <v-col cols="2">
              <span class="my-2">Horário Inicial:</span>
              <v-menu v-model="menuHoraInicial" :close-on-content-click="false" activator="parent" min-width="0">
                <template v-slot:activator="{ props }">
                  <v-text-field
                    prepend-icon="mdi-clock-time-four-outline"
                    v-model="horaInicial"
                    :rules="rulesHour"
                    v-maska="'##:##'"
                    @input="onTimeInput('i', $event)"
                    v-bind="props"
                    density="compact"
                    variant="outlined"
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-model="horaDatePickerInicial" format="24hr"
                  @update:model-value="onTimePick('i', $event)"
                ></v-time-picker>
              </v-menu>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="2">
              <span class="my-2">Data Final:</span>
              <v-menu v-model="menuFinal" :close-on-content-click="false" location="end">
                <template v-slot:activator="{ props }">
                  <v-text-field
                    prepend-icon="mdi-calendar-end"
                    width="200px"
                    v-maska="'##/##/####'"
                    :rules="rulesDate"
                    v-model="dataFinal"
                    @input="onDateInput('f', $event)"
                    v-bind="props"
                    variant="outlined"
                    hide-messages
                    density="compact"
                  ></v-text-field>
                </template>
                <v-card min-width="300">
                  <v-locale-provider locale="pt">
                    <v-date-picker
                      v-model="dataDatePickerFinal"
                      @update:model-value="onDatePick('f', $event)"
                      elevation="0"
                      color="primary"
                    ></v-date-picker>
                  </v-locale-provider>
                </v-card>
              </v-menu>
            </v-col>
 <!-- <v-text-field :rules="rulesDate" width="200px" v-maska="'##/##/####'" @input="onInput('i', $event)"
                    v-model="dataInputInicial" v-bind="props" variant="outlined" hide-messages density="compact">
                  </v-text-field> -->
            <v-col cols="2">
              <span class="my-2">Horário Final:</span>
              <v-menu v-model="menuHoraFinal" :close-on-content-click="false" activator="parent" min-width="0">
                <template v-slot:activator="{ props }">
                  <v-text-field
                    prepend-icon="mdi-clock-time-four-outline"
                    v-model="horaFinal"
                    :rules="rulesHour"
                    v-maska="'##:##'"
                    @input="onTimeInput('f', $event)"
                    v-bind="props"
                    density="compact"
                    variant="outlined"
                  ></v-text-field>
                </template>
                <v-time-picker format="24hr"
                  v-model="horaDatePickerFinal"
                   @update:model-value="onTimePick('f', $event)"
                ></v-time-picker>
              </v-menu>
            </v-col>
          </v-row>
        </template>

        <template v-slot:item.2>
          <v-card title="Step Two" flat>...</v-card>
        </template>

        <template v-slot:item.3>
          <v-card title="Step Three" flat>...</v-card>
        </template>

        <template v-slot:actions="{ prev, next }">
          <v-btn v-if="stepper > 1" @click="prev" class="ml-6 mt-5" variant="plain">
            <v-icon>mdi-arrow-left</v-icon>Voltar
          </v-btn>
          <v-btn
            v-if="stepper < 3"
            :disabled="validacaoInicio"
            @click="nextbtn(next)"
            style="position: absolute; right: 0;"
            color="blue"
            variant="flat"
            class="mr-6 mt-5"
          >
            Próximo<v-icon>mdi-arrow-right</v-icon>
          </v-btn>
          <v-btn
            v-if="stepper == 3"
            :disabled="validacaoCriacao"
            @click="criarPagina"
            style="position: absolute; right: 0;"
            color="blue"
            variant="flat"
            class="mr-6 mt-5"
          >
            Criar
          </v-btn>
        </template>
      </v-stepper>
    </v-card>
  </v-sheet>
</template>

<script setup>
import { $cms } from '@/helpers/cmsProviderHelper'
import { criarElemento } from '@/model/Elementos'
import { PaginaRequest } from '@/model/Requests/PaginaRequest'
import _pagina from '@/services/paginas'
import { parse, format } from 'date-fns'
import { vMaska } from "maska/vue"
import { useRoute } from 'vue-router'

const route = useRoute()
const Pagina = reactive(new PaginaRequest('', '', {}, '', null, false, '', {}))

// ==========================
// MODELS SEPARADOS
// ==========================
const dataInicial = ref(format(new Date(), 'dd/MM/yyyy'))
const horaInicial = ref('00:00')
const dataFinal = ref('')
const horaFinal = ref('')

const dataDatePickerInicial = ref(null)
const dataDatePickerFinal = ref(null)
const horaDatePickerInicial = ref('00:00')
const horaDatePickerFinal = ref('12:00')
// MENUS
const menuInicial = ref(false)
const menuFinal = ref(false)
const menuHoraInicial = ref(false)
const menuHoraFinal = ref(false)

const validInput = ref(false)
const stepper = ref(1)

// ==========================
// UNIFICAÇÃO AUTOMÁTICA
// ==========================
watch([dataInicial, horaInicial], ([d, h]) => {
  Pagina[$cms('startsAt')] = combinarDataHora(d, h)
})
watch([dataFinal, horaFinal], ([d, h]) => {
  Pagina[$cms('endsAt')] = combinarDataHora(d, h)
})

function combinarDataHora(dataStr, horaStr) {
  if (!dataStr || !horaStr) return null
  const [dia, mes, ano] = dataStr.split('/').map(Number)
  const [hora, minuto] = horaStr.split(':').map(Number)
   const pad = (n) => n.toString().padStart(2, '0')
  return `${ano}-${pad(mes)}-${pad(dia)}T${pad(hora)}:${pad(minuto)}:00`
}

// ==========================
// URL AUTOMÁTICA
// ==========================
const url = computed(() => {
  if (!Pagina[$cms('name')]) return ''
    let url = Pagina[$cms('name')]
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trimEnd()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
  Pagina[$cms('path')] = url
  return url 
})

// ==========================
// VALIDAÇÕES
// ==========================
function isValidDateRange(dateStr) {
  const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/20[0-9]{2}$/
  if (!regex.test(dateStr)) return false
  const [day, month, year] = dateStr.split('/').map(Number)
  const date = new Date(year, month - 1, day)
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day
}
function isValidHourRange(hourStr) {
  // Expressão regular para verificar o formato HH:mm
  const regex = /^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/;
  if (!regex.test(hourStr)) return false;

  const [hours, minutes] = hourStr.split(':').map(Number);
  
  // A expressão regular já garante que horas estão entre 00 e 23 e minutos entre 00 e 59, então não é necessário fazer mais validações

  return true; // Caso tenha passado na regex, é uma hora válida
}

const rulesDate = [value => isValidDateRange(value) || 'Insira uma data válida!']
const rulesHour = [value => isValidHourRange(value) || 'Insira uma data válida!']

const validacaoInicio = computed(() => {
  return (Pagina[$cms('name')]?.length < 3 && !Pagina[$cms('startsAt')])
})
const validacaoCriacao = computed(() => {
  return (Pagina[$cms('name')]?.length < 3 && !Pagina[$cms('startsAt')])
})

// ==========================
// BREADCRUMBS
// ==========================
const items = [
  { title: 'Inicial', disabled: false, href: '/' },
  { title: 'Páginas', disabled: false, href: '/paginas' },
  { title: 'Nova Página', disabled: true }
]

watch(dataInicial.value, (val) => {
  if (val?.length === 10 && isValidDateRange(val)) {
    const parsed = parse(val, 'dd/MM/yyyy', new Date())
    dataDatePickerInicial.value = parsed
  }
})
function nextbtn(func){
  console.log(dataInicial.value)
  console.log(dataInicial.value)
  let inicial = combinarDataHora(dataInicial.value, horaInicial.value)
  let final = combinarDataHora(dataFinal.value, horaFinal.value) ?? null
  console.log(final)
  console.log(inicial)
  Pagina[$cms('startsAt')] = inicial
  Pagina[$cms('endsAt')] = final
  func()
}
function onDateInput(op, event) {
  const value = event.target.value
  if (value.length === 10 && isValidDateRange(value)) {
    const parsed = parse(value, 'dd/MM/yyyy', new Date())

      if (op === 'i') {
        dataDatePickerInicial.value = parsed
        dataInicial.value = format(parsed, 'dd/MM/yyyy')
      } else {
        dataDatePickerFinal.value = parsed
        dataFinal.value = format(parsed, 'dd/MM/yyyy')
      }
    
  }
}

function onDatePick(op, val) {
  if (val instanceof Date) {
    const formatted = format(val, 'dd/MM/yyyy')

    if (op === 'i') {
      dataDatePickerInicial.value = val
      dataInicial.value = formatted
      menuInicial.value = false
    } else {
      dataDatePickerFinal.value = val
      dataFinal.value = formatted
      menuFinal.value = false
    }
  }
}

function onTimeInput(op, val) {
  if (val.srcElement.value.length > 4 && isValidHourRange(val.srcElement.value)) {
    if (op == 'i') {
      horaDatePickerInicial.value = val.srcElement.value
      horaInicial.value = val.srcElement.value
    }
    else {
      horaDatePickerFinal.value = val.srcElement.value
      horaFinal.value = val.srcElement.value
    }
  }
}
function onTimePick(op, val) {
  if (op == 'i') {
    horaDatePickerInicial.value = val 
    horaInicial.value = val
  }
  else {
    horaDatePickerFinal.value = val 
    horaFinal.value = val

  }
}
async function criarPagina(){
  Pagina[$cms('type')] = route.params.tipo
  let paginaModel = criarElemento("Pagina",{[$cms('meta')]:{}})
  Pagina[$cms('content')] = paginaModel[$cms('content')]
  Pagina[$cms('configs')] = paginaModel[$cms('configs')]
  // console.log(Pagina)
  await _pagina.criar(Pagina)
}
</script>
<style lang="scss">
.required{
  &::after{
    content: " *";
    color: red;
  }
}
</style>