import { criarElemento } from "@/model/Elementos";
import RecursoBase from "@/model/Base/BaseRecurso";
import { $cms } from '@/helpers/cmsProviderHelper';
function id() {
    return Math.random().toString(36).slice(2);
}
const Estruturais = new RecursoBase("Estruturais","linhas","estruturais", "mdi-view-dashboard-outline")
Estruturais.adicionarGrupo("Genéricos","linhas", //Componentes
    [
        {
            [$cms("name")]: "Linha",
            compName: 'linha',
            [$cms("group")]: "linhas",
            [$cms("type")]: "Linha",
            [$cms("id")]: "linha-",
            [$cms("icon")]: 'mdi-view-sequential',
        },
    ]
)
Estruturais.adicionarGrupo("Genéricos","colunas", //Componentes
    [
        {
            [$cms("name")]: "Coluna",
            [$cms("group")]: "colunas",
            [$cms("type")]: "Coluna",

            [$cms("id")]: "coluna-",
            [$cms("icon")]: 'mdi-view-column',
        },
    ]
)
const Componentes = new RecursoBase("Componentes","componentes","Componentes", "mdi-plus-box-outline")
Componentes.adicionarGrupo("Textos","componentes", //Componentes
    [
        {
            [$cms("group")]: "componentes",
            [$cms("name")]: "Titulo",
            [$cms("type")]: "Titulo",
            [$cms("id")]: "h1-",
            [$cms("icon")]: 'mdi-format-title'
        },
        {
            [$cms("group")]: "componentes",
            [$cms("type")]: "Paragrafo",
            [$cms("name")]: "Parágrafo",
            [$cms("id")]: "p-",
            [$cms("icon")]: 'mdi-format-paragraph'
        },
    ]
)
const Agrupamentos = new RecursoBase("Agrupamentos","componentes","Agrupamentos", "mdi-group")
Agrupamentos.adicionarGrupo("Cards","componentes", //Componentes
    [
        {
            [$cms("group")]: "componentes",
            [$cms("name")]: "Card",
            [$cms("type")]: "Card",
            [$cms("id")]: "card-",
            [$cms("icon")]: 'mdi-card-text'
        },
    ]
)
Agrupamentos.adicionarGrupo("Container","componentes", //Componentes
    [
        {
            [$cms("group")]: "componentes",
            [$cms("name")]: "Container",
            [$cms("type")]: "Container",
            [$cms("id")]: "container-",
            [$cms("icon")]: 'mdi-contain'
        },
    ]
)
const Formularios = new RecursoBase("Formularios","componentes","Formularios", "mdi-form-select")
Formularios.adicionarGrupo("Campos","componentes", //Componentes
    [
        {
            [$cms("name")]: "Campo",
            [$cms("group")]: "componentes",
            [$cms("type")]: "Campo",
            [$cms("id")]: "Campo-",
            [$cms("icon")]: 'mdi-form-textbox'
        },
        {
            [$cms("name")]: "Selecionavel",
            [$cms("group")]: "componentes",
            [$cms("type")]: "Selecionavel",
            [$cms("id")]: "Selecionavel-",
            [$cms("icon")]: 'mdi-radiobox-marked'
        },
    ]
)
Formularios.adicionarGrupo("Formulários","linhas", //Componentes
    [
        {
            [$cms("type")]: "Formulario",
            [$cms("group")]: "linhas",
            [$cms("name")]: "Formulario",
            [$cms("id")]: "Formulario-",
            [$cms("icon")]: 'mdi-list-box-outline'
        },
    ]
)
const Recursos =  [
    Estruturais,
    Componentes,
    Agrupamentos,
    Formularios
]

export { Recursos };